"use client";

import dynamic from "next/dynamic";

const ArtPlayer = dynamic(() => import("../../components/player/ArtPlayer"), {
  ssr: false,
});

const Test = () => {
  return (
    <ArtPlayer
      source="https://s4.phim1280.tv/20250325/maF3oaplG/index.m3u8"
      poster="https://phimimg.com/upload/vod/20250325-1/6db202d6161c123d96b0180c2da9b1e5.jpg"
    />
  );
};

export default Test;
