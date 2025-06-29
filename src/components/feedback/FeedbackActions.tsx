"use client";

import { deleteFeedback } from "@/lib/actions/feedbackAction";
import {
  getFeedbacks,
  getReplyListFeedback,
} from "@/store/asyncThunks/feedbackAsyncThunk";
import {
  setIdEditFeedback,
  setReplyId,
  setShowFeedbackId,
  setShowReplyId,
} from "@/store/slices/feedbackSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaReply } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import AlertDialog from "../shared/AlertDialog";
import { handleShowToaster } from "@/lib/utils";
import { useRootFeedback } from "@/hooks/useRootFeedback";
import { BiEdit } from "react-icons/bi";
import useSendSocketFeedback from "@/hooks/useSendSocketFeedback";
import VoteActions from "./VoteActions";

const FeedbackActions = ({ action, data }: FeedbackActionsProps) => {
  const { data: session }: any = useSession();
  const context = useRootFeedback();
  const params = useParams();
  const { sendSocketDeleteFeedback } = useSendSocketFeedback();
  const [loadingDelete, setLoadingDelete] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { feedbackData, repliesData, feedbackType } = useSelector(
    (state: RootState) => state.feedback
  );

  // Lấy dữ liệu phản hồi gốc từ context
  const rootFeedbackId = context?.rootFeedbackId;

  // Lấy thông tin phản hồi
  const feedbackId = data?._id as string;
  const authorId = data?.author?._id as string;

  // Kiểm tra phản hồi hoặc trả lời có đang mở hay không
  const showFeedbackId = feedbackData?.showFeedbackId as string;
  const showReplyId = repliesData?.showReplyId as string;

  const handleToogleReply = (id: string) => {
    const isComment = action === "comment";

    /**
     * * Nếu đang mở feedback thì đóng lại, ngược lại mở ra
     * * Nếu đang mở reply thì đóng lại, ngược lại mở ra
     */

    const targetId =
      (isComment ? showFeedbackId : showReplyId) === id ? null : feedbackId;

    // Đóng feedback/reply đang mở
    dispatch(
      isComment ? setShowFeedbackId(targetId) : setShowReplyId(targetId)
    );

    dispatch(setReplyId(id));
  };

  const handleRefreshFeedback = async () => {
    // Làm mới feedback khi xóa phản hồi cha
    await dispatch(
      getFeedbacks({
        movieSlug: params.slug as string,
        type: feedbackType,
        limit: 10,
      })
    );

    // Làm mới reply khi xóa phản hồi con
    if (rootFeedbackId) {
      dispatch(
        getReplyListFeedback({
          parentId: rootFeedbackId as string,
          type: feedbackType,
          limit: 10,
        })
      );
    }
  };

  const handleDeleteFeedback = async () => {
    setLoadingDelete(true);
    const response = await deleteFeedback({
      feedbackId,
      userId: session?.user?.id,
      accessToken: session?.user?.accessToken,
    });
    setLoadingDelete(false);

    if (response?.status) {
      handleRefreshFeedback();
      sendSocketDeleteFeedback(feedbackId);
    }

    handleShowToaster(
      "Thông báo",
      response?.message,
      response?.status ? "success" : "error"
    );
  };

  return (
    <Box className="flex gap-4 items-center my-4 flex-wrap">
      <VoteActions data={data} />

      <Box
        onClick={() => handleToogleReply(feedbackId)}
        className="text-gray-400 select-none text-xs cursor-pointer hover:text-gray-50 flex gap-1 items-center"
      >
        <FaReply />
        Trả lời
      </Box>

      {authorId === session?.user?.id && (
        <>
          <Box
            onClick={() => dispatch(setIdEditFeedback(feedbackId))}
            className="text-gray-400 select-none text-xs cursor-pointer hover:text-gray-50 flex gap-1 items-center"
          >
            <BiEdit />
            Chỉnh sửa
          </Box>

          <AlertDialog
            trigger={
              <Box className="text-gray-400 select-none text-xs cursor-pointer hover:text-red-500 flex gap-1 items-center">
                <MdDelete />
                Xóa
              </Box>
            }
            title="Xóa phản hồi"
            content="Bạn có chắc chắn muốn xóa phản hồi này không?"
            loading={loadingDelete}
            confirmCallback={handleDeleteFeedback}
          />
        </>
      )}
    </Box>
  );
};

export default FeedbackActions;
