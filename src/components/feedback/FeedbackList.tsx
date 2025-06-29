"use client";

import {
  getFeedbacks,
  getMoreFeedbacks,
  getVoteListFeedback,
} from "@/store/asyncThunks/feedbackAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import FeedbackItem from "./FeedbackItem";
import SeeMoreFeedback from "./SeeMoreFeedback";
import { useEffect, useState } from "react";
import { RootFeedbackProvider } from "@/contexts/RootFeedbackContext";
import EmptyFeedbacks from "./EmptyFeedbacks";
import useRefreshFeedbacks from "@/hooks/useRefreshFeedbacks";
import Loading from "@/app/loading";
import useRefreshVotesFeedbacks from "@/hooks/useRefreshVotesFeedback";

const FeedbackList = () => {
  const { feedbackType, feedbackData } = useSelector(
    (state: RootState) => state.feedback
  );
  const { items, hasMore } = feedbackData;
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const [loading, setLoading] = useState({
    pendingMoreFeedbacks: false,
    pendingFeedbacks: false,
  });

  // Cập nhật danh sách phản hồi theo thời gian thực
  useRefreshFeedbacks();

  // Cập nhật lượt bình chọn phản hồi theo thời gian thực
  useRefreshVotesFeedbacks();

  useEffect(() => {
    const handleFetchingData = async () => {
      setLoading((prev) => ({ ...prev, pendingFeedbacks: true }));
      await Promise.all([
        dispatch(getVoteListFeedback(params.slug as string)),
        dispatch(
          getFeedbacks({
            movieSlug: params.slug as string,
            type: feedbackType,
            limit: 10,
          })
        ),
      ]);

      setLoading((prev) => ({ ...prev, pendingFeedbacks: false }));
    };

    handleFetchingData();
  }, [params.slug, feedbackType]);

  const handleSeeMoreFeedbacks = async () => {
    setLoading((prev) => ({ ...prev, pendingMoreFeedbacks: true }));
    await dispatch(
      getMoreFeedbacks({
        movieSlug: params.slug as string,
        type: feedbackType,
        limit: 5,
        afterTime: items?.length ? items[items.length - 1].created_at : 0,
      })
    );

    setLoading((prev) => ({ ...prev, pendingMoreFeedbacks: false }));
  };

  if (loading.pendingFeedbacks) {
    return (
      <Box className="h-96 flex items-center justify-center">
        <Loading type="bars" height="h-1/2" />
      </Box>
    );
  }

  if (!items || items.length === 0) {
    return <EmptyFeedbacks />;
  }

  return (
    <Box className="flex flex-col gap-6">
      <Box className="flex flex-col gap-8">
        <>
          {items?.map((item: any, index: number) => (
            <RootFeedbackProvider
              key={index}
              value={{
                rootFeedbackId: item._id,
                rootFeedback: item,
              }}
            >
              <FeedbackItem feedback={item} />
            </RootFeedbackProvider>
          ))}
        </>
      </Box>

      {hasMore && (
        <SeeMoreFeedback
          loading={loading.pendingMoreFeedbacks}
          callback={handleSeeMoreFeedbacks}
        />
      )}
    </Box>
  );
};

export default FeedbackList;
