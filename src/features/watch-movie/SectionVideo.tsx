"use client";

import { RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const SectionVideo = () => {
  const { currentEpisode } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );

  return (
    <Box className="xs:rounded-t-2xl border border-[#ffffff10] rounded-t-none overflow-hidden">
      <Box className="relative h-0 pt-[56.25%]">
        {currentEpisode?.link_embed ? (
          <iframe
            src={currentEpisode?.link_embed}
            title={currentEpisode?.name}
            frameBorder="0"
            allowFullScreen
            className="absolute w-full h-full inset-0 xs:rounded-t-2xl rounded-t-none"
          ></iframe>
        ) : (
          <Box className="absolute w-full h-full inset-0 flex items-center justify-center bg-[#08080a]">
            <h1 className="text-white md:text-2xl text-sm p-4 text-center">
              Video không khả dụng hoặc bị lỗi, vui lòng thử lại sau!
            </h1>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SectionVideo;
