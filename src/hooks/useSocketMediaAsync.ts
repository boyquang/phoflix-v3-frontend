"use client";

import { socket } from "@/configs/socket.config";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import useLoadedMetaDataVideo from "./useLoadedMeteDataVideo";
import { handleShowToaster } from "@/lib/utils";

interface UseSocketMediaAsyncProps {
  roomId: string;
  roomOwnerId: string;
  playerRef: any;
}

const useSocketMediaAsync = ({
  roomId,
  roomOwnerId,
  playerRef,
}: UseSocketMediaAsyncProps) => {
  const { data: session, status } = useSession();
  const isPlayerReady = useLoadedMetaDataVideo({ playerRef });

  const commonChecks = (roomIdRes: string) => {
    if (!playerRef.current || !isPlayerReady) return false;
    if (roomIdRes !== roomId) return false;
    if (session?.user?.id === roomOwnerId) return false;
    return true;
  };

  useEffect(() => {
    if (status !== "authenticated") return;

    const handleVideoPlay = (data: any) => {
      const { roomId: roomIdRes } = data;

      if (!commonChecks(roomIdRes)) return;

      playerRef.current.play();
    };

    const handleVideoPause = (data: any) => {
      const { roomId: roomIdRes } = data;

      if (!commonChecks(roomIdRes)) return;

      playerRef.current.pause();
    };

    const handleVideoTimeUpdate = (data: any) => {
      const { currentTime, roomId: roomIdRes, isPlaying, message } = data;

      if (!commonChecks(roomIdRes)) return;

      if (isPlaying && playerRef.current.paused) {
        playerRef.current.play();
      } else if (!isPlaying && !playerRef.current.paused) {
        playerRef.current.pause();
      }

      // Cập nhật thời gian video
      playerRef.current.currentTime(currentTime);

      handleShowToaster("Thông báo", message, "info");
    };

    socket.on("videoPlay", handleVideoPlay);
    socket.on("videoPause", handleVideoPause);
    socket.on("videoTimeUpdate", (data) => {
      handleVideoTimeUpdate(data);

      if (session?.user?.id !== roomOwnerId && playerRef.current) {
        playerRef.current.muted(true);
      }
    });

    return () => {
      socket.off("videoPlay", handleVideoPlay);
      socket.off("videoPause", handleVideoPause);
      socket.off("videoTimeUpdate", handleVideoTimeUpdate);
    };
  }, [status, roomId, roomOwnerId, isPlayerReady]);
};

export default useSocketMediaAsync;
