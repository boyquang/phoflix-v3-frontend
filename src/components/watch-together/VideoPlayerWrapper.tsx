"use client";

import { RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";

const VideoPlayer = dynamic(
  () => import("@/components/watch-together/VideoPlayer"),
  {
    ssr: false,
  }
);

const VideoPlayerWrapper = () => {
  const { data: session } = useSession();
  const { roomOwnerId, currentEpisode } = useSelector(
    (state: RootState) => state.watchingTogether
  );

  // Cấu hình các nút mặc định cho chủ phòng và người xem
  const controlsDefaults = [
    "playToggle",
    "volumePanel",
    "progressControl",
    "currentTimeDisplay",
    "timeDivider",
    "durationDisplay",
    "playbackRateMenuButton",
    "pictureInPictureToggle",
    "httpSourceSelector",
    "fullscreenToggle",
  ];

  const viewerControls = [
    "volumePanel",
    "currentTimeDisplay",
    "timeDivider",
    "durationDisplay",
    "playbackRateMenuButton",
    "httpSourceSelector",
    "fullscreenToggle",
  ];

  // Cấu hình VideoJS player
  const videoJsOptions = {
    controls: true,
    responsive: true,
    playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
    fluid: false,
    aspectRatio: "16:9",
    controlBar: {
      children:
        session?.user?.id === roomOwnerId ? controlsDefaults : viewerControls,
    },
    sources: [
      {
        src: currentEpisode?.link_m3u8,
        type: "application/x-mpegURL",
      },
    ],
  };

  return <VideoPlayer options={videoJsOptions} />;
};

export default VideoPlayerWrapper;
