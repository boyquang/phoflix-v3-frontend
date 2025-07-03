"use client";

import { getPlaylistsContainingMovie } from "@/store/asyncThunks/userAsyncThunk";
import { AppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetPlaylistContainingMovie = () => {
  const params = useParams();
  const { data: session, status } = useSession();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (status === "authenticated") {
      dispatch(
        getPlaylistsContainingMovie({
          userId: session?.user?.id as string,
          movieSlug: params.slug as string,
          accessToken: session?.user?.accessToken as string,
        })
      );
    }
  }, [params.slug, status]);
};

export default useGetPlaylistContainingMovie;
