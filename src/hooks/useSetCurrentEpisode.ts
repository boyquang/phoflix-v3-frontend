"use client";

import { findEpisodeById, mergeEpisodeData } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface UseSetCurrenEpisodeProps {
  episodes: any[];
  enabled?: boolean;
  callback: (episode: any) => void;
}

const useSetCurrentEpisode = ({
  episodes,
  enabled = true,
  callback,
}: UseSetCurrenEpisodeProps) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!enabled) return;

    if (episodes?.length >= 0) {
      // Gộp các server lại với nhau
      const data = mergeEpisodeData(episodes);

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
