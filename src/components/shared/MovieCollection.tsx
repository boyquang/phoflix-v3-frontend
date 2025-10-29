"use client";

import { Box } from "@chakra-ui/react";
import "@/assets/css/animation.css";
import MovieSwiper from "./MovieSwiper";
import { textBackgrounds } from "@/constants/color.contant";
import SeeMoreLink from "../home/SeeMoreLink";
import AnimateWrapper from "./AnimateWrapper";

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
    <AnimateWrapper animate="fade-in-up">
      <Box className="flex gap-4 items-center mb-2">
        <h3
          style={{
            background: textBackgrounds[index % textBackgrounds.length],
          }}
          className="lg:text-2xl md:flex-grow-0 flex-grow-1 md:text-xl text-md text-gradient font-semibold mb-1"
        >
          {title}
        </h3>
        <SeeMoreLink title="Xem thêm" link={link} />
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
    </AnimateWrapper>
  );
};

export default MovieCollection;
