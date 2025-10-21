"use client";

import EpisodesList from "@/components/episode/EpisodeList";
import EpisodeTabs from "@/components/episode/EpisodeTabs";
import MovieVersionList from "@/components/episode/MovieVersionList";
import useSendSocketWatchTogetherV2 from "@/hooks/useSendSocketWatchTogetherV2";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const SectionEpisodes = () => {
  const { roomData } = useSelector((state: RootState) => state.watchTogetherV2);
  const {
    groups,
    selectedLanguage,
    isLongSeries,
    isValidEpisodes,
    showThumbnail,
  } = useSelector((state: RootState) => state.episode);
  const { sendSocketSyncEpisode } = useSendSocketWatchTogetherV2();

  const handleSendSocketEpisode = (item: EpisodeMerged) => {
    sendSocketSyncEpisode({
      roomId: roomData?._id as string,
      episode: item,
      hostUserId: roomData?.host?.userId as string,
      whoRequested: "host",
    });
  };

  return (
    <div>
      {isValidEpisodes && (
        <>
          <div className="">
            {isLongSeries ? (
              <>
                <EpisodeTabs slug={roomData?.movie?.slug || ""} />
                {Object.keys(groups)?.length > 0 && selectedLanguage && (
                  <EpisodesList
                    movie={roomData?.movie as Movie}
                    callbackSocket={(item: EpisodeMerged) => {
                      handleSendSocketEpisode(item);
                    }}
                    columns={{
                      base: showThumbnail ? 2 : 3,
                      md: showThumbnail ? 3 : 5,
                      lg: showThumbnail ? 3 : 3,
                      xl: showThumbnail ? 4 : 6,
                      "2xl": showThumbnail ? 4 : 7,
                      "3xl": showThumbnail ? 5 : 8,
                    }}
                    redirect={false}
                    episodes={groups[selectedLanguage]?.items || []}
                  />
                )}
              </>
            ) : (
              <MovieVersionList
                callbackSocket={(episode: EpisodeMerged) => {
                  handleSendSocketEpisode(episode);
                }}
                movie={roomData?.movie as Movie}
                redirect={false}
                classNameGrid="lg:grid-cols-3 md:grid-cols-3 xs:grid-cols-2 grid-cols-1"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SectionEpisodes;
