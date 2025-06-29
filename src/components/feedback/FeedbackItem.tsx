"use client";

import { Box } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { formatDateUnix } from "@/lib/utils";
import FeedbackActions from "./FeedbackActions";
import ReplySection from "./reply/ReplySection";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import FeedbackInput from "./FeedbackInput";
import GenderIcon from "./GenderIcon";
import Rated from "./review/Rated";
import StatusTag from "../shared/StatusTag";
import "@/assets/css/animation.css";
import EditFeedback from "./EditFeedback";
import useScrollToFeedbackCid from "@/hooks/useScrollToFeedbackCid";

const FeedbackItem = ({ feedback }: FeedbackItemProps) => {
  const { cid } = useScrollToFeedbackCid({ id: feedback?._id });
  const { feedbackType, feedbackData, idEditFeedback } = useSelector(
    (state: RootState) => state.feedback
  );
  const showFeedbackId = feedbackData.showFeedbackId;
  const feedbackId = feedback?._id;
  const isEditing = idEditFeedback === feedbackId;

  // Kiểm tra người dùng có phải là ẩn danh hay không
  const isAnonymous = Number(feedback?.is_anonymous) === 1;
  const name = isAnonymous ? "Người đăng ẩn danh" : feedback?.author?.name;
  const avatar = isAnonymous
    ? "/images/anonymous.jpg"
    : feedback?.author?.avatar;

  return (
    <Box
      id={feedbackId}
      className={`flex gap-4 items-start relative ${
        feedbackId === cid ? "mine" : ""
      }`}
    >
      <Avatar
        name={name}
        src={avatar}
        className="w-10 h-10"
        fallback={<Box className="w-10 h-10 bg-gray-200 rounded-full"></Box>}
      />
      <Box className="flex-1">
        <Box className="flex gap-2 items-center mb-1.5 flex-wrap">
          {feedbackType === "review" && (
            <Rated point={feedback?.reviews?.point} />
          )}

          <Box className="text-xs flex gap-2 items-center">
            {feedback?.author?.role === "admin" && <StatusTag text="ADMIN" />}
            <span className="text-gray-50 break-all">{name}</span>
            <GenderIcon gender={feedback?.author?.gender} />
          </Box>

          <span className="text-[10px] text-gray-500 ml-1">
            {formatDateUnix(feedback?.created_at)}
          </span>
        </Box>

        {feedback?.is_spam === 0 ? (
          <>
            {!isEditing ? (
              <span className="text-gray-300 text-xs text-justify break-all">
                {feedback?.content}
              </span>
            ) : (
              <EditFeedback
                feedbackId={feedback?._id}
                defaultValue={feedback?.content}
              />
            )}

            <FeedbackActions data={feedback} action="comment" />
          </>
        ) : (
          <span className="text-xs text-gray-400 italic">
            Nội dung đã ẩn do bị đánh dấu spam.
          </span>
        )}

        {showFeedbackId === feedback?._id && (
          <FeedbackInput action="reply" autoFocus feedback={feedback} />
        )}

        {feedback?.total_children > 0 && (
          <ReplySection totalChildren={feedback?.total_children} />
        )}
      </Box>
    </Box>
  );
};

export default FeedbackItem;
