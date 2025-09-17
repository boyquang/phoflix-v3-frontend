"use client";

import EmptyData from "@/components/shared/EmptyData";
import { RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { IoLogoYoutube } from "react-icons/io";
import { useSelector } from "react-redux";

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
        <iframe
          className="w-full h-full absolute inset-0 rounded-2xl"
          frameBorder="0"
          allowFullScreen
          allow="accelerometer"
          referrerPolicy="strict-origin-when-cross-origin"
          src={movie?.trailer_url?.replace("/watch?v=", "/embed/")}
        ></iframe>
      </Box>
    </Box>
  );
};

export default TabTrailer;
