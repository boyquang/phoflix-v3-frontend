"use client";

import useNotification from "@/hooks/useNotification";
import useSendSocketFeedback from "@/hooks/useSendSocketFeedback";
import { handleShowToaster } from "@/lib/utils";
import { addVote } from "@/store/asyncThunks/feedbackAsyncThunk";
import { showDialogSinInWhenNotLogin } from "@/store/slices/systemSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

interface FeedbackActionsProps {
  data: Feedback;
}

const VoteActions = ({ data }: FeedbackActionsProps) => {
  const { data: session } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const [typeVote, setTypeVote] = useState<"like" | "dislike" | null>(null);
  const { sendSocketAddNewVote } = useSendSocketFeedback();
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);
  const { createNotificationFunc } = useNotification();
  const { voteList } = useSelector((state: RootState) => state.feedback);

  // Lấy thông tin người dùng
  const { id: userId, accessToken, name } = session?.user || {};

  // Lấy dữ liệu phản hồi gốc từ props
  const feedbackId = data?._id as string;
  const receiverId = data?.author?._id as string;
  const isAnonymous = data?.is_anonymous;

  // Lấy danh sách vote từ redux store
  const { userLikedFeedbacks, userDislikedFeedbacks } = voteList || {};
  const totalLiked = userLikedFeedbacks?.[feedbackId]?.length || 0;
  const totalDisliked = userDislikedFeedbacks?.[feedbackId]?.length || 0;
  const isLiked = userLikedFeedbacks?.[feedbackId]?.includes(userId as string);
  const isDisliked = userDislikedFeedbacks?.[feedbackId]?.includes(
    userId as string
  );

  const handleCreateNotification = () => {
    const notificationData = {
      receiverId,
      type: "individual" as const,
      content: `${name} thích phản hồi của bạn trong phim ${movie?.name}`,
      image: movie?.poster_url,
      isAnonymous,
    };

    createNotificationFunc(notificationData, feedbackId);
  };

  const handleVote = async (voteType: "like" | "dislike") => {
    if (!session) {
      dispatch(showDialogSinInWhenNotLogin());
      return;
    }

    setTypeVote(voteType);
    const response = await dispatch(
      addVote({
        userId: userId as string,
        feedbackId,
        movieSlug: params.slug as string,
        voteType,
        accessToken: accessToken as string,
      })
    );
    setTypeVote(null);

    if (response.payload?.status) {
      const voteType = response.payload.result.voteType;

      sendSocketAddNewVote(receiverId, voteType);

      // Tạo thông báo nếu chưa thích phản hồi
      if (voteType === "like") {
        handleCreateNotification();
      }
    } else {
      handleShowToaster("Thông báo", response?.payload?.message, "error");
    }
  };

  return (
    <>
      <Box
        onClick={() => handleVote("like")}
        className={`cursor-pointer hover:text-[#25d366] flex gap-1 items-center 
          ${isLiked ? "text-[#25d366]" : "text-gray-400 "}
        `}
      >
        {typeVote === "like" ? <Spinner /> : <AiFillLike />}
        {totalLiked > 0 && <span className="text-xs">{totalLiked}</span>}
      </Box>

      <Box
        onClick={() => handleVote("dislike")}
        className={`cursor-pointer hover:text-[#d33d25] flex gap-1 items-center 
          ${isDisliked ? "text-[#d33d25]" : "text-gray-400 "}
        `}
      >
        {typeVote === "dislike" ? <Spinner /> : <AiFillDislike />}
        {totalDisliked > 0 && <span className="text-xs">{totalDisliked}</span>}
      </Box>
    </>
  );
};

export default VoteActions;
