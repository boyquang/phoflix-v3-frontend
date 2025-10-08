"use client";

import { Box, Link } from "@chakra-ui/react";
import Image from "../shared/Image";
import CommentUserBadge from "../shared/CommentUserBadge";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { TbMessageFilled } from "react-icons/tb";
import useFeedbackAuthor from "@/hooks/useFeedbackAuthor";

interface TopCommentItemProps {
  comment: TTopComment;
}

const TopCommentItem = ({ comment }: TopCommentItemProps) => {
  const { avatar, username } = useFeedbackAuthor({
    author: {
      ...comment.author,
      is_anonymous: comment.is_anonymous,
    },
  });

  return (
    <Box className="rounded-lg group flex flex-col gap-4 relative p-4">
      <Box
        style={{
          WebkitMaskImage: "linear-gradient(180deg, black 0, transparent 80%)",
          maskImage: "linear-gradient(180deg, black 0, transparent 80%)",
        }}
        className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-all"
      >
        <Image
          src={comment?.movie_thumb || ""}
          alt={comment?.movie_slug || ""}
          className="rounded-lg"
        />
      </Box>
      <Box className="flex flex-col relative z-[2]">
        <Box className="flex items-start justify-between">
          <Box className="relative w-12 h-12 rounded-full border-2 border-transparent group-hover:border-white">
            <Image src={avatar} alt={username} className="rounded-full" />
          </Box>

          <Link
            href={`/thong-tin-phim/${comment?.movie_slug}?cid=${comment?._id}`}
          >
            <Box className="w-[50px] flex-shrink-0">
              <Box className="relative z-[5] pb-[150%]">
                <Image
                  src={comment?.movie_thumb || ""}
                  alt={comment?.movie_slug || ""}
                  className="rounded-md"
                />
              </Box>
            </Box>
          </Link>
        </Box>
        <Box className="flex flex-col gap-2 mt-2">
          <CommentUserBadge
            isAnonymous={comment?.is_anonymous}
            author={comment?.author}
          />

          <p className="text-[#fff8] text-xs truncate mt-1">
            {comment.content}
          </p>
          <Box className="flex items-center gap-4 text-xs text-gray-400 mt-2">
            <Box className="flex items-center gap-1">
              <AiFillLike />
              {comment.total_like}
            </Box>
            <Box className="flex items-center gap-1">
              <AiFillDislike />
              {comment.total_dislike}
            </Box>
            <Box className="flex items-center gap-1">
              <TbMessageFilled />
              {comment.total_children}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TopCommentItem;
