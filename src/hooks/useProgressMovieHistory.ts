"use client";

import { fetchProgressMovieHistory } from "@/lib/actions/user-movie.action";
import { getIdFromLinkEmbed } from "@/lib/utils";
import { setMovieViewingStatus } from "@/store/slices/user.slice";
import { AppDispatch, RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const useProgressMovieHistory = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data: session, status } = useSession();
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);
  const { currentEpisode } = useSelector((state: RootState) => state.episode);
  const searchParams = useSearchParams();
  const params = useParams();
  const fetchedRef = useRef<boolean>(false);
  const idFromSearchParams = searchParams.get("id");
  const refFromSearchParams = searchParams.get("ref");

  // khi chuyển tập phim thì reset lại
  useEffect(() => {
    fetchedRef.current = false;

    dispatch(
      setMovieViewingStatus({
        currentTime: 0,
        duration: 0,
        finished: false,
      })
    );
  }, [params?.slug, idFromSearchParams]);

  useEffect(() => {
    if (refFromSearchParams !== "continue") return; // không phải ref=continue
    if (fetchedRef.current) return; // đã fetch rồi, không cần nữa
    if (params?.slug !== movie?.slug) return; // slug không khớp
    if (!currentEpisode || !movie?._id) return; // thiếu dữ liệu phim/tập
    if (status !== "authenticated") return; // chưa đăng nhập

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

          fetchedRef.current = true;

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
  }, [movie?._id, status, currentEpisode?.link_embed, refFromSearchParams]);
};

export default useProgressMovieHistory;
