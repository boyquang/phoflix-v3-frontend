"use client";

import { Box } from "@chakra-ui/react";

import "@/assets/css/animation.css";
import MovieSwiper from "./MovieSwiper";
import {
  colorGradientsToWhite,
  textBackgrounds,
} from "@/constants/color.contant";
import Link from "next/link";
import { RiArrowRightWideLine } from "react-icons/ri";
import Loading from "@/app/loading";

interface MovieCollectionProps {
  title: string;
  index: number;
  link: string;
  data: {
    loading: boolean;
    error: boolean;
    items: Movie[];
  };
  orientation: "horizontal" | "vertical";
}

const MovieCollection = ({
  title,
  link,
  data,
  index,
  orientation,
}: MovieCollectionProps) => {
  return (
    <Box className="effect-fade-in">
      <Box className="flex justify-between gap-2 items-center mb-2">
        <h3
          style={{
            background: textBackgrounds[index % textBackgrounds.length],
          }}
          className="lg:text-2xl md:text-xl text-md text-gradient font-semibold lg:mb-0 mb-2"
        >
          {title}
        </h3>
        <Link
          href={link}
          className="px-2 py-1 rounded-full border border-[#fff5] flex text-gray-50 text-sm gap-0.5 hover:text-primary items-center transition-all"
        >
          Xem thêm
          <RiArrowRightWideLine />
        </Link>
      </Box>
      <Box>
        <MovieSwiper
          showNavigation={false}
          items={data?.items}
          loading={data?.loading}
          error={data?.error}
          orientation={orientation}
        />
      </Box>
    </Box>
  );
};

export default MovieCollection;
