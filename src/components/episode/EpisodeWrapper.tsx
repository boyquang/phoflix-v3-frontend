"use client";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import MovieVersionList from "./MovieVersionList";
import EpisodeTabs from "./EpisodeTabs";
import EpisodesList from "./EpisodeList";

interface EpisodeWrapperProps {
  movie: Movie | null;
  options?: {
    columsEpisodesList?: {
      base: number;
      md: number;
      lg: number;
      xl: number;
    };
  };
}

const EpisodeWrapper = ({
  movie,
  options = { columsEpisodesList: { base: 3, md: 5, lg: 6, xl: 6 } },
}: EpisodeWrapperProps) => {
  const { base = 3, md = 5, lg = 6, xl = 6 } = options.columsEpisodesList || {};
  const { isLongSeries, isValidEpisodes, groups, selectedLanguage } =
    useSelector((state: RootState) => state.episode);

  if (!isValidEpisodes) return null;

  return (
    <div>
      {isLongSeries ? (
        <>
          {Object.keys(groups)?.length > 0 ? (
            <div>
              <EpisodeTabs slug={movie?.slug || ""} />
              {selectedLanguage && (
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
            </div>
          ) : null}
        </>
      ) : (
        <MovieVersionList movie={movie as Movie} />
      )}
    </div>
  );
};

export default EpisodeWrapper;
