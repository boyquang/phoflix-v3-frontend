"use client";

import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface RoomDescriptionProps {
  roomData: Room;
}

const RoomDescription = ({ roomData }: RoomDescriptionProps) => {
  const [description, setDescription] = useState<string>("");
  const { currentEpisode } = useSelector((state: RootState) => state.episode);

  useEffect(() => {
    if (currentEpisode) {
      const arrSplitFilename = currentEpisode?.filename?.split("-") || [];
      if (arrSplitFilename?.length >= 6) {
        setDescription(
          `${arrSplitFilename[0]} - ${arrSplitFilename[4]} - ${arrSplitFilename[5]}`
        );
      } else {
        setDescription(roomData?.movie?.name || "");
      }
    } else {
      setDescription(roomData?.movie?.name || "");
    }
  }, [roomData, currentEpisode]);

  return <p className="text-xs text-gray-400 line-clamp-1">{description}</p>;
};

export default RoomDescription;
