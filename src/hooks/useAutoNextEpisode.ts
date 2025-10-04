"use client";

import { changeQuery, getIdFromLinkEmbed } from "@/lib/utils";
import { RootState } from "@/store/store";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

const useAutoNextEpisode = () => {
  const { currentEpisode } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );
  const { autoNextEpisode } = useSelector((state: RootState) => state.user);
  const { groups, selectedLanguage } = useSelector(
    (state: RootState) => state.movie.episode
  );
  const searchParams = useSearchParams();
  const id: string | null = searchParams.get("id");

  const handleAutoNextEpisode = () => {
    if (!selectedLanguage || !currentEpisode) return;

    // Lấy tất cả các tập trong ngôn ngữ hiện tại
    const episodes = groups[selectedLanguage]?.items || [];

    // Tìm tập hiện tại trong danh sách tập
    const episodeId = id ?? getIdFromLinkEmbed(currentEpisode.link_embed, 8);

    // Tìm vị trí của tập hiện tại
    const currentIndex = episodes.findIndex(
      (ep) => getIdFromLinkEmbed(ep.link_embed, 8) === episodeId
    );

    // Nếu tập hiện tại không phải là tập cuối cùng, chuyển đến tập tiếp theo
    if (currentIndex !== -1 && currentIndex < episodes.length - 1) {
      const nextEpisode = episodes[currentIndex + 1];

      const newQuery = [
        { key: "id", value: getIdFromLinkEmbed(nextEpisode.link_embed, 8) },
        { key: "ep", value: nextEpisode.slug },
        { key: "language", value: selectedLanguage },
      ];

      changeQuery(newQuery);
    }
  };

  return { autoNextEpisode, handleAutoNextEpisode };
};

export default useAutoNextEpisode;
