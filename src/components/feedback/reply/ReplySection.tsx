"use client";

import { getReplyListFeedback } from "@/store/async-thunks/feedback.thunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useState, useTransition } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import ReplyList from "./ReplyList";
import { useRootFeedback } from "@/hooks/useRootFeedback";
import { setParentId } from "@/store/slices/feedback.slice";

const ReplySection = ({ totalChildren }: ReplySectionProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { repliesData, feedbackType } = useSelector(
    (state: RootState) => state.feedback
  );
  const [isOpen, setIsOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const context = useRootFeedback();
  const rootFeedbackId = context?.rootFeedbackId as string;

  const handleToggleReply = async () => {
    if (!isOpen) {
      startTransition(async () => {
        await dispatch(
          getReplyListFeedback({
            parentId: rootFeedbackId,
            type: feedbackType,
            limit: 5,
          })
        );
      });
    }

    setIsOpen(!isOpen);
    dispatch(setParentId(rootFeedbackId));
  };

  return (
    <Box className="mt-4">
      <Box
        className="inline-flex items-center select-none gap-1 text-primary cursor-pointer"
        onClick={handleToggleReply}
      >
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        <span className="text-xs">
          {isOpen ? "Ẩn bớt" : `Xem ${totalChildren} phản hồi`}
        </span>
      </Box>

      {isOpen && (
        <ReplyList
          data={repliesData?.data?.[rootFeedbackId]}
          loading={pending}
        />
      )}
    </Box>
  );
};

export default ReplySection;
