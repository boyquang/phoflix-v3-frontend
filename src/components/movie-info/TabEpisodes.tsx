
"use client";

import EpisodesList from "@/components/episode/EpisodeList";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import EpisodeTabs from "../episode/EpisodeTabs";

const TabEpisodes = () => {
  const { groups, selectedLanguage, showThumbnail } = useSelector(
    (state: RootState) => state.episode
  );
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);

  if (Object.keys(groups)?.length === 0) return null;

  return (
    <>
      <EpisodeTabs slug={movie?.slug || ""} />
      {Object.keys(groups)?.length > 0 && selectedLanguage && (
        <EpisodesList
          movie={movie}
          episodes={groups[selectedLanguage]?.items || []}
          columns={{
            base: showThumbnail ? 2 : 3,
            md: showThumbnail ? 3 : 4,
            lg: showThumbnail ? 3 : 6,
            xl: showThumbnail ? 4 : 6,
            "2xl": showThumbnail ? 3 : 7,
            "3xl": showThumbnail ? 5 : 8,
          }}
          redirect
        />
      )}
    </>
  );
};

export default TabEpisodes;
