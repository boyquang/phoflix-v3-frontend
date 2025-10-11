"use client";

import EmptyData from "@/components/shared/EmptyData";
import { RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { IoLogoYoutube } from "react-icons/io";
import { useSelector } from "react-redux";
import IframePlayer from "../player/IframePlayer";

const TabTrailer = () => {
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);

  if (!movie?.trailer_url)
    return (
      <Box className="flex justify-center items-center mt-6 bg-[#0003] rounded-2xl">
        <EmptyData
          icon={<IoLogoYoutube />}
          title="Không có trailer"
          description="Rất tiếc, phim này không có trailer."
        />
      </Box>
    );

  return (
    <Box className="flex flex-col gap-4">
      <h4 className="lg:text-2xl text-lg text-gray-50">Trailer</h4>
      <Box className="w-full h-0 relative lg:pt-[35%] md:pt-[50%] pt-[70%]">
        <IframePlayer
          source={movie?.trailer_url?.replace("/watch?v=", "/embed/") || ""}
          className="rounded-2xl"
        />
      </Box>
    </Box>
  );
};

export default TabTrailer;
