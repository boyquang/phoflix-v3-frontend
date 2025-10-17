"use client";

import EpisodesList from "@/components/episode/EpisodeList";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import EpisodeTabs from "../episode/EpisodeTabs";

const TabEpisodes = () => {
  const { groups, selectedLanguage } = useSelector(
    (state: RootState) => state.episode
  );
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);

  if (Object.keys(groups)?.length === 0) return null;

  return (
    <>
      <EpisodeTabs slug={movie?.slug || ""} />
      {Object.keys(groups)?.length > 0 && selectedLanguage && (
        <EpisodesList
          episodes={groups[selectedLanguage]?.items || []}
          columns={{
            base: 3,
            md: 5,
            lg: 6,
            xl: 6,
          }}
          redirect
        />
      )}
    </>
  );
};

export default TabEpisodes;
