"use client";

import useGetPlaylists from "@/hooks/useGetPlaylists";
import useGetPlaylistContainingMovie from "@/hooks/useGetPlaylistsContainingMovie";
import useSetCurrentEpisode from "@/hooks/useSetCurrentEpisode";
import { addNewMovie } from "@/lib/actions/user-movie.action";
import {
  setCurrentEpisode,
  setDataMovieInfo,
} from "@/store/slices/movie.slice";
import { AppDispatch, RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionVideo from "./SectionVideo";
import FavoriteButton from "../shared/FavoriteButton";
import PopoverPlaylist from "../user/playlist/PopoverPlaylist";
import ShareButton from "../shared/ShareButton";
import ReportDialog from "../movie-report/ReportDialog";
import DownloadFilmButton from "../shared/DownloadFilmButton";
import WatchingTogetherButton from "../watch-together/WatchingTogetherButton";
import CinemaMode from "../shared/CinemaMode";
import SectionInfo from "./SectionInfo";
import EpisodeTabs from "../episode/EpisodeTabs";
import EpisodesList from "../episode/EpisodeList";
import MovieVersionList from "../movie-version/MovieVersionList";
import FeedbackSection from "../feedback/FeedbackSection";
import MovieSuggesstions from "../shared/MovieSuggestions";

interface ClientWrapperProps {
  movie: Movie;
  episodes: Episode[];
}

const ClientWrapper = ({ movie, episodes }: ClientWrapperProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { data: session } = useSession();
  const params = useParams();
  const {
    currentEpisode,
    isLongSeries,
    episodes: episodesStore,
    movie: movieInfo,
    isValidEpisodes,
  } = useSelector((state: RootState) => state.movie.movieInfo);
  const { groups, selectedLanguage } = useSelector(
    (state: RootState) => state.movie.episode
  );

  useEffect(() => {
    dispatch(setDataMovieInfo({ movie, episodes }));
  }, [movie, episodes]);

  // Thêm phim vào lịch sử xem
  useEffect(() => {
    if (movie && session && movie.slug === params?.slug) {
      addNewMovie({
        userId: session?.user?.id as string,
        movieData: {
          name: movie.name,
          lang: movie.lang,
          quality: movie.quality,
          slug: movie.slug,
          year: movie.year,
          time: movie.time,
          episodeCurrent: movie.episode_current,
          originName: movie.origin_name,
          posterUrl: movie.poster_url,
          thumbUrl: movie.thumb_url,
          category: movie.categories,
        },
        type: "history",
        accessToken: session?.user?.accessToken as string,
      });
    }
  }, [movie, session]);

  // Lấy danh sách phim trong danh sách phát
  useGetPlaylistContainingMovie();

  // Lấy danh sách phát của người dùng
  useGetPlaylists();

  // Lấy dữ liệu tập phim hiện tại từ id
  useSetCurrentEpisode({
    episodes: episodesStore || [],
    callback: (item) => dispatch(setCurrentEpisode(item)),
  });

  if (!movieInfo || Object.keys(movieInfo).length === 0) {
    return <div className="min-h-screen"></div>;
  }

  return (
    <div className="flex flex-col gap-12 max-w-[1620px] mx-auto 2xl:px-12 px-4">
      <div className="lg:mt-32 md:mt-24 mt-14">
        <h3 className="xl:text-4xl lg:text-3xl md:text-2xl text-xl text-gradient-primary font-bold mb-6 sm:inline-block hidden">
          {currentEpisode ? movie?.name : "Trailer"}
        </h3>

        <div className="flex flex-col relative watch-player md:-mx-0 -mx-4">
          <SectionVideo />
          <div className="lg:p-4 p-2 bg-[#08080a] md:rounded-b-xl rounded-b-none flex gap-2 justify-between flex-wrap items-center">
            <div className="flex lg:gap-x-4 gap-x-2 gap-y-2 items-center flex-wrap">
              <FavoriteButton placement="horizontal" responsiveText />
              <PopoverPlaylist placement="horizontal" responsiveText />
              <ShareButton placement="horizontal" responsiveText />
              <ReportDialog />
              <DownloadFilmButton placement="horizontal" responsiveText />
              <WatchingTogetherButton placement="horizontal" responsiveText />
            </div>
            <CinemaMode />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-12">
        <div className="flex gap-12 lg:flex-row flex-col pb-12 border-b border-[#ffffff10]">
          <SectionInfo data={movie} />
          {isValidEpisodes && (
            <>
              <div className="lg:w-[0.5px] w-full lg:h-auto h-[0.5px] bg-[#ffffff10]"></div>
              <div className="xl:flex-2 flex-1">
                {isLongSeries ? (
                  <>
                    <EpisodeTabs />
                    {Object.keys(groups)?.length > 0 && selectedLanguage && (
                      <EpisodesList
                        currentEpisode={currentEpisode}
                        setCurrentEpisode={(item) =>
                          dispatch(setCurrentEpisode(item))
                        }
                        colums={{
                          base: 3,
                          md: 5,
                          lg: 3,
                          xl: 6,
                        }}
                        redirect={false}
                        episodes={groups[selectedLanguage]?.items || []}
                        language={selectedLanguage}
                      />
                    )}
                  </>
                ) : (
                  <MovieVersionList
                    redirect={false}
                    classNameGrid="lg:grid-cols-3 md:grid-cols-3 xs:grid-cols-2 grid-cols-1"
                  />
                )}
              </div>
            </>
          )}
        </div>

        <FeedbackSection />

        <div className="w-full h-[0.5px] bg-[#ffffff10]"></div>

        <MovieSuggesstions
          classNameGrids="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 lg:gap-x-4 gap-x-2 gap-y-6"
          title="Đề xuất cho bạn"
          limit={24}
        />
      </div>
    </div>
  );
};

export default ClientWrapper;
