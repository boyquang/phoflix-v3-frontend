"use client";

import OverlayFade from "@/components/shared/OverlayFade";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface BackgroundMovieProps {
  url: string;
}

const BackgroundMovie = ({ url }: BackgroundMovieProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => setLoaded(true);
  }, [url]);

  return (
    <Box className="h-0 relative lg:pt-[32%] md:pt-[46%] sm:pt-[50%] pt-[60%] before:absolute before:inset-0 before:bg-[url('/images/dotted.png')] before:bg-repeat before:opacity-20 before:z-[1]">
      <Box
        style={{
          backgroundImage: `url(${loaded ? url : "/images/placeholder.jpg"})`,
        }}
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-50"
      />

      <OverlayFade />
    </Box>
  );
};

export default BackgroundMovie;
