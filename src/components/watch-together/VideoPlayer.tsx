import useDisposeVideoJs from "@/hooks/useDisposeVideoJs";
import useSendSocketWatchingTogether from "@/hooks/useSendSocketWatchingTogether";
import useSocketMediaAsync from "@/hooks/useSocketMediaAsync";
import { RootState } from "@/store/store";
import { debounce } from "lodash";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import videojs from "video.js";

// Import necessary Video.js plugins and styles
import "videojs-http-source-selector";
import "video.js/dist/video-js.css";
import "videojs-http-source-selector/dist/videojs-http-source-selector.css";
import "@/assets/css/videojs.css";
import { toast } from "sonner";

interface VideoJSProps {
  options: any;
  onReady?: (player: any) => void;
}

export const VideoPlayer = ({ options, onReady }: VideoJSProps) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any | null>(null);
  const { roomOwnerId, roomId } = useSelector(
    (state: RootState) => state.watchingTogether
  );
  const {
    sendSocketVideoTimeUpdate,
    sendSocketVideoPlay,
    sendSocketVideoPause,
  } = useSendSocketWatchingTogether();

  // Làm chậm việc gửi sự kiện đến server để tránh quá tải
  const debounceSeeked = debounce(sendSocketVideoTimeUpdate, 500);
  const debouncePlay = debounce(sendSocketVideoPlay, 500);
  const debouncePause = debounce(sendSocketVideoPause, 500);

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");

      if (videoRef.current) {
        videoRef.current.appendChild(videoElement);
      }

      const player = (playerRef.current = videojs(videoElement, options, () => {
        if (onReady) onReady(player);

        (player as any).httpSourceSelector?.({
          default: "auto",
        });
      }));

      player.on("error", (event: any) => {
        toast.error("Tập phim hiện tại đang lỗi vui lòng chọn tập khác");
        return;
      });

      // Set initial sources or other options
      player.src(options.sources);

      player.on("seeked", () => debounceSeeked(player));
      player.on("play", () => debouncePlay());
      player.on("pause", () => debouncePause());
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options]);

  // custom hook để hủy videojs khi component bị unmount
  useDisposeVideoJs({
    playerRef,
  });

  // Chạy khi tua, phát hoặc tạm dừng video
  useSocketMediaAsync({
    roomId,
    roomOwnerId,
    playerRef,
  });

  return (
    <div
      data-vjs-player
      className="xs:rounded-t-2xl border-1 border-transparent rounded-t-none overflow-hidden"
    >
      <div ref={videoRef} />
    </div>
  );
};

export default VideoPlayer;
