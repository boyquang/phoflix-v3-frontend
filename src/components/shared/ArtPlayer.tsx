"use client";

import { useEffect, useRef } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";

interface ArtPlayerProps {
  url: string;
  poster?: string;
}

export default function ArtPlayer({ url, poster }: ArtPlayerProps) {
  const artRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!artRef.current) return;

    const art = new Artplayer({
      container: artRef.current,
      url,
      poster,
      autoplay: false,
      theme: "#ffd875",
      fullscreen: true,
      pip: true,
      setting: true,
      playbackRate: true,
      aspectRatio: true,
      subtitleOffset: true,
      miniProgressBar: true,
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
    });

    return () => {
      art.destroy(false); // cleanup khi unmount
    };
  }, [url, poster]);

  return <div ref={artRef} className="absolute w-full h-full inset-0" />;
}
