"use client";

import { anonymousAvatar } from "@/constants/image.contant";

interface UseFeedbackAuthorProps {
  author: Author;
  mentionUser?: Author | null;
}

const useFeedbackAuthor = ({ author, mentionUser }: UseFeedbackAuthorProps) => {
  const isAnonymous = Number(author?.is_anonymous) === 1;
  const showAdminInfo = author?.role === "admin" && !isAnonymous;
  const username = isAnonymous
    ? "Người dùng ẩn danh"
    : author.username || "N/a";
  const avatar = isAnonymous ? anonymousAvatar : author.avatar;
  const isMentionAnonymous =
    mentionUser && Number(mentionUser?.is_anonymous) === 1;
  const mentionUsername = isMentionAnonymous
    ? "Người đăng ẩn danh"
    : mentionUser?.username || "N/a";

  return {
    isAnonymous,
    showAdminInfo,
    username,
    avatar,
    mentionUsername,
    isMentionAnonymous,
  };
};

export default useFeedbackAuthor;
