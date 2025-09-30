"use client";

import { getPlaylists } from "@/store/async-thunks/user.thunk";
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
          accessToken: session?.user?.accessToken as string,
        })
      );
    }
  }, [status]);
};

export default useGetPlaylists;
