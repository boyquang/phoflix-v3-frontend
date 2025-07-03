"use client";

import { getPlaylists } from "@/store/asyncThunks/userAsyncThunk";
import { AppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetPlaylists = () => {
  const { data: session, status } = useSession();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (status === "authenticated") {
      dispatch(
        getPlaylists({
          userId: session?.user?.id as string,
          accessToken: session?.user?.accessToken as string,
        })
      );
    }
  }, [status]);
};

export default useGetPlaylists;
