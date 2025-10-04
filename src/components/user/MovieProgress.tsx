"use client";

import { formatDuration } from "@/lib/utils";

interface MovieProgressProps {
  item: Movie;
}

const MovieProgress = ({ item }: MovieProgressProps) => {
  return (
    <div className="flex items-center gap-4 my-4 flex-col">
      <div className="h-1 bg-[#ffffff20] w-full max-w-[160px] mx-auto">
        <span
          className="h-full block bg-[#ffffff]"
          style={{
            width:
              ((item?.currentTime ?? 0) / (item?.duration || 1)) * 100 + "%",
          }}
        ></span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-200 whitespace-nowrap">
        <span>{item?.currentEpisode?.name}</span>
        <span className="w-1 h-1 bg-gray-200 block"></span>
        <span>{formatDuration(item?.currentTime || 0)} / </span>
        <span className="text-gray-400">
          {formatDuration(item?.duration || 0)}
        </span>
      </div>
    </div>
  );
};

export default MovieProgress;
