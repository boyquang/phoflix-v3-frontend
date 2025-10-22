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
    const movieName = roomData?.movie?.name || "";

    if (currentEpisode) {
      const arrSplitFilename = currentEpisode?.filename?.split("-") || [];
      const arrSplitFilenameLength = arrSplitFilename?.length || 0;
      const movieLanguage =
        arrSplitFilename[arrSplitFilenameLength - 2] || "Ngôn ngữ: Unknown";
      const episodeName =
        arrSplitFilename[arrSplitFilenameLength - 1] || "Tập: Unknown";

      if (arrSplitFilenameLength >= 3) {
        setDescription(`${movieName} - ${movieLanguage} - ${episodeName}`);
      } else {
        setDescription(movieName);
      }
    } else {
      setDescription(movieName);
    }
  }, [roomData, currentEpisode]);

  return <p className="text-xs text-gray-400 line-clamp-1">{description}</p>;
};

export default RoomDescription;
