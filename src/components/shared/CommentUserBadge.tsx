"use client";

import { Box } from "@chakra-ui/react";
import StatusTag from "./StatusTag";
import GenderIcon from "../feedback/GenderIcon";

interface CommentUserBadgeProps {
  author: Author;
  isAnonymous: boolean | number;
}

const CommentUserBadge = ({ author, isAnonymous }: CommentUserBadgeProps) => {
  const showAdminInfo = author?.role === "admin" && !isAnonymous;

  return (
    <Box className="text-xs flex gap-2 items-center flex-shrink-0">
      {showAdminInfo && <StatusTag text="ADMIN" />}

      <span
        className={`${
          showAdminInfo ? "text-gradient-primary font-bold" : "text-white"
        } break-words truncate`}
      >
        {isAnonymous ? "Người dùng ẩn danh" : author.username}
      </span>
      <GenderIcon gender={author.gender} />
    </Box>
  );
};

export default CommentUserBadge;
