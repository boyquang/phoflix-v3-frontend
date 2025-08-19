"use client";

import { Box } from "@chakra-ui/react";
import MovieCollection from "./MovieCollection";

interface MovieSectionProps {
  finalData: {
    title: string;
    link: string;
    data: {
      loading: boolean;
      error: boolean;
      items: Movie[];
    };
    orientation: "horizontal" | "vertical";
  }[];
}

const MovieSection = ({ finalData }: MovieSectionProps) => {
  return (
    <Box className="flex flex-col gap-12 2xl:p-0 p-4">
      {finalData?.map(({ title, link, data, orientation }, index: number) => (
        <Box key={index}>
          <MovieCollection
            index={index}
            title={title}
            link={link}
            data={data}
            orientation={orientation}
          />
        </Box>
      ))}
    </Box>
  );
};

export default MovieSection;
