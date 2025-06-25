"use client";

import Image from "@/components/shared/Image";
import { TagClassic } from "@/components/shared/TagClassic";
import { RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const MovieInfo = () => {
  const { movieData } = useSelector(
    (state: RootState) => state.watchingTogether
  );

  return (
    <Box className="flex gap-4">
      <Box className="lg:w-32 w-24 flex-shrink-0">
        <Box className="relative pb-[150%] h-0">
          <Image
            src={movieData?.moviePoster as string}
            alt={movieData?.movieName as string}
            className="rounded-lg"
          />
        </Box>
      </Box>
      <Box className="flex flex-col gap-2 overflow-hidden">
        <h4 className="lg:text-xl md:text-lg text-sm text-gray-100">
          {movieData?.movieName || "Không xác định"}
        </h4>
        <p className="text-[#aaaaaa] text-sm truncate">
          {movieData?.movieOriginName || "Không xác định"}
        </p>
        <Box className="flex flex-wrap gap-2 items-center">
          <span className="bg-transparent border border-[#ffd875] h-6 justify-center p-1 rounded-md inline-flex items-center">
            <span className="text-[#ffd875] text-xs">TMDb</span>
            <span className="text-gray-50 text-sm ml-1">
              {Number(movieData?.voteAverage).toFixed(1) || 0}
            </span>
          </span>
          <TagClassic text={movieData?.movieQuality || "Không xác định"} />
          <TagClassic text={movieData?.movieYear || "Không xác định"} />
          <TagClassic text={movieData?.movieLang || "Không xác định"} />
          <TagClassic text={movieData?.movieTime || "Không xác định"} />
          <TagClassic
            text={movieData?.movieEpisodeCurrent || "Không xác định"}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MovieInfo;
