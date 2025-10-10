"use client";

import { Box } from "@chakra-ui/react";
import { TbMessageFilled } from "react-icons/tb";
import CommentToggleTab from "./FeedbackToggleTab";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { MdReviews } from "react-icons/md";
import { FaStarOfDavid } from "react-icons/fa6";

const FeedbackSummary = () => {
  const { feedbackData, feedbackType } = useSelector(
    (state: RootState) => state.feedback
  );
  const totalFeedbacks = feedbackData.totalFeedbacks;

  return (
    <Box>
      <Box className="flex lg:gap-6 gap-4 items-center">
        <Box className="flex gap-2 items-center lg:text-2xl text-lg text-gray-50">
          {feedbackType === "comment" ? <TbMessageFilled /> : <FaStarOfDavid />}

          <span>
            {feedbackType === "comment" ? "Bình luận" : "Đánh giá"}{" "}
            <span>({totalFeedbacks})</span>
          </span>
        </Box>
        <CommentToggleTab />
      </Box>
    </Box>
  );
};

export default FeedbackSummary;
