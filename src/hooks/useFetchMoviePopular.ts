"use client";

import { fetchMoviePopular } from "@/store/asyncThunks/movieAsyncThunk";
import { AppDispatch } from "@/store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface MoviePopularProps {
  page?: number;
}

const useFetchMoviePopular = ({ page = 1 }: MoviePopularProps) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMoviePopular({ page }));
  }, []);
};

export default useFetchMoviePopular;
