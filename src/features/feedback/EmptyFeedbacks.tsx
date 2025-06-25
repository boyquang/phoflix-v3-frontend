"use client";

import { Box } from "@chakra-ui/react";
import EmptyData from "../../components/shared/EmptyData";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { BiSolidMessageDetail } from "react-icons/bi";
import { MdReviews } from "react-icons/md";

const EmptyFeedbacks = () => {
  const { feedbackType } = useSelector((state: RootState) => state.feedback);

  return (
    <Box className="flex justify-center items-center h-48 mt-8 bg-[#0003] rounded-2xl">
      <EmptyData
        title={
          feedbackType === "comment"
            ? "Chưa có lượt bình luận nào"
            : "Chưa có lượt đánh giá nào"
        }
        description={
          feedbackType === "comment"
            ? "Hãy là người đầu tiên bình luận về bộ phim này"
            : "Hãy là người đầu tiên đánh giá về bộ phim này"
        }
        icon={
          feedbackType === "comment" ? <BiSolidMessageDetail /> : <MdReviews />
        }
      />
    </Box>
  );
};

export default EmptyFeedbacks;
