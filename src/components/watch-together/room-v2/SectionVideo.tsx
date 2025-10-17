"use client";

import PlayerWrapper from "@/components/player/PlayerWrapper";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

const ArtPlayer = dynamic(() => import("@/components/player/ArtPlayer"), {
  ssr: false,
});

interface SectionVideoProps {
  movie: Movie;
  status: "active" | "pending" | "ended";
}

const SectionVideo = ({ movie, status }: SectionVideoProps) => {
  const { currentEpisode } = useSelector((state: RootState) => state.episode);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [source, setSource] = useState<string | null>(null);
  useEffect(() => {
    setSource(currentEpisode?.link_m3u8 || null);
  }, [currentEpisode]);

  return (
    <PlayerWrapper options={{ loading: !videoLoaded }}>
      <ArtPlayer
        options={{
          currentTime: 0,
        }}
        source={source}
        poster={movie?.thumb_url as string}
        events={{
          "video:loadedmetadata": (art) => {
            setVideoLoaded(true);
          },
          "video:canplaythrough": (art) => {
            if (status === "active") {
              art.play().catch(() => {
                console.log("Autoplay was prevented");
              });
            }
          },
        }}
      />
    </PlayerWrapper>
  );
};

export default SectionVideo;
