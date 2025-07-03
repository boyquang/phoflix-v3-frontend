"use client";

import EpisodesList from "@/components/episode/EpisodeList";
import useSendSocketWatchingTogether from "@/hooks/useSendSocketWatchingTogether";
import { setCurrentEpisode } from "@/store/slices/watchingTogetherSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";

const EpisodeWrapper = () => {
  const { movieData, currentEpisode } = useSelector(
    (state: RootState) => state.watchingTogether
  );
  const dispatch: AppDispatch = useDispatch();
  const { sendSocketChangeEpisode } = useSendSocketWatchingTogether();

  // Làm chậm việc thay đổi tập phim để tránh gửi quá nhiều sự kiện đến server
  const debounceChangeEpisode = debounce(sendSocketChangeEpisode, 500);

  return (
    <>
      <Box className="w-full h-[0.5px] bg-[#ffffff10] lg:my-12 my-6"></Box>
      <Box className="flex flex-col gap-6 lg:my-0 my-6">
        {movieData?.episodes?.map((episode, index: number) => (
          <EpisodesList
            currentEpisode={currentEpisode}
            setCurrentEpisode={(item) => dispatch(setCurrentEpisode(item))}
            callbackSocket={(item) => debounceChangeEpisode(item)}
            key={index}
            redirect={false}
            colums={{
              base: 3,
              md: 5,
              lg: 6,
              xl: 6,
            }}
            language={episode?.server_name as languageType}
            episodes={episode?.server_data}
          />
        ))}
      </Box>
    </>
  );
};

export default EpisodeWrapper;
