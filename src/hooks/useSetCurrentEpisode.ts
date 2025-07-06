"use client";

import { findEpisodeById, mergeEpisodeData } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface UseSetCurrenEpisodeProps {
  episodes: Episode[];
  enabled?: boolean;
  callback: (episode: EpisodeMerged) => void;
}

const useSetCurrentEpisode = ({
  episodes,
  enabled = true,
  callback,
}: UseSetCurrenEpisodeProps) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!enabled || !episodes || episodes.length === 0) return;

    if (episodes?.length >= 0) {
      // Gộp các server lại với nhau
      const data = episodes.flatMap((item) => item?.server_data || []);

      // Tìm episode tương ứng với id
      const currentEpisode = findEpisodeById(data, id as string);

      if (currentEpisode) {
        callback(currentEpisode);
      } else {
        callback(data?.[0]);
      }
    }
  }, [episodes]);
};

export default useSetCurrentEpisode;
