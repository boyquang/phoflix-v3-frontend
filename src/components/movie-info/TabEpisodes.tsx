"use client";

import EpisodesList from "@/components/episode/EpisodeList";
import { setCurrentEpisode } from "@/store/slices/movie.slice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import EpisodeTabs from "../episode/EpisodeTabs";

const TabEpisodes = () => {
  const { currentEpisode } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );
  const { groups, selectedLanguage } = useSelector(
    (state: RootState) => state.movie.episode
  );
  const dispatch: AppDispatch = useDispatch();

  if (Object.keys(groups)?.length === 0) return null;

  return (
    <>
      <EpisodeTabs />
      {Object.keys(groups)?.length > 0 && selectedLanguage && (
        <EpisodesList
          episodes={groups[selectedLanguage]?.items || []}
          language={selectedLanguage}
          currentEpisode={currentEpisode}
          setCurrentEpisode={(item) => dispatch(setCurrentEpisode(item))}
          colums={{
            base: 3,
            md: 5,
            lg: 6,
            xl: 6,
          }}
          redirect
          showToaster={false}
          isScroll
          elementScrollName="movie-main"
        />
      )}
    </>
  );
};

export default TabEpisodes;
