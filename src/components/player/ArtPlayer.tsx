"use client";

import { useEffect, useRef, useState } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";
import Image from "../shared/Image";
import { deniedGif } from "@/constants/image.contant";
import { toast } from "sonner";
import { socketV2 } from "@/configs/socket.config";
import { Session } from "next-auth";

interface ArtPlayerProps<T = any> {
  source: string | null; // URL nguồn video
  poster?: string;
  events?: { [event in ArtPlayerEvent]?: (art: Artplayer) => void }; // Sự kiện tùy chọn
  options?: {
    currentTime?: number; // Thời gian hiện tại để bắt đầu phát
    session?: Session | null; // Thông tin phiên đăng nhập người dùng
    roomId?: string;
    callbackSocket?: (data: T) => void;
  };
}

const optionsDefault = {
  autoplay: false,
  theme: "#ffd875",
  fullscreen: true,
  pip: true,
  setting: true,
  playbackRate: true,
  aspectRatio: true,
  subtitleOffset: true,
  miniProgressBar: true,
  lang: "vi",
};

export default function ArtPlayer({
  source,
  poster,
  events,
  options,
}: ArtPlayerProps) {
  const artRef = useRef<HTMLDivElement>(null);
  const artInstance = useRef<Artplayer | null>(null);
  const [error, setError] = useState(false);

  const handleHlsVideo = (video: HTMLVideoElement) => {
    if (!source) return;

    const hls = new Hls();
    hls.loadSource(source);
    hls.attachMedia(video);

    // Xử lý lỗi phát video HLS
    hls.on(Hls.Events.ERROR, function (event, data) {
      if (data.fatal) {
        hls.destroy(); // hủy instance Hls khi có lỗi nghiêm trọng

        if (artInstance.current) {
          artInstance.current.destroy(false);
          artInstance.current = null;
        }

        setError(true);
      }
    });
  };

  useEffect(() => {
    if (!artRef.current || error || !source) return;

    const art = new Artplayer({
      ...optionsDefault,
      container: artRef.current,
      url: source,
      poster,
      customType: {
        m3u8: function (video, source) {
          if (Hls.isSupported()) {
            handleHlsVideo(video);
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = source;
          } else {
            toast.error("Trình duyệt không hỗ trợ phát video này!");
            setError(true);
          }
        },
      },
      controls: [
        {
          index: 21,
          position: "left",
          html: "10s",
          tooltip: "10s trước",
          click: function () {
            this.currentTime = this.currentTime - 10;
          },
        },
        {
          index: 22,
          position: "left",
          html: "10s",
          tooltip: "10s sau",
          click: function () {
            this.currentTime = this.currentTime + 10;
          },
        },
      ],
    });

    // lưu instance Artplayer vào ref để sử dụng sau này
    artInstance.current = art;

    return () => {
      art.destroy(false);
      artInstance.current?.destroy(false);
      artInstance.current = null;
    };
  }, [source, poster, options?.currentTime]);

  useEffect(() => {
    if (!artInstance.current) return;

    const art = artInstance.current;

    art.on("ready", () => {
      // Thiết lập thời gian hiện tại nếu được cung cấp trong options
      if (options?.currentTime) {
        art.currentTime = options.currentTime;
      }
    });

    art.on("error", () => {
      art.destroy(false);
      artInstance.current?.destroy(false);
      artInstance.current = null;
      setError(true);
    });
  }, [options?.currentTime, artInstance.current]);

  // Đăng ký các event tùy chỉnh và hủy đăng ký khi component unmount hoặc events thay đổi
  useEffect(() => {
    if (!artInstance.current) return;

    const art = artInstance.current;
    const eventHandlers = new Map<string, (...args: any[]) => void>();

    if (events) {
      Object.entries(events).forEach(([event, handler]) => {
        const wrappedHandler = () => handler(art);
        art.on(event, wrappedHandler);
        eventHandlers.set(event, wrappedHandler);
      });
    }

    return () => {
      eventHandlers.forEach((handler, event) => {
        art.off(event, handler);
      });
    };
  }, [artInstance.current, events]);

  useEffect(() => {
    const handleVideoTimeSyncRequested = (data: ResponseVideoTimeRequested) => {
      const { roomId: roomIdRes, userRequestedId, hostUserId } = data;

      if (options?.session?.user.id !== hostUserId) return;
      if (options?.roomId !== roomIdRes) return;

      const currentTime = artInstance.current?.currentTime || 0;
      options?.callbackSocket?.({
        roomId: roomIdRes,
        userRequestedId,
        hostUserId,
        currentTime,
      });
    };

    socketV2.on("videoTimeSyncRequested", handleVideoTimeSyncRequested);

    return () => {
      socketV2.off("videoTimeSyncRequested");
    };
  }, [
    artInstance.current,
    options?.session,
    options?.roomId,
    options?.callbackSocket,
  ]);

  if (error) {
    return (
      <div className="fade-in absolute w-full h-full inset-0 flex items-center justify-center bg-[#08080a]">
        <div className="absolute inset-0 bg-[source('/images/denied-bg.webp')] bg-center bg-cover opacity-20"></div>
        <div className="flex gap-6 items-center">
          <div className="relative rounded-[15%] overflow-hidden lg:h-[220px] h-[100px] w-[100px] lg:w-[220px]">
            <Image src={deniedGif} alt="Lỗi khi phát video" />
          </div>
          <div className="lg:text-lg text-sm text-white font-semibold">
            <span className="uppercase">Phim bị lỗi :((</span>
            <br />
            Vui lòng thử lại sau!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      key={error ? "error" : "normal"} // xóa bỏ player khi error = true
      ref={artRef}
      className={`absolute w-full h-full inset-0 z-[102] cinema-player`}
    />
  );
}
