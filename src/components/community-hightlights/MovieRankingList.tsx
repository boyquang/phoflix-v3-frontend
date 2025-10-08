"use client";

import { Box } from "@chakra-ui/react";
import { FaFireAlt } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import Image from "../shared/Image";
import Link from "next/link";
import NotDataAvailable from "./NotDataAvailable";

type TType = "mostPopular" | "mostFavorite";

interface MovieRatingListProps {
  type: TType;
  items: TMovieRanking[];
}

const MovieRatingList = ({ type, items }: MovieRatingListProps) => {
  return (
    <Box className="border-r 2xl:last:border-[#fff2] last:border-transparent border-[#fff2] min-w-80 3xl:w-[540px] 2xl:w-[460px] w-[400px] xl:p-6 p-4 xl:flex-none flex-1">
      <Box className="flex items-center gap-2 mb-4">
        <Box className="text-primary">
          {type === "mostPopular" ? <FaFireAlt /> : <MdFavorite />}
        </Box>
        <h4 className="xl:text-base text-sm uppercase text-white font-semibold">
          {type === "mostPopular" ? "Sôi nổi nhất" : "Yêu thích nhất"}
        </h4>
      </Box>

      {!items || items?.length === 0 ? (
        <NotDataAvailable />
      ) : (
        <Box className="flex flex-col gap-1">
          {items?.map((item, index) => (
            <Box key={index} className="flex items-center h-14 gap-2">
              <Box className="whitespace-nowrap flex-shrink-0 lg:w-6 w-4 lg:text-xl text-sm font-bold opacity-30 text-[#aaa]">
                {index + 1}.
              </Box>
              <Box className="w-[25px] flex-shrink-0">
                <Box className="relative pb-[150%]">
                  <Image
                    src={item.thumb}
                    alt={item.name}
                    className="rounded-sm"
                  />
                </Box>
              </Box>
              <Link
                href={`/thong-tin-phim/${item.slug}`}
                className="overflow-hidden inline-block ml-2"
              >
                <h4 className="truncate lg:text-sm text-xs text-white hover:text-[#ffd875]">
                  {item.name}
                </h4>
              </Link>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MovieRatingList;
