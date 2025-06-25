"use client";

import { socket } from "@/configs/socketConfig";
import {
  getFeedbacks,
  getReplyListFeedback,
} from "@/store/asyncThunks/feedbackAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useRefreshFeedbacks = () => {
  const dispatch: AppDispatch = useDispatch();
  const { feedbackType } = useSelector((state: RootState) => state.feedback);
  const params = useParams();

  useEffect(() => {
    socket.on("refreshFeedbacks", (data) => {
      const { slug, feedbackType: feedbackTypeRes, rootFeedbackId } = data;

      // Chỉ làm mới khi đang ở trang nhận phản hồi
      // và loại phản hồi khớp với loại phản hồi hiện tại
      if (slug !== params.slug || feedbackType !== feedbackTypeRes) return;

      // Tự động cập nhật danh sách phản hồi
      dispatch(
        getFeedbacks({
          movieSlug: slug as string,
          type: feedbackType,
          limit: 10,
        })
      );

      if (rootFeedbackId) {
        dispatch(
          getReplyListFeedback({
            parentId: rootFeedbackId,
            type: feedbackType,
            limit: 5,
          })
        );
      }
    });

    return () => {
      socket.off("refreshFeedbacks");
    };
  }, [feedbackType, params.slug]);
};

export default useRefreshFeedbacks;
