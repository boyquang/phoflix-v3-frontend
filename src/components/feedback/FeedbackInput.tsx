"use client";

import { addFeedback, addReply } from "@/lib/actions/feedback.action";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Button, Spinner, Textarea } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  getFeedbacks,
  getReplyListFeedback,
} from "@/store/async-thunks/feedback.thunk";
import {
  setShowFeedbackId,
  setShowReplyId,
} from "@/store/slices/feedback.slice";
import { handleShowToaster } from "@/lib/utils";
import SwitchCustom from "../shared/SwitchCustom";
import { showDialogSinInWhenNotLogin } from "@/store/slices/system.slice";
import { useRootFeedback } from "@/hooks/useRootFeedback";
import useSendSocketFeedback from "@/hooks/useSendSocketFeedback";
import useNotification from "@/hooks/useNotification";

const FeedbackInput = ({
  action,
  autoFocus = false,
  feedback,
}: FeedbackInputProps) => {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { data: session } = useSession();
  const { replyId, feedbackType } = useSelector(
    (state: RootState) => state.feedback
  );
  const { sendSocketAddNewFeedback, sendSocketReplyFeedback } =
    useSendSocketFeedback();
  const { createNotificationFunc, notificationAlert } = useNotification();
  const context = useRootFeedback();
  const rootFeedbackId = context?.rootFeedbackId as string;
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);
  const [pending, startTransition] = useTransition();
  const [length, setLength] = useState(0);
  const [value, setValue] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [resetSwitch, setResetSwitch] = useState(false);
  const maxLength = 500;

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setValue(value);
    setLength(value.length);
  };

  const handleRefreshFeedback = async () => {
    await Promise.all([
      dispatch(
        getFeedbacks({
          movieSlug: params.slug as string,
          type: feedbackType,
          limit: 10,
        })
      ),

      dispatch(
        getReplyListFeedback({
          parentId: rootFeedbackId,
          type: feedbackType,
          limit: 5,
        })
      ),
    ]);
  };

  const handleCreateNotification = () => {
    const notificationData = {
      receiverId: feedback?.author?._id as string,
      type: "individual" as const,
      content: `${session?.user?.name} đã trả lời bình luận của bạn trong phim ${movie?.name}`,
      image: movie?.poster_url,
      isAnonymous: feedback?.is_anonymous as boolean,
    };

    createNotificationFunc(notificationData, feedback?._id as string);
  };

  const addNewComment = async () => {
    const response = await addFeedback({
      movieSlug: params.slug as string,
      userId: session?.user?.id as string,
      content: value,
      type: "comment",
      is_anonymous: isAnonymous,
      accessToken: session?.user?.accessToken as string,
    });

    return response;
  };

  const addNewReply = async () => {
    const response = await addReply({
      parentId: replyId as string,
      userId: session?.user?.id as string,
      content: value,
      type: feedbackType,
      movieSlug: params.slug as string,
      is_anonymous: isAnonymous,
      accessToken: session?.user?.accessToken as string,
    });

    return response;
  };

  const handleAddNewComment = () => {
    if (!session) {
      dispatch(showDialogSinInWhenNotLogin());
      return;
    }

    if (value.trim() === "") {
      handleShowToaster("Thông báo", "Nội dung không được để trống", "error");
      return;
    }

    startTransition(async () => {
      let response = null;

      if (action === "comment") {
        response = await addNewComment();
        sendSocketAddNewFeedback();
      } else if (action === "reply") {
        response = await addNewReply();
        sendSocketReplyFeedback(
          feedback?.author?._id as string,
          rootFeedbackId
        );
        handleCreateNotification();
      }

      if (response?.status) {
        setValue("");
        setLength(0);
        setIsAnonymous(false); // Đặt lại trạng thái switch ẩn danh về false

        if (isAnonymous) {
          setResetSwitch(true);
          setTimeout(() => setResetSwitch(false), 100); // Làm mới switch ẩn danh sau 100ms
        }

        dispatch(setShowFeedbackId(null)); // Đóng modal bình luận
        dispatch(setShowReplyId(null)); // Đóng modal trả lời bình luận
        handleRefreshFeedback(); // Làm mới danh sách bình luận và trả lời
      } else {
        notificationAlert({
          title: response?.status ? "Thông báo" : "Lỗi",
          description:
            response?.message || "Đã có lỗi xảy ra, vui lòng thử lại sau.",
          type: response?.status ? "success" : "error",
        });
      }
    });
  };

  return (
    <Box className="flex flex-col justify-end gap-2 p-2 rounded-xl bg-[#ffffff10]">
      <Box className="relative">
        <Textarea
          disabled={!session}
          autoFocus={autoFocus}
          maxLength={maxLength}
          autoresize
          onChange={handleChangeInput}
          value={value}
          placeholder="Viết bình luận..."
          className="h-full min-h-32 bg-[#191b24] text-white rounded-lg p-4 border-2 border-transparent focus:border-gray-400"
        />
        <span className="text-xs absolute top-1.5 right-6 text-gray-400">
          {length}/{maxLength}
        </span>
      </Box>
      <Box className="flex items-center justify-between gap-2">
        <SwitchCustom
          label="Ẩn danh"
          callback={setIsAnonymous}
          resetSwitch={resetSwitch}
        />
        <Button
          size="sm"
          maxWidth={120}
          onClick={handleAddNewComment}
          className="bg-transparent text-[#ffd875] hover:opacity-80 transition-all"
        >
          Gửi
          {pending ? <Spinner size="sm" /> : <IoMdSend />}
        </Button>
      </Box>
    </Box>
  );
};

export default FeedbackInput;
