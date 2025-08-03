"use client";

import { socket } from "@/configs/socket.config";
import { useEffect } from "react";
import useNotification from "./useNotification";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { setNewNotification } from "@/store/slices/notification.slice";
import { useSession } from "next-auth/react";
import { useSpeechUtterance } from "./useSpeechUtterance";

const useSocketShowNotification = () => {
  const { showNotification } = useNotification();
  const dispatch: AppDispatch = useDispatch();
  const { data: sesstion } = useSession();
  const { createUtterance } = useSpeechUtterance({
    lang: "vi-VN",
    rate: 1,
    pitch: 1,
  });

  useEffect(() => {
    socket.on("showNotification", (data) => {
      const { senderId, receiverId, type, voteType } = data;

      if (!senderId || !receiverId) return;

      // Chỉ hiện thị thông báo nếu người dùng hiện tại là người nhận
      if (sesstion?.user?.id === receiverId) {
        dispatch(setNewNotification(true));

        // Đọc thông báo bằng giọng nói
        const utterance = createUtterance("Bạn vừa nhận được thông báo mới");
        speechSynthesis.speak(utterance);
      }

      if (type === "replyFeedback") {
        showNotification(senderId, receiverId);
      }

      if (type === "voteFeedback" && voteType === "like") {
        showNotification(senderId, receiverId);
      }
    });

    return () => {
      socket.off("showNotification");
    };
  });
};

export default useSocketShowNotification;
