"use client";

import useEpisode from "@/hooks/useEpisode";
import { useEffect, useState } from "react";

interface EpisodeBadgesProps {
  data: Movie;
  showEpisodeBadge?: boolean;
}

const EpisodeBadges = ({
  data,
  showEpisodeBadge = true,
}: EpisodeBadgesProps) => {
  const [isLongSeries, setIsLongSeries] = useState(false);
  const { episodesStatisticsMapping } = useEpisode({ movie: data });

  useEffect(() => {
    if (data?.is_cinema) {
      setIsLongSeries(false);
    } else {
      const isMultiEpisode = data?.episodes_statistics?.some(
        (epStat) => epStat?.count > 1
      );
      setIsLongSeries(isMultiEpisode || false);
    }
  }, [data, showEpisodeBadge]);

  if (!data?.episodes_statistics || data.episodes_statistics.length === 0)
    return null;
  if (!showEpisodeBadge) return null;

  return (
    <div className="absolute z-50 sm:flex-row flex-col sm:gap-0 gap-1 sm:rounded-t-sm overflow-hidden sm:bottom-0 sm:-translate-x-1/2 flex sm:left-1/2 left-1 bottom-1 transform">
      {data.episodes_statistics.map((epStat, index) => (
        <div
          key={index}
          className={`flex sm:rounded-none rounded-lg items-center sm:text-xs text-[10px] justify-center sm:h-6 h-4 px-1.5 text-white ${
            episodesStatisticsMapping[epStat.text]?.bgColor || "bg-gray-600"
          }`}
        >
          {
            episodesStatisticsMapping[epStat.text]?.text[
              isLongSeries ? "default" : "full"
            ]
          }
          {isLongSeries && (
            <span className="font-semibold">.{epStat.count}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default EpisodeBadges;
