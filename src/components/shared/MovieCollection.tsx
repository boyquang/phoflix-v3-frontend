"use client";

import MovieTitle from "./MovieTitle";
import { Box } from "@chakra-ui/react";

import "@/assets/css/animation.css";
import MovieSwiper from "./MovieSwiper";

interface MovieCollectionProps {
  title: string;
  index: number;
  link: string;
  data: {
    loading: boolean;
    error: boolean;
    items: any[];
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
      <MovieTitle
        index={index}
        loading={data?.loading}
        href={link}
        title={title}
        error={data?.error}
      />
      <Box>
        <MovieSwiper
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
