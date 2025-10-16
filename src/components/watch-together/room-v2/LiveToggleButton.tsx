"use client";

import useWatchTogetherV2 from "@/hooks/useWatchTogetherV2";
import { RootState } from "@/store/store";
import { Button } from "@chakra-ui/react";
import { FaPlay, FaVideoSlash } from "react-icons/fa6";
import { useSelector } from "react-redux";

interface LiveToggleButtonProps {
  roomId: string;
}

const LiveToggleButton = ({ roomId }: LiveToggleButtonProps) => {
  const { handleStartLive, handleEndLive } = useWatchTogetherV2();
  const { loading, roomData } = useSelector(
    (state: RootState) => state.watchTogetherV2
  );

  const toggleMapping = {
    pending: {
      icon: <FaPlay />,
      label: "Bắt đầu",
      action: handleStartLive,
    },
    active: {
      icon: <FaVideoSlash className="text-[#dc3545]" />,
      label: "Kết thúc",
      action: handleEndLive,
    },
  };

  const status = roomData?.status as "pending" | "active";

  return (
    <Button
      onClick={() => toggleMapping[status]?.action(roomId)}
      size="xs"
      disabled={loading.startLive || loading.endLive}
      className="bg-white rounded-full text-black hover:opacity-75"
    >
      {toggleMapping[status]?.icon}
      {toggleMapping[status]?.label}
    </Button>
  );
};

export default LiveToggleButton;
