"use client";

import { NEXT_PUBLIC_API_THEMOVIEDB_IMAGE_URL } from "@/constants/env.contant";
import Image from "../shared/Image";
import { useEffect, useState } from "react";
import { BsPlayCircle } from "react-icons/bs";

interface ThumbnailItemProps {
  episode: Partial<SeasonEpisode & EpisodeMerged> | null;
  defaultThumbnail?: string | null;
  active: boolean;
  onClick?(): void;
}

const ThumbnailItem = ({
  episode,
  defaultThumbnail,
  active,
  onClick,
}: ThumbnailItemProps) => {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    const path = episode?.still_path || null;

    if (path) {
      setSrc(`${NEXT_PUBLIC_API_THEMOVIEDB_IMAGE_URL}${path}`);
    } else if (defaultThumbnail) {
      setSrc(defaultThumbnail);
    } else {
      setSrc("");
    }
  }, [episode, defaultThumbnail]);

  return (
    <div
      className="relative group cursor-pointer"
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      <div className={active ? "ring-2 ring-primary rounded-md" : ""}>
        <div className="pb-[56.25%] h-0 relative mb-2 rounded-md overflow-hidden">
          <Image
            src={src}
            alt={episode?.name || "thumbnail episode"}
            className="rounded-md group-hover:opacity-75"
          />
          <BsPlayCircle className="text-4xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white group-hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          {active && (
            <div className="absolute left-0 bottom-0 bg-primary text-black text-xs px-2.5 py-1 rounded-tr-md rounded-bl flex items-center">
              Đang chiếu
            </div>
          )}
        </div>
      </div>
      <div className="text-sm text-white truncate group-hover:text-primary">
        {episode?.episode_number
          ? `Tập ${episode.episode_number}`
          : episode?.name}
      </div>
    </div>
  );
};

export default ThumbnailItem;
