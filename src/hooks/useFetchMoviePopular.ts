"use client";

import { fetchDataMoviePopular } from "@/store/async-thunks/movie.thunk";
import { AppDispatch } from "@/store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface MoviePopularProps {
  page?: number;
}

const useFetchMoviePopular = ({ page = 1 }: MoviePopularProps) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataMoviePopular({ page }));
  }, []);
};

export default useFetchMoviePopular;
