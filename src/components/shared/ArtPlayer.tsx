"use client";

import { useEffect, useRef, useState } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";

interface ArtPlayerProps {
  url: string;
  poster?: string;
  events?: { [event in ArtPlayerEvent]?: (art: Artplayer) => void }; // Sự kiện tùy chọn
  options?: {
    currentTime?: number; // Thời gian hiện tại để bắt đầu phát
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
  url,
  poster,
  events,
  options,
}: ArtPlayerProps) {
  const artRef = useRef<HTMLDivElement>(null);
  const artInstance = useRef<Artplayer | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!artRef.current || error) return;

    const art = new Artplayer({
      ...optionsDefault,
      container: artRef.current,
      url,
      poster,
      customType: {
        // custom type for m3u8
        m3u8: function (video, url) {
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
          } else {
            video.src = url;
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

    artInstance.current = art;

    art.on("error", () => setError(true));

    // dọn dẹp khi component unmount
    return () => {
      art.destroy(false);
      artInstance.current = null;
    };
  }, [url, poster, options?.currentTime]);

  useEffect(() => {
    if (!artInstance.current) return;

    const art = artInstance.current;

    art.on("ready", () => {
      // Thiết lập thời gian hiện tại nếu được cung cấp trong options
      if (options?.currentTime) {
        art.currentTime = options.currentTime;
      }
    });
  }, [options?.currentTime, artInstance.current]);

  useEffect(() => {
    // Đăng ký các event custom
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
      // Hủy đăng ký các event custom
      eventHandlers.forEach((handler, event) => {
        art.off(event, handler);
      });
    };
  }, [artInstance.current, events]);

  if (error) {
    return (
      <iframe
        src={
          url.includes("youtube.com")
            ? url.replace("/watch?v=", "/embed/")
            : url
        }
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        frameBorder="0"
        allowFullScreen
        className="absolute w-full h-full inset-0"
      ></iframe>
    );
  }

  return <div ref={artRef} className="absolute w-full h-full inset-0" />;
}

