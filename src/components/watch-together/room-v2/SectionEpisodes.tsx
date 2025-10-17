"use client";

import EpisodesList from "@/components/episode/EpisodeList";
import EpisodeTabs from "@/components/episode/EpisodeTabs";
import MovieVersionList from "@/components/episode/MovieVersionList";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const SectionEpisodes = () => {
  const { roomData } = useSelector((state: RootState) => state.watchTogetherV2);
  const { groups, selectedLanguage, isLongSeries, isValidEpisodes } =
    useSelector((state: RootState) => state.episode);

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
                    columns={{
                      base: 3,
                      md: 5,
                      lg: 5,
                      xl: 6,
                    }}
                    redirect={false}
                    episodes={groups[selectedLanguage]?.items || []}
                  />
                )}
              </>
            ) : (
              <MovieVersionList
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
