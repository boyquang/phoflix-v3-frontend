"use client";

import { joinRoomWatchingTogether } from "@/lib/actions/watchingTogether";
import { handleShowToaster } from "@/lib/utils";
import { delay } from "lodash";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import useSendSocketWatchingTogether from "./useSendSocketWatchingTogether";
interface UseJoinRoomProps {
  roomId: string;
}

const useJoinRoom = ({ roomId }: UseJoinRoomProps) => {
  const { data: session, status } = useSession();
  const { sendSocketJoinRoom } = useSendSocketWatchingTogether();

  const handleJoinRoomWatchingTogether = async () => {
    const response = await joinRoomWatchingTogether({
      user: {
        id: session?.user?.id,
        name: session?.user?.name,
        avatar: session?.user?.image,
        role: session?.user?.role,
      },
      roomId,
      accessToken: session?.user?.accessToken as string,
    });

    if (response?.status) {
      sendSocketJoinRoom(response?.result?.roomOwnerId);
    } else {
      handleShowToaster("Thông báo", response?.message, "error");

      delay(() => {
        window.location.href = "/";
      }, 1000);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && roomId) {
      handleJoinRoomWatchingTogether();
    }
  }, [status, roomId]);
};

export default useJoinRoom;
