"use client";

import { fetchSeasonEpisodes } from "@/store/async-thunks/movie.thunk";
import { AppDispatch, RootState } from "@/store/store";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface UseFetchSeasonEpisodesProps {
  movie: Movie | null;
}

const useFetchSeasonEpisodes = ({ movie }: UseFetchSeasonEpisodesProps) => {
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const { isLongSeries } = useSelector((state: RootState) => state.episode);

  useEffect(() => {
    if (movie?.slug !== params?.slug) return;
    if (!movie?.tmdb.id) return;
    if (!isLongSeries) return;

    dispatch(
      fetchSeasonEpisodes({
        tmdbId: movie?.tmdb.id.toString() || "",
        season: Number(movie?.tmdb?.season) || 1,
      })
    );
  }, [movie?.slug, params?.slug, isLongSeries]);
};

export default useFetchSeasonEpisodes;
