"use client";

import { categories, countries } from "@/constants/movie";
import { getRandomItem } from "@/lib/utils";
import {
  Describe,
  fetchDataMovieDetail,
} from "@/store/asyncThunks/movieAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SkeletonMovieList from "../skeletons/SkeletonMovieGrid";
import MovieGrid from "./MovieGrid";
import { Box } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { setFetchedMovieSuggestion } from "@/store/slices/movieSlice";

const data = [...categories, ...countries];

interface MovieSuggesstionsProps {
  title: string | React.ReactNode;
  classNameGrids?: string;
  limit?: number;
}

const MovieSuggesstions = ({
  title,
  classNameGrids,
  limit = 15,
}: MovieSuggesstionsProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { items, loading, fetched } = useSelector(
    (state: RootState) => state.movie.movieSuggestion
  );
  const params = useParams();

  useEffect(() => {
    dispatch(setFetchedMovieSuggestion(false));
  }, [params.slug]);

  useEffect(() => {
    // Nếu đã fetch dữ liệu gợi ý thì không cần gọi lại
    if (fetched) return;

    const itemRandom = getRandomItem(data);
    const describe = categories.includes(itemRandom) ? "the-loai" : "quoc-gia";

    dispatch(
      fetchDataMovieDetail({
        describe: describe as Describe,
        slug: itemRandom?.slug as string,
        page: 1,
        target: "suggestion",
        limit,
      })
    );

    dispatch(setFetchedMovieSuggestion(true));
  }, []);

  return (
    <Box className="flex flex-col gap-4">
      <Box className="flex items-center gap-2 lg:text-2xl text-lg text-gray-50">
        <h4>{title}</h4>
      </Box>
      {loading ? (
        <SkeletonMovieList classNameGrids="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 lg:gap-x-4 gap-x-2 gap-y-6" />
      ) : (
        <MovieGrid items={items} classNameGrids={classNameGrids} />
      )}
    </Box>
  );
};

export default MovieSuggesstions;
