"use client";

import { findEpisodeById } from "@/lib/utils";
import { setCurrentEpisode } from "@/store/slices/episode.slice";
import { AppDispatch, RootState } from "@/store/store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface UseSetCurrenEpisodeProps {
  enabled?: boolean;
}

const useSetCurrentEpisode = ({ enabled = true }: UseSetCurrenEpisodeProps) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { episodes } = useSelector((state: RootState) => state.episode);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!enabled || !episodes || episodes?.length === 0) return;

    if (episodes?.length >= 0) {
      // Gộp các server lại với nhau
      const data = episodes.flatMap((item) => item?.server_data || []);
      // Tìm episode tương ứng với id
      const currentEpisode = findEpisodeById(data, id as string);
      dispatch(setCurrentEpisode(currentEpisode || data?.[0] || null));
    }
  }, [episodes, id, enabled]);
};

export default useSetCurrentEpisode;
