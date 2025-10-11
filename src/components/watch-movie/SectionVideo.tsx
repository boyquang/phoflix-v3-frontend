"use client";

import { RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import useVideoArtEvent from "@/hooks/useVideoArtEvent";
import PlayerWrapper from "../player/PlayerWrapper";
import IframePlayer from "../player/IframePlayer";

const ArtPlayer = dynamic(() => import("../player/ArtPlayer"), { ssr: false });

const SectionVideo = () => {
  const { currentEpisode, isValidEpisodes, movie } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );
  const { currentTime } = useSelector(
    (state: RootState) => state.user.movieViewingStatus
  );
  const [source, setSource] = useState<string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const videoEvents = useVideoArtEvent();

  useEffect(() => {
    setSource(currentEpisode?.link_m3u8 || movie?.trailer_url || null);
  }, [isValidEpisodes, currentEpisode, movie]);

  return (
    <Box className="md:rounded-t-xl rounded-t-none overflow-hidden shadow-2xl">
      <PlayerWrapper options={{ loading: !videoLoaded }}>
        {source?.includes("youtube.com") ? (
          <IframePlayer
            source={source.replace("/watch?v=", "/embed/")}
            onLoaded={() => setVideoLoaded(true)}
          />
        ) : (
          <ArtPlayer
            source={source}
            poster={movie?.thumb_url as string}
            options={{
              currentTime: currentTime || 0,
            }}
            events={{
              pause: (art) => videoEvents.onPause(art),
              "video:loadedmetadata": (art) =>
                videoEvents.onLoadedData(art, () => setVideoLoaded(true)),
              "video:seeking": (art) => videoEvents.onSeeking(art),
              "video:ended": (art) => videoEvents.onEnded(art),
              "video:seeked": (art) => videoEvents.onSeeked(art),
              "video:timeupdate": (art) => videoEvents.onTimeUpdate(art),
              "video:canplaythrough": (art) =>
                videoEvents.onCanplayThrough(art),
            }}
          />
        )}
      </PlayerWrapper>
    </Box>
  );
};

export default SectionVideo;
