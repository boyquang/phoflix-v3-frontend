"use client";

import { Box } from "@chakra-ui/react";
import Link from "next/link";
import Image from "../shared/Image";
import CommentUserBadge from "../shared/CommentUserBadge";
import { FaPlay } from "react-icons/fa6";
import useFeedbackAuthor from "@/hooks/useFeedbackAuthor";

interface LatestCommentItemProps {
  comment: TLatestComment;
}

const LatestCommentItem = ({ comment }: LatestCommentItemProps) => {
  const { avatar, username } = useFeedbackAuthor({
    author: comment.author,
  });

  return (
    <Link
      href={`/thong-tin-phim/${comment?.slug}?cid=${comment?._id}`}
      className="flex items-start gap-4 bg-[#0005] overflow-hidden p-2 rounded-md border border-transparent hover:border-[#fff2]"
    >
      <Box className="relative flex-shrink-0 w-10 h-10">
        <Image
          src={avatar}
          alt={username}
          className="rounded-full"
        />
      </Box>
      <Box className="flex-1 overflow-hidden">
        <Box className="mb-2 flex items-center gap-2 overflow-hidden">
          <CommentUserBadge
            isAnonymous={comment.author.is_anonymous}
            author={comment.author}
          />
          <p className="min-w-0 text-xs text-[#aaa] break-all truncate flex-1">
            {comment.content || "N/a"}
          </p>
        </Box>
        <Box className="flex items-center gap-1 text-xs text-gray-500 truncate">
          <FaPlay className="text-primary flex-shrink-0" />
          <span className="block break-all flex-1 min-w-0 truncate">
            {comment?.name || "N/a"}
          </span>
        </Box>
      </Box>
    </Link>
  );
};

export default LatestCommentItem;
