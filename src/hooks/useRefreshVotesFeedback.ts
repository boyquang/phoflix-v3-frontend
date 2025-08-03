"use client";

import { socket } from "@/configs/socket.config";
import { getVoteListFeedback } from "@/store/async-thunks/feedback.thunk";
import { AppDispatch, RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useRefreshVotesFeedbacks = () => {
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const { feedbackType } = useSelector((state: RootState) => state.feedback);
  const { data: session } = useSession();

  useEffect(() => {
    socket.on("refreshVotesFeedback", (data) => {
      const { slug, feedbackType: feedbackTypeRes, senderId } = data;

      // Chỉ làm mới khi đang ở trang nhận phản hồi
      // và loại phản hồi khớp với loại phản hồi hiện tại
      if (slug !== params.slug || feedbackType !== feedbackTypeRes) return;

      dispatch(getVoteListFeedback(params.slug as string));
    });

    return () => {
      socket.off("refreshVotesFeedback");
    };
  });
};

export default useRefreshVotesFeedbacks;
