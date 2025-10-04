"use client";

import { getPlaylistsContainingMovie } from "@/store/async-thunks/user.thunk";
import { AppDispatch, RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetPlaylistContainingMovie = () => {
  const params = useParams();
  const { data: session, status } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);

  useEffect(() => {
    if (!movie?._id || status !== "authenticated") return;

    dispatch(
      getPlaylistsContainingMovie({
        movieId: movie?._id as string,
        accessToken: session?.user?.accessToken as string,
      })
    );
  }, [movie?._id, params.slug, status]);
};

export default useGetPlaylistContainingMovie;
