"use client";

import EpisodesList from "@/features/episode/EpisodeList";
import { setCurrentEpisode } from "@/store/slices/movieSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const TabEpisodes = () => {
  const { episodes, currentEpisode } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );
  const dispatch: AppDispatch = useDispatch();

  return (
    <Box className="flex flex-col episode-list gap-8">
      {episodes?.map((episode: any, index: number) => (
        <EpisodesList
          isScroll
          elementScrollName="movie-main"
          key={index}
          redirect
          currentEpisode={currentEpisode}
          setCurrentEpisode={(item) => dispatch(setCurrentEpisode(item))}
          colums={{
            base: 3,
            md: 5,
            lg: 6,
            xl: 6,
          }}
          server_name={episode?.server_name}
          server_data={episode?.server_data}
        />
      ))}
    </Box>
  );
};

export default TabEpisodes;
