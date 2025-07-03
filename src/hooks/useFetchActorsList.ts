"use client";

import { fetchActorsListByMovie } from "@/store/asyncThunks/movieAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFetchActorsList = () => {
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (movie && movie?.slug === params?.slug) {
      dispatch(
        fetchActorsListByMovie({
          type: movie?.tmdb?.type  as "movie" | "tv",
          season: movie?.tmdb?.season as number | string,
          id: movie?.tmdb?.id as string,
        })
      );
    }
  }, [params?.slug, movie]);
};

export default useFetchActorsList;
