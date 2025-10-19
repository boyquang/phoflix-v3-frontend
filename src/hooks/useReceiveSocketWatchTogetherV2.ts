"use client";

import { socketV2 } from "@/configs/socket.config";
import {
  setRoomCreated,
  setUserJoined,
  setLiveRoomStatus,
  setDeletedRoom,
  setUserKicked,
  setVideoTimeSynced,
  setUserLeftRoom,
  setUserJoinedRoomByLink,
} from "@/store/slices/watch-together-v2.slice";
import { AppDispatch, RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import useSendSocketWatchTogetherV2 from "./useSendSocketWatchTogetherV2";
import { setCurrentEpisode } from "@/store/slices/episode.slice";
import { getIdFromLinkEmbed } from "@/lib/utils";

const useReceiveSocketWatchTogetherV2 = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const { sendSocketSyncEpisode, sendSocketRequireSyncVideoTime } =
    useSendSocketWatchTogetherV2();
  const { currentEpisode } = useSelector((state: RootState) => state.episode);
  const { roomData } = useSelector((state: RootState) => state.watchTogetherV2);

  useEffect(() => {
    if (status !== "authenticated") return;

    // Đảm bảo socket đã kết nối
    if (!socketV2.connected) {
      console.log("Socket chưa kết nối, đang kết nối...");
      socketV2.connect();
    }

    const handleJoinRoomError = (data: ResponseUserJoined) => {
      if (session?.user.id === data.newUser.userId) {
        toast.error("Không thể tham gia phòng. Vui lòng thử lại sau.");
        router.replace("/xem-chung");
      }
    };

    const handleRoomCreated = (data: ResponseRoomCreated) => {
      if (data?.room?.hostUserId === session?.user.id) return;
      dispatch(setRoomCreated(data?.room));
    };

    const handleUserJoinedRoomByLink = (data: ResponseUserJoinedRoomByLink) => {
      const {
        newUser,
        roomId,
        participantUsers,
        currentParticipants,
        hostUserId,
      } = data;

      const isSameRoom = roomData?._id === roomId;
      const isSamePage = pathname === `/xem-chung/phong/${roomId}`;

      if (session?.user.id === hostUserId && currentEpisode) {
        sendSocketSyncEpisode({
          roomId,
          episode: currentEpisode,
          newUserId: newUser?.userId,
          hostUserId,
          whoRequested: "user", // người mới vào phòng yêu cầu đồng bộ
        });
      }

      if (isSamePage && isSameRoom) {
        if (newUser?.userId === session?.user.id) {
          sendSocketRequireSyncVideoTime(roomId, newUser.userId, hostUserId);
          dispatch(
            setUserJoinedRoomByLink({
              roomId,
              participantUsers,
              currentParticipants,
            })
          );
        } else {
          toast.info(`${newUser?.username} vừa vào phòng qua link.`);
          dispatch(
            setUserJoined({
              roomId,
              user: newUser,
            })
          );
        }
      }
    };

    const handleUserJoined = (data: ResponseUserJoined) => {
      const { hostUserId, newUser, roomId } = data;
      if (newUser?.userId === session?.user.id) return;

      dispatch(setUserJoined({ roomId, user: newUser }));

      // Đồng bộ tập phim cho người dùng mới vào phòng
      if (session?.user.id === hostUserId && currentEpisode) {
        sendSocketSyncEpisode({
          roomId,
          episode: currentEpisode,
          newUserId: newUser?.userId,
          hostUserId,
          whoRequested: "user", // người mới vào phòng yêu cầu đồng bộ
        });
      }

      const isSameRoom = roomData?._id === roomId;
      const isSamePage = pathname === `/xem-chung/phong/${roomId}`;
      if (isSameRoom && isSamePage) {
        toast.info(`${newUser?.username} vừa vào phòng`);
        sendSocketRequireSyncVideoTime(roomId, newUser.userId, hostUserId);
      }
    };

    const handleLiveRoomStarted = (data: ResponseLiveRoom) => {
      if (data?.hostUserId === session?.user.id) return;

      dispatch(
        setLiveRoomStatus({ status: data?.roomStatus, roomId: data?.roomId })
      );
    };

    const handleLiveRoomEnded = (data: ResponseLiveRoom) => {
      if (data?.hostUserId === session?.user.id) return;
      dispatch(
        setLiveRoomStatus({ status: data?.roomStatus, roomId: data?.roomId })
      );
    };

    const handleDeleteRoom = (data: ResponseDeleteRoom) => {
      if (data?.hostUserId === session?.user.id) return;
      dispatch(setDeletedRoom(data.roomId));
    };

    const handleUserKicked = (data: ResponseUserKicked) => {
      if (data?.hostUserId === session?.user.id) return;
      dispatch(
        setUserKicked({
          roomId: data?.roomId,
          targetUserId: data?.targetUserId,
        })
      );

      const isSameRoom = roomData?._id === data?.roomId;
      const isSamePage = pathname === `/xem-chung/phong/${data?.roomId}`;

      // user là người bị kick
      if (data?.targetUserId === session?.user.id && isSameRoom && isSamePage) {
        toast.error("Bạn đã bị chủ phòng đá ra khỏi phòng.");
        if (pathname === `/xem-chung/phong/${data.roomId}`) {
          window.location.replace("/xem-chung");
        }
      }
    };

    const handleVideoTimeSynced = (data: ResponseVideoTimeSynced) => {
      const { roomId, currentTime, hostUserId, whoRequested, userRequestedId } =
        data;
      if (hostUserId === session?.user.id) return;

      const userSync =
        whoRequested === "user" && userRequestedId === session?.user.id;
      const viewerSync =
        whoRequested === "host" && hostUserId !== session?.user.id;

      if (userSync || viewerSync) {
        dispatch(
          setVideoTimeSynced({
            roomId,
            currentTime,
          })
        );

        const isSameRoom = roomData?._id === roomId;
        const isSamePage = pathname === `/xem-chung/phong/${roomId}`;
        if (isSameRoom && isSamePage) {
          toast.info("Thời gian video đã được đồng bộ từ chủ phòng.");
        }
      }
    };

    const handleEpisodeSynced = (data: ResponseEpisodeSynced) => {
      const { newUserId, hostUserId, whoRequested, roomId, episode } = data;
      const id = getIdFromLinkEmbed(data?.episode?.link_embed, 8);
      const currentUserId = session?.user.id;

      const shouldSync =
        (whoRequested === "user" && newUserId === currentUserId) ||
        (whoRequested === "host" && hostUserId !== currentUserId);

      if (shouldSync) {
        dispatch(setCurrentEpisode(episode));
        router.replace(`/xem-chung/phong/${roomId}?id=${id}`);

        // Hiển thị thông báo nếu là người xem (không phải host)
        const isSameRoom = roomData?._id === roomId;
        const isSamePage = pathname === `/xem-chung/phong/${roomId}`;
        const isNotHost = hostUserId !== currentUserId;

        if (isSameRoom && isSamePage && isNotHost) {
          toast.info("Đã đồng bộ tập phim mới từ chủ phòng.");
        }
      }
    };

    const handleUserLeft = (data: ResponseUserLeft) => {
      const { roomId, user } = data;
      if (user?.userId === session?.user.id) return;
      dispatch(setUserLeftRoom({ roomId, userId: user?.userId }));

      const isSameRoom = roomData?._id === roomId;
      const isSamePage = pathname === `/xem-chung/phong/${roomId}`;

      if (isSameRoom && isSamePage) {
        toast.info(`${user?.username} vừa rời khỏi phòng.`);
      }
    };

    socketV2.on("roomCreated", handleRoomCreated);
    socketV2.on("userJoined", handleUserJoined);
    socketV2.on("liveRoomStarted", handleLiveRoomStarted);
    socketV2.on("liveRoomEnded", handleLiveRoomEnded);
    socketV2.on("roomDeleted", handleDeleteRoom);
    socketV2.on("userKicked", handleUserKicked);
    socketV2.on("videoTimeSynced", handleVideoTimeSynced);
    socketV2.on("episodeSynced", handleEpisodeSynced);
    socketV2.on("userLeft", handleUserLeft);
    socketV2.on("joinRoomError", handleJoinRoomError);
    socketV2.on("userJoinedRoomByLink", handleUserJoinedRoomByLink);

    return () => {
      socketV2.off("roomCreated", handleRoomCreated);
      socketV2.off("userJoined", handleUserJoined);
      socketV2.off("liveRoomStarted", handleLiveRoomStarted);
      socketV2.off("liveRoomEnded", handleLiveRoomEnded);
      socketV2.off("roomDeleted", handleDeleteRoom);
      socketV2.off("userKicked", handleUserKicked);
      socketV2.off("videoTimeSynced", handleVideoTimeSynced);
      socketV2.off("episodeSynced", handleEpisodeSynced);
      socketV2.off("userLeft", handleUserLeft);
      socketV2.off("joinRoomError", handleJoinRoomError);
      socketV2.off("userJoinedRoomByLink", handleUserJoinedRoomByLink);
    };
  }, [status, session?.user.id, dispatch, currentEpisode, roomData]);
};

export default useReceiveSocketWatchTogetherV2;
