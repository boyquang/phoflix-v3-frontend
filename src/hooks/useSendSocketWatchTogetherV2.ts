"use client";

import { socketV2 } from "@/configs/socket.config";

const useSendSocketWatchTogetherV2 = () => {
  const ensureSocketConnected = () => {
    if (!socketV2.connected) {
      console.log("Socket chưa kết nối, đang kết nối...");
      socketV2.connect();
    }
  };

  const sendSocketSyncRoomData = (roomData: Room) => {
    ensureSocketConnected();
    socketV2.emit("syncRoomData", { roomData });
  };

  const sendSocketJoinRoom = (
    roomId: string,
    newUser: ParticipantUser,
    hostUserId: string
  ) => {
    ensureSocketConnected();
    socketV2.emit("joinRoom", { roomId, newUser, hostUserId });
  };

  const sendSocketCreateRoom = (room: Room, userId: string) => {
    ensureSocketConnected();

    const { movie, ...restRoom } = room;
    const { episodes, ...restMovie } = movie as Movie;
    const sanitizedRoom = {
      ...restRoom,
      movie: {
        ...restMovie,
      },
    };
    socketV2.emit("createRoom", { room: sanitizedRoom, userId });
  };

  const sendSocketLeaveRoom = (roomId: string, user: ParticipantUser) => {
    ensureSocketConnected();
    socketV2.emit("leaveRoom", { roomId, user });
  };

  const sendSocketStartRoom = (roomId: string, userId: string) => {
    ensureSocketConnected();
    socketV2.emit("startLiveRoom", { roomId, userId });
  };

  const sendSocketEndRoom = (roomId: string, userId: string) => {
    ensureSocketConnected();
    socketV2.emit("endLiveRoom", { roomId, userId });
  };

  const sendSocketKickUser = (
    roomId: string,
    userId: string, // host userId
    targetUserId: string // userId to be kicked
  ) => {
    ensureSocketConnected();
    socketV2.emit("kickUser", { roomId, userId, targetUserId });
  };

  const sendSocketDeleteRoom = (roomId: string, userId: string) => {
    ensureSocketConnected();
    socketV2.emit("deleteRoom", { roomId, userId });
  };

  const sendSocketSyncVideoTime = (
    roomId: string,
    currentTime: number,
    userId: string
  ) => {
    ensureSocketConnected();
    socketV2.emit("syncVideoTime", { roomId, currentTime, userId });
  };

  const sendSocketSyncEpisode = (params: SendSocketSyncEpisodeParams) => {
    ensureSocketConnected();
    socketV2.emit("syncEpisode", params);
  };

  return {
    sendSocketJoinRoom,
    sendSocketCreateRoom,
    sendSocketLeaveRoom,
    sendSocketEndRoom,
    sendSocketStartRoom,
    sendSocketKickUser,
    sendSocketSyncRoomData,
    sendSocketDeleteRoom,
    sendSocketSyncVideoTime,
    sendSocketSyncEpisode,
  };
};

export default useSendSocketWatchTogetherV2;
