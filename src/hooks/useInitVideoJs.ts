"use client";


import { useEffect } from "react";
import videojs from "video.js";

interface UseInitVideoJsProps {
  playerRef: React.RefObject<any>;
  videoRef: React.RefObject<HTMLDivElement | null>;
  options: any;
  onError?: (error: any) => void;
  onReady?: (player: any) => void;
}

const useInitVideoJs = ({
  playerRef,
  videoRef,
  options,
  onError,
  onReady,
}: UseInitVideoJsProps) => {
  useEffect(() => {
    // Đảm bảo trình phát Video.js chỉ được khởi tạo một lần
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");

      if (videoRef.current) {
        videoRef.current.appendChild(videoElement);
      }

      const player = (playerRef.current = videojs(videoElement, options, () => {
        if (onReady) onReady(player);
      }));

      player.on("error", (event: any) => {
        console.error("Error playing video:", event);
        if (onError) onError(event);
        return;
      });

      // Set initial sources or other options
      player.src(options.sources);
    }
  }, [options]);
};

export default useInitVideoJs;
