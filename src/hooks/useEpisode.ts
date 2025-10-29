import { parseEpisodeCurrent } from "@/lib/utils";

interface UseEpisodeProps {
  movie?: Movie | null;
}

const useEpisode = ({ movie }: UseEpisodeProps) => {
  const episodeCurrent =
    movie?.episode_current.toLowerCase() || "Tập: N/A";
  const { episodeInfo, status } = parseEpisodeCurrent(episodeCurrent);
  const episodeText =
    episodeCurrent?.includes("hoàn tất") && episodeInfo
      ? `Tập ${episodeInfo}`
      : status;

  return { episodeText };
};

export default useEpisode;
