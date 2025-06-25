"use client";

import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playAudioNotification } from "@/store/slices/systemSlice";
import useNotification from "@/hooks/useNotification";

const NotificationSound = () => {
  const audioRef = useRef(null);
  const dispatch: AppDispatch = useDispatch();
  const { playAudioNotification: isPlayAudio, srcAudioNotification } =
    useSelector((state: RootState) => state.system.audio);
  const { notificationAlert } = useNotification();

  useEffect(() => {
    if (isPlayAudio && audioRef.current) {
      const audioElement = audioRef.current as HTMLAudioElement;

      audioElement.src = srcAudioNotification || "/sounds/notification.mp3";
      audioElement.currentTime = 0;

      audioElement
        .play()
        .catch((error) => {
          notificationAlert({
            title: "Lỗi",
            description: "Không thể phát âm thanh thông báo.",
            type: "error",
          });
        })
        .finally(() => {
          dispatch(playAudioNotification(false));
        });
    }
  }, [playAudioNotification, srcAudioNotification]);

  return <audio ref={audioRef} preload="auto" hidden />;
};

export default NotificationSound;
