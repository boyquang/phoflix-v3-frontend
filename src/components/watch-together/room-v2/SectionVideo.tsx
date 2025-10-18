"use client";

import PlayerWrapper from "@/components/player/PlayerWrapper";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { debounce } from "lodash";
import useSendSocketWatchTogetherV2 from "@/hooks/useSendSocketWatchTogetherV2";

const ArtPlayer = dynamic(() => import("@/components/player/ArtPlayer"), {
  ssr: false,
});

interface SectionVideoProps {
  movie: Movie;
  status: "active" | "pending" | "ended";
  session: Session | null;
}

const SectionVideo = ({ movie, status, session }: SectionVideoProps) => {
  const { currentEpisode } = useSelector((state: RootState) => state.episode);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [source, setSource] = useState<string | null>(null);
  const { roomData, videoPlayer } = useSelector(
    (state: RootState) => state.watchTogetherV2
  );
  const { sendSocketSyncVideoTime } = useSendSocketWatchTogetherV2();

  useEffect(() => {
    setSource(currentEpisode?.link_m3u8 || null);
  }, [currentEpisode]);

  const handleSeek = (time: number) => {
    if (!session?.user.id || !roomData?._id) return;
    if (session.user.id !== roomData?.host.userId) return;
    sendSocketSyncVideoTime(roomData._id, time, session.user.id);
  };

  const debouncedHandleSeek = debounce(handleSeek, 300);

  return (
    <PlayerWrapper options={{ loading: !videoLoaded }}>
      <ArtPlayer
        options={{
          currentTime: videoPlayer.currentTime || 0,
        }}
        source={source}
        poster={movie?.thumb_url as string}
        events={{
          "video:seeked": (art) => {
            debouncedHandleSeek(art.currentTime);
          },
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
