"use client";

import useSendSocketWatchTogetherV2 from "@/hooks/useSendSocketWatchTogetherV2";
import { RootState } from "@/store/store";
import { Session } from "next-auth";
import { useState } from "react";
import { FaSync } from "react-icons/fa";
import { useSelector } from "react-redux";

interface SyncRoomDataButtonProps {
  session: Session | null;
  roomId: string;
}

const SyncRoomDataButton = ({ session, roomId }: SyncRoomDataButtonProps) => {
  const { sendSocketRequireSyncVideoTime } = useSendSocketWatchTogetherV2();
  const { roomData } = useSelector((state: RootState) => state.watchTogetherV2);
  const [isRotating, setIsRotating] = useState(false);

  const handleSyncClick = () => {
    if (!session?.user.id || !roomData?.host?.userId) return;
    setIsRotating(true);
    sendSocketRequireSyncVideoTime(
      roomId,
      session.user.id,
      roomData.host.userId
    );
    setTimeout(() => setIsRotating(false), 1000);
  };

  return (
    <div
      onClick={handleSyncClick}
      className={`hover:opacity-75 text-xs text-white h-7 px-2 rounded-md border border-white flex items-center gap-1
            ${
              isRotating
                ? "cursor-not-allowed pointer-events-none opacity-75"
                : "cursor-pointer pointer-events-auto opacity-100"
            }
        `}
    >
      <FaSync className={`${isRotating ? "animate-spin" : ""}`} />
      Đồng bộ
    </div>
  );
};

export default SyncRoomDataButton;
