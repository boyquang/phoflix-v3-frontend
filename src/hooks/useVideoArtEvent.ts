"use client";

import { updateProgressMovieHistory } from "@/lib/actions/user-movie.action";
import { getIdFromLinkEmbed } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store/store";
import Artplayer from "artplayer";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAutoNextEpisode from "./useAutoNextEpisode";
import { setMovieViewingStatus } from "@/store/slices/user.slice";

const useVideoArtEvent = () => {
  const { currentTime, fetched } = useSelector(
    (state: RootState) => state.user.movieViewingStatus
  );
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);
  const { currentEpisode } = useSelector((state: RootState) => state.episode);
  const { autoNextEpisode, handleAutoNextEpisode } = useAutoNextEpisode({});
  const { data: session } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const updatingRef = useRef<boolean>(false);
  const lastSaveTime = useRef<number>(currentTime || 0);
  const isSeekingRef = useRef<boolean>(false);

  const handleUpdateProgress = async (
    currentTime: number,
    duration: number
  ) => {
    if (!session || !movie || !currentEpisode) return;

    try {
      const episodeId =
        getIdFromLinkEmbed(currentEpisode?.link_embed, 8) || "error";

      const response = await updateProgressMovieHistory(
        movie?._id as string,
        session?.user?.accessToken as string,
        {
          currentTime,
          duration,
          finished: currentTime === duration,
          currentEpisode: {
            episodeId,
            name: currentEpisode?.name,
          },
        }
      );

      if (response.status) {
        lastSaveTime.current = currentTime;
        updatingRef.current = true;
      }
    } catch (error) {
      console.error("Error saving movie progress:", error);
    }
  };

  // Hàm debounce để hạn chế tần suất gọi hàm handleUpdateProgress
  const debouncedHandleUpdateProgress = debounce(
    (currentTime: number, duration: number) => {
      handleUpdateProgress(currentTime, duration);
      if (isSeekingRef.current) isSeekingRef.current = false;
    },
    2000
  );

  const handlePause = (art: Artplayer) => {
    debouncedHandleUpdateProgress(
      Math.floor(art.currentTime),
      Math.floor(art.duration)
    );
  };

  const handleLoaded = (art: Artplayer, cbFunction?: () => void) => {
    if (cbFunction) cbFunction();
  };

  const handleCanplayThrough = (art: Artplayer) => {
    art.play().catch(() => {
      console.log("Autoplay was prevented");
    });
  };

  const handlePlay = (art: Artplayer) => {};

  const handleEnded = (art: Artplayer) => {
    if (autoNextEpisode) handleAutoNextEpisode();

    const timeViewed = art.currentTime - lastSaveTime.current;
    if (timeViewed < art.duration * 0.7) return;

    debouncedHandleUpdateProgress(
      Math.floor(art.duration),
      Math.floor(art.duration)
    );
  };

  const handleSeeking = (art: Artplayer) => {
    isSeekingRef.current = true;
  };

  const handleSeeked = (art: Artplayer) => {
    // lần đầu khi fetch api set currentTime thì không lưu
    if (fetched) {
      dispatch(setMovieViewingStatus({ fetched: false }));
      isSeekingRef.current = false;
      return;
    }

    // Khi seek xong thì lưu tiến trình hiện tại
    debouncedHandleUpdateProgress(
      Math.floor(art.currentTime),
      Math.floor(art.duration)
    );
  };

  const handleTimeUpdate = (art: Artplayer) => {
    // lần đầu khi fetch api set currentTime thì không lưu
    if (fetched) {
      dispatch(setMovieViewingStatus({ fetched: false }));
      return;
    }

    const timeWatched = art.currentTime - lastSaveTime.current;

    // Tự động lưu tiến trình nếu đã xem được 30 giây và không phải đang seek
    if (timeWatched > 30 && !isSeekingRef.current) {
      handleUpdateProgress(
        Math.floor(art.currentTime),
        Math.floor(art.duration)
      );
    }
  };

  const videoEvents = {
    onPlay: handlePlay,
    onPause: handlePause,
    onEnded: handleEnded,
    onSeeking: handleSeeking,
    onSeeked: handleSeeked,
    onTimeUpdate: handleTimeUpdate,
    onLoadedData: handleLoaded,
    onCanplayThrough: handleCanplayThrough,
  };

  return videoEvents;
};

export default useVideoArtEvent;
