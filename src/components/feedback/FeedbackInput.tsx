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
import SwitchCustom from "../shared/SwitchCustom";
import { showDialogSinInWhenNotLogin } from "@/store/slices/system.slice";
import { useRootFeedback } from "@/hooks/useRootFeedback";
import useSendSocketFeedback from "@/hooks/useSendSocketFeedback";
import useNotification from "@/hooks/useNotification";
import { toast } from "sonner";

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
  const { createNotificationFunc } = useNotification();
  const context = useRootFeedback();
  const rootFeedbackId = context?.rootFeedbackId as string;
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);
  const [pending, startTransition] = useTransition();
  const [length, setLength] = useState(0);
  const [value, setValue] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [resetSwitch, setResetSwitch] = useState(false);
  const maxLength = 500;

  const movieDataDefault = {
    slug: params.slug as string,
    poster: movie?.poster_url as string,
    thumb: movie?.thumb_url as string,
    name: movie?.name as string,
  };

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
    if (!movie) return;

    const response = await addFeedback({
      movieData: {
        slug: params.slug as string,
        poster: movie?.poster_url as string,
        thumb: movie?.thumb_url as string,
        name: movie?.name as string,
      },
      userId: session?.user?.id as string,
      content: value,
      type: "comment",
      is_anonymous: isAnonymous,
      accessToken: session?.user?.accessToken as string,
    });

    return response;
  };

  const addNewReply = async () => {
    if (!movie) return;

    const response = await addReply({
      parentId: replyId as string,
      userId: session?.user?.id as string,
      content: value,
      type: feedbackType,
      movieData: {
        slug: params.slug as string,
        poster: movie?.poster_url as string,
        thumb: movie?.thumb_url as string,
        name: movie?.name as string,
      },
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

    if (!value.trim()) {
      toast.error("Nội dung không được để trống");
      return;
    }

    startTransition(async () => {
      try {
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
          // Reset input
          setValue("");
          setLength(0);
          setIsAnonymous(false);

          // Reset switch ẩn danh
          if (isAnonymous) {
            setResetSwitch(true);
            setTimeout(() => setResetSwitch(false), 100);
          }

          toast.success(response.message);
          // Đóng modal + refresh
          dispatch(setShowFeedbackId(null));
          dispatch(setShowReplyId(null));
          handleRefreshFeedback();
        } else {
          toast.error(response?.message || "Thêm bình luận thất bại!");
        }
      } catch (error) {
        toast.error("Đã xảy ra lỗi! Vui lòng thử lại sau.");
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
          className="bg-transparent text-primary hover:opacity-80 transition-all"
        >
          Gửi
          {pending ? <Spinner size="sm" /> : <IoMdSend />}
        </Button>
      </Box>
    </Box>
  );
};

export default FeedbackInput;
