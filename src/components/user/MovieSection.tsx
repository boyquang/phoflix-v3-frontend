"use client";

import { Box } from "@chakra-ui/react";
import MovieGrid from "./MovieGrid";
import PaginationCustom from "@/components/shared/PaginationCustom";
import { useSession } from "next-auth/react";

interface MovieSectionProps {
  movies: Movie[];
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  limit: number;
  type: "favorite" | "history" | "playlist";
}

const MovieSection = ({
  movies,
  totalItems,
  totalItemsPerPage,
  currentPage,
  limit,
  type,
}: MovieSectionProps) => {
  return (
    <Box className="mt-6">
      <MovieGrid
        columns={{
          base: 2,
          md: 4,
          lg: 4,
          xl: 5,
          "2xl": 6,
        }}
        items={movies}
        type={type}
      />

      {totalItems >= limit && (
        <PaginationCustom
          totalItems={totalItems}
          itemsPerPage={totalItemsPerPage}
          currentPage={currentPage}
          showToaster={false}
          isScroll={true}
        />
      )}
    </Box>
  );
};

export default MovieSection;
