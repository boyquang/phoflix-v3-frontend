"use client";

import { Box } from "@chakra-ui/react";
import ReplyItem from "./ReplyItem";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { getMoreReplyListFeedback } from "@/store/async-thunks/feedback.thunk";
import SeeMoreFeedback from "../SeeMoreFeedback";
import SkeletonFeedback from "@/components/skeletons/SkeletonFeedback";
import { useState } from "react";
import { useRootFeedback } from "@/hooks/useRootFeedback";

const ReplyList = ({ data, loading }: ReplyListProps) => {
  const { items: replies, hasMore } = data || {};
  const { feedbackType } = useSelector((state: RootState) => state.feedback);
  const dispatch: AppDispatch = useDispatch();
  const [pending, setPending] = useState(false);
  const context = useRootFeedback();
  const parentId = context?.rootFeedbackId as string;

  const handleSeeMoreReplyFeedback = async () => {
    setPending(true);
    await dispatch(
      getMoreReplyListFeedback({
        parentId,
        type: feedbackType,
        limit: 5,
        afterTime: replies?.length
          ? replies?.[replies?.length - 1]?.created_at
          : 0,
      })
    );
    setPending(false);
  };

  if (loading) {
    return <SkeletonFeedback />;
  }

  return (
    <Box className="flex flex-col gap-2 mt-6 sm:ml-0 ml-[-56px] sm:border-l-0 border-l-2 border-[#ffffff10] sm:pl-0 pl-4">
      <Box className="flex flex-col gap-4">
        <>
          {replies?.map((item, index: number) => (
            <ReplyItem key={index} reply={item} />
          ))}
        </>
      </Box>

      {hasMore && (
        <SeeMoreFeedback
          loading={pending}
          callback={handleSeeMoreReplyFeedback}
        />
      )}
    </Box>
  );
};

export default ReplyList;
