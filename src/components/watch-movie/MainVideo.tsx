"use client";

import { RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const MainVideo = () => {
  const { currentEpisode } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );

  return (
    <Box className="relative border border-[#ffffff10] h-0 lg:pt-[42%] md:pt-[46%] pt-[56%] ">
      {currentEpisode?.link_embed ? (
        <iframe
          src={currentEpisode?.link_embed}
          title={currentEpisode?.name}
          frameBorder="0"
          allowFullScreen
          className="absolute w-full h-full inset-0"
        ></iframe>
      ) : (
        <Box className="absolute w-full h-full inset-0 flex items-center justify-center bg-[#08080a]">
          <h1 className="text-white text-2xl">Video không có sẵn {":(("}</h1>
        </Box>
      )}
    </Box>
  );
};

export default MainVideo;
