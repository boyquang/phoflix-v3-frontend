"use client";

import { socket } from "@/configs/socket.config";
import { getRoomDataWatchingTogether } from "@/store/async-thunks/watching-together.thunk";
import { setRoomUsers } from "@/store/slices/room-users.slice";
import { AppDispatch, RootState } from "@/store/store";
import { delay } from "lodash";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentEpisode,
  shareDataFromOwnerRoom,
} from "@/store/slices/watching-together.slice";
import { toast } from "sonner";

interface UseSocketRoomUserEventsProps {
  roomId: string;
}

const useSocketRoomUserEvents = ({ roomId }: UseSocketRoomUserEventsProps) => {
  const { data: session, status } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const { roomOwnerId, currentEpisode, maxUserInRoom, movieData } = useSelector(
    (state: RootState) => state.watchingTogether
  );

  // Xử lý khi người dùng rời phòng
  const handleUserLeaveRoom = (data: any) => {
    const { user, users } = data;

    if (!user) return;

    if (user?.id !== session?.user?.id) {
      toast.info(`Người xem ${user?.username} đã rời phòng!`);
      // Cập nhật danh sách người dùng trong phòng
      dispatch(setRoomUsers(users));
    } else {
      delay(() => {
        window.location.href = "/";
      }, 1000);
    }
  };

  // Xử lý khi người dùng bị đuổi khỏi phòng
  const handleKickUserOutOfRoom = (data: any) => {
    const { message, user, users } = data;

    if (!user) return;

    if (user?.id !== session?.user?.id) {
      toast.info(message?.viewer);
      // Cập nhật danh sách người dùng trong phòng
      dispatch(setRoomUsers(users));
    } else {
      toast.info(message?.user);
      delay(() => {
        window.location.href = "/";
      }, 1000);
    }
  };

  // Xử lý khi người dùng tham gia phòng
  const handlesetUserJoined = (data: any) => {
    const { user, message, roomId: roomIdRes, users } = data;

    if (!user) return;

    // Thông báo cho người trong phòng trừ người tham gia và đúng phòng hiện tại
    if (user?.id !== session?.user?.id && roomId === roomIdRes) {
      toast.info(message);
    }

    // Chỉ khi chủ phòng vào thì mới load data cho toàn bộ phòng
    // Ngược lại là thành viên tham gia thì load danh sách người dùng
    if (user?.id === data?.roomOwnerId) {
      dispatch(
        getRoomDataWatchingTogether({
          roomId,
          accessToken: session?.user?.accessToken as string,
        })
      );
    }

    // Cập nhật danh sách người dùng trong phòng
    dispatch(setRoomUsers(users));

    // Người vừa tham gia yêu cầu đồng bộ video đến chủ phòng
    if (session?.user?.id === user?.id && user?.id !== roomOwnerId) {
      socket.emit("requestSyncRoomState", { roomId, user });
    }
  };

  // Xử lý khi phòng bị đóng
  const handleUserCloseRoom = (data: any) => {
    const { message, roomId: roomIdRes } = data;

    if (roomIdRes !== roomId) return;

    if (session?.user?.id === roomOwnerId) {
      toast.info(message?.owner);
    } else {
      toast.info(message?.viewer);
    }

    delay(() => {
      window.location.href = "/";
    }, 1000);
  };

  // Xử lý khi chủ phòng đồng bộ tập phim
  const handleAsyncEpisode = (data: any) => {
    const { roomId: roomIdRes, currentEpisode, message, roomOwnerId } = data;

    if (session?.user?.id !== roomOwnerId && roomIdRes === roomId) {
      dispatch(setCurrentEpisode(currentEpisode));
      toast.info(message);
    }
  };

  // Xử lý khi nhận yêu cầu đồng bộ dữ liệu phòng từ người dùng
  const handleRequestSyncRoomState = (data: any) => {
    if (session?.user?.id !== roomOwnerId) return;

    const { user, roomId: roomIdRes } = data;

    if (roomId === roomIdRes) {
      socket.emit("syncRoomState", {
        currentEpisode,
        roomOwnerId,
        roomId,
        user,
        maxUserInRoom,
        movieData,
      });
    }
  };

  // Xử lý đồng bộ dữ liệu phòng cho người dùng yêu cầu
  const handleSyncRoomState = (data: any) => {
    const {
      currentEpisode,
      user,
      roomId: roomIdRes,
      roomOwnerId,
      movieData,
      message,
      maxUserInRoom,
    } = data;

    if (!currentEpisode) return;

    // Chỉ đồng bộ dữ liệu cho người yêu cầu và đúng phòng
    if (session?.user?.id === user?.id && roomId === roomIdRes) {
      dispatch(
        shareDataFromOwnerRoom({
          roomId,
          currentEpisode,
          roomOwnerId,
          maxUserInRoom,
          movieData,
        })
      );

      toast.info(message);
    }
  };

  useEffect(() => {
    if (status !== "authenticated") return;

    socket.on("userLeaveRoom", handleUserLeaveRoom);
    socket.on("kickUserOutOfRoom", handleKickUserOutOfRoom);
    socket.on("setUserJoined", handlesetUserJoined);
    socket.on("userCloseRoom", handleUserCloseRoom);
    socket.on("asyncEpisode", handleAsyncEpisode);
    socket.on("syncRoomState", handleSyncRoomState);
    socket.on("requestSyncRoomState", handleRequestSyncRoomState);

    return () => {
      socket.off("userLeaveRoom", handleUserLeaveRoom);
      socket.off("setUserJoined", handlesetUserJoined);
      socket.off("syncRoomState", handleSyncRoomState);
      socket.off("kickUserOutOfRoom", handleKickUserOutOfRoom);
      socket.off("userCloseRoom", handleUserCloseRoom);
      socket.off("asyncEpisode", handleAsyncEpisode);
      socket.off("requestSyncRoomState", handleRequestSyncRoomState);
    };
  }, [status, roomId, currentEpisode]);
};

export default useSocketRoomUserEvents;
