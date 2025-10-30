import { parseEpisodeCurrent } from "@/lib/utils";

interface UseEpisodeProps {
  movie?: Movie | null;
}

const useEpisode = ({ movie }: UseEpisodeProps) => {
  const episodeCurrent = movie?.episode_current.toLowerCase() || "Tập: N/A";
  const { episodeInfo, status } = parseEpisodeCurrent(episodeCurrent);
  const episodeText =
    episodeCurrent?.includes("hoàn tất") && episodeInfo
      ? `Tập ${episodeInfo}`
      : status;

  const episodesStatisticsMapping = {
    Vietsub: {
      text: {
        default: "PĐ",
        full: "P.Đề",
      },
      bgColor: "bg-[#5e6070]",
    },
    "Thuyet Minh": {
      text: {
        default: "TM",
        full: "T.Minh",
      },
      bgColor: "bg-[#2ca35d]",
    },
    "Long Tieng": {
      text: {
        default: "LT",
        full: "L.Tiếng",
      },
      bgColor: "bg-[#1667cf]",
    },
  };

  return { episodeText, episodesStatisticsMapping };
};

export default useEpisode;
