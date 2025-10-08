"use client";

import { Avatar } from "@/components/ui/avatar";
import { formatDateUnix } from "@/lib/utils";
import { Box } from "@chakra-ui/react";
import FeedbackActions from "../FeedbackActions";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import FeedbackInput from "../FeedbackInput";
import EditFeedback from "../EditFeedback";
import useScrollToFeedbackCid from "@/hooks/useScrollToFeedbackCid";
import CommentUserBadge from "@/components/shared/CommentUserBadge";
import useFeedbackAuthor from "@/hooks/useFeedbackAuthor";

const ReplyItem = ({ reply }: ReplyItemProps) => {
  const { cid } = useScrollToFeedbackCid({ id: reply?._id });
  const { repliesData, idEditFeedback } = useSelector(
    (state: RootState) => state.feedback
  );
  const { avatar, username, mentionUsername, isAnonymous } = useFeedbackAuthor({
    author: {
      ...reply?.author,
      is_anonymous: reply?.is_anonymous,
    },
    mentionUser: reply?.mention_user,
  });
  const { showReplyId } = repliesData;
  const isEditing = idEditFeedback === reply?._id;

  return (
    <Box
      className={`flex gap-4 items-start ${reply?._id === cid ? "mine" : ""}`}
      id={reply?._id}
    >
      <Avatar
        name={username}
        src={avatar}
        className="sm:w-10 sm:h-10 w-8 h-8"
        fallback={
          <Box className="sm:w-10 sm:h-10 w-8 h-8 bg-gray-200 rounded-full"></Box>
        }
      />
      <Box className="flex-1">
        <Box className="flex gap-2 items-center mb-1.5 flex-wrap">
          <CommentUserBadge
            isAnonymous={isAnonymous}
            author={{
              ...reply?.author,
              is_anonymous: reply?.is_anonymous,
            }}
          />

          <span className="text-[10px] text-gray-500 ml-1">
            {formatDateUnix(reply?.created_at)}
          </span>
        </Box>
        {reply?.is_spam === 0 ? (
          <>
            {!isEditing ? (
              <div>
                <span className="bg-[#3e435c] mr-2 whitespace-normal break-all max-w-full text-xs text-gray-50 p-[2px] rounded-sm">
                  @{mentionUsername}
                </span>
                <span className="text-gray-300 text-xs text-justify break-all">
                  {reply?.content}
                </span>
              </div>
            ) : (
              <EditFeedback
                feedbackId={reply?._id}
                defaultValue={reply?.content}
              />
            )}

            <FeedbackActions data={reply} action="reply" />
          </>
        ) : (
          <span className="text-xs text-gray-400 italic">
            Nội dung đã ẩn do bị đánh dấu spam.
          </span>
        )}

        {showReplyId === reply?._id && (
          <FeedbackInput action="reply" autoFocus feedback={reply} />
        )}
      </Box>
    </Box>
  );
};

export default ReplyItem;
