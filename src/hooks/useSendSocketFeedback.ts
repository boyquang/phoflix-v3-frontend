"use client";

import { socket } from "@/configs/socket.config";
import { RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

const useSendSocketFeedback = () => {
  const params = useParams();
  const { feedbackType } = useSelector((state: RootState) => state.feedback);
  const { data: session } = useSession();

  const sendSocketAddNewFeedback = () => {
    socket.emit("addNewFeedback", {
      senderId: session?.user?.id,
      slug: params.slug,
      feedbackType,
      type: "addFeedback",
    });
  };

  const sendSocketReplyFeedback = (
    receiverId: string,
    rootFeedbackId: string | undefined
  ) => {
    socket.emit("replyFeedback", {
      receiverId,
      senderId: session?.user?.id,
      slug: params.slug,
      feedbackType,
      type: "replyFeedback",
      rootFeedbackId: rootFeedbackId || null,
    });
  };

  const sendSocketUpdateFeedback = (rootFeedbackId: string | null) => {
    socket.emit("updateFeedback", {
      slug: params.slug,
      feedbackType,
      type: "updateFeedback",
      rootFeedbackId: rootFeedbackId || null,
    });
  };

  const sendSocketAddNewVote = (receiverId: string, voteType: string) => {
    socket.emit("addNewVote", {
      receiverId,
      voteType,
      senderId: session?.user?.id,
      slug: params?.slug,
      feedbackType,
      type: "voteFeedback",
    });
  };

  const sendSocketDeleteFeedback = (rootFeedbackId: string | null) => {
    socket.emit("deleteFeedback", {
      slug: params.slug,
      feedbackType,
      type: "deleteFeedback",
      rootFeedbackId: rootFeedbackId || null,
    });
  };

  const sendSocketAddNewReview = () => {
    socket.emit("addNewReview", {
      slug: params.slug,
      feedbackType: "review",
      type: "addReview",
    });
  };

  return {
    sendSocketAddNewFeedback,
    sendSocketReplyFeedback,
    sendSocketUpdateFeedback,
    sendSocketAddNewReview,
    sendSocketAddNewVote,
    sendSocketDeleteFeedback,
  };
};

export default useSendSocketFeedback;
