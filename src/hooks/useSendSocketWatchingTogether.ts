"use client";

import { socket } from "@/configs/socket.config";
import { RoomUser } from "@/store/slices/room-users.slice";
import { RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

const useSendSocketWatchingTogether = () => {
  const { roomOwnerId } = useSelector(
    (state: RootState) => state.watchingTogether
  );
  const params = useParams();
  const roomId = params?.roomId as string;
  const [previousTime, setPreviousTime] = useState(0);
  const { data: session } = useSession();

  const payload = {
    roomId,
    user: {
      id: session?.user?.id,
      username: session?.user?.name,
      avatar: session?.user?.image,
    },
    roomOwnerId,
  };

  // Xử lý khi chủ phòng đóng phòng
  const sendSocketCloseRoom = () => {
    socket.emit("closeRoom", { hasLeftRoom: true, ...payload });
  };

  // Xử lý khi người dùng rời phòng
  const sendSocketLeaveRoom = () => {
    socket.emit("leaveRoom", payload);
  };

  // Xử lý khi chủ phòng thay đổi tập phim
  const sendSocketChangeEpisode = (currentEpisode: EpisodeMerged) => {
    // Chỉ gửi sự kiện nếu người dùng là chủ phòng
    if (session?.user?.id === roomOwnerId) {
      socket.emit("asyncEpisode", {
        roomId,
        roomOwnerId,
        currentEpisode,
      });
    }
  };

  // Xử lý khi chủ phòng cập nhật thời gian video
  const sendSocketVideoTimeUpdate = (player: any) => {
    if (!session) return;

    const currentTime = player.currentTime();

    if ((currentTime ?? 0) - previousTime > 1) {
      if (session?.user?.id === roomOwnerId) {
        socket.emit("videoTimeUpdate", {
          ...payload,
          currentTime,
          isPlaying: !player.paused(),
        });
      }
      setPreviousTime(currentTime ?? 0);
    }
  };

  // Xử lý khi chủ phòng phát video
  const sendSocketVideoPlay = () => {
    if (!session) return;

    if (session?.user?.id === roomOwnerId) {
      socket.emit("videoPlay", payload);
    }
  };

  // Xử lý khi chủ phòng tạm dừng video
  const sendSocketVideoPause = () => {
    if (!session) return;

    if (session?.user?.id === roomOwnerId) {
      socket.emit("videoPause", payload);
    }
  };

  // Xử lý khi chủ phòng đá người dùng ra khỏi phòng
  const sendSocketKickUser = (user: RoomUser) => {
    socket.emit("kickUserOutOfRoom", {
      roomId,
      user: {
        id: user?.id,
        username: user?.username,
      },
    });
  };

  // Xử lý khi người dùng tham gia phòng
  const sendSocketJoinRoom = (roomOwnerId: string) => {
    socket.emit("joinRoom", {
      ...payload,
      roomOwnerId,
    });
  };

  return {
    sendSocketCloseRoom,
    sendSocketLeaveRoom,
    sendSocketChangeEpisode,
    sendSocketVideoTimeUpdate,
    sendSocketVideoPlay,
    sendSocketVideoPause,
    sendSocketKickUser,
    sendSocketJoinRoom,
  };
};

export default useSendSocketWatchingTogether;
