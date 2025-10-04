"use client";

import { fetchProgressMovieHistory } from "@/lib/actions/user-movie.action";
import { getIdFromLinkEmbed } from "@/lib/utils";
import { setMovieViewingStatus } from "@/store/slices/user.slice";
import { AppDispatch, RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const useProgressMovieHistory = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data: session, status } = useSession();
  const { movie, currentEpisode } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );
  const searchParams = useSearchParams();
  const fetchedRef = useRef<boolean>(false);

  // khi chuyển tập phim thì reset lại
  useEffect(() => {
    dispatch(
      setMovieViewingStatus({
        currentTime: 0,
        duration: 0,
        finished: false,
      })
    );
    fetchedRef.current = false;
  }, [searchParams.get("id")]);

  useEffect(() => {
    if (searchParams.get("ref") !== "continue") return;
    if (!currentEpisode || !movie?._id || status !== "authenticated") return;
    if (fetchedRef.current) return;

    fetchedRef.current = true;

    const currentEpisodeId = getIdFromLinkEmbed(currentEpisode.link_embed, 8);

    const getProgressMovieHistory = async () => {
      try {
        const response = await fetchProgressMovieHistory(
          movie._id as string,
          session?.user?.accessToken as string
        );

        if (response?.status) {
          const { currentTime, duration, finished, currentEpisode } =
            response?.result?.progress || {};

          if (currentEpisode?.episodeId !== currentEpisodeId) return;

          dispatch(
            setMovieViewingStatus({
              currentTime: currentTime || 0,
              duration: duration || 0,
              finished: finished || false,
              fetched: true,
            })
          );
        }
      } catch (error) {
        console.error("Error fetching movie progress:", error);
      }
    };

    getProgressMovieHistory();
  }, [movie?._id, status, currentEpisode?.link_embed, searchParams.get("ref")]);
};

export default useProgressMovieHistory;
