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
}

const SectionVideo = ({ movie }: SectionVideoProps) => {
  const { currentEpisode } = useSelector(
    (state: RootState) => state.watchTogetherV2
  );
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    setSource(currentEpisode?.link_m3u8 || null);
  }, [currentEpisode]);

  return (
    <PlayerWrapper options={{ loading: !videoLoaded }}>
      <ArtPlayer
        source={source}
        poster={movie?.thumb_url as string}
        events={{
          "video:loadedmetadata": (art) => {
            setVideoLoaded(true);
          },
        }}
      />
    </PlayerWrapper>
  );
};

export default SectionVideo;
