"use client";

import { fetchDataMovieInfo } from "@/store/asyncThunks/movieAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentEpisode } from "@/store/slices/movieSlice";
import SectionInfo from "./SectionInfo";
import EpisodesList from "@/features/episode/EpisodeList";
import SkeletonWachingPage from "@/components/skeletons/SkeletonWatchingPage";
import EmptyData from "@/components/shared/EmptyData";
import { addNewMovie } from "@/lib/actions/userMovieAction";
import { useSession } from "next-auth/react";
import FavoriteButton from "@/components/shared/FavoriteButton";
import ShareButton from "@/components/shared/ShareButton";
import CommentSection from "@/features/feedback/FeedbackSection";
import CinemaMode from "@/components/shared/CinemaMode";
import SectionVideo from "./SectionVideo";
import DownloadFilmButton from "@/components/shared/DownloadFilmButton";
import WatchingTogetherButton from "@/features/watch-together/WatchingTogetherButton";
import useSetCurrenEpisode from "@/hooks/useSetCurrentEpisode";
import useGetPlaylistContainingMovie from "@/hooks/useGetPlaylistsContainingMovie";
import useGetPlaylists from "@/hooks/useGetPlaylists";
import PopoverPlaylist from "../user/playlist/PopoverPlaylist";
import ReportDialog from "../movie-report/ReportDialog";
import MovieSuggesstions from "@/components/shared/MovieSuggestions";

const MainPage = () => {
  const params = useParams();
  const { data: session }: any = useSession();
  const dispatch: AppDispatch = useDispatch();
  const { movie, episodes, loading, error, currentEpisode } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );

  const handleInitWatching = async () => {
    const response = await dispatch(
      fetchDataMovieInfo({
        slug: params?.slug as string,
        page: "watching",
      })
    );

    const movie = response?.payload?.movie;

    if (movie && session) {
      addNewMovie({
        userId: session?.user?.id as string,
        movieData: {
          name: movie?.name,
          lang: movie?.lang,
          quality: movie?.quality,
          slug: movie?.slug,
          year: movie?.year,
          time: movie?.time,
          episodeCurrent: movie?.episode_current,
          originName: movie?.origin_name,
          posterUrl: movie?.poster_url,
          thumbUrl: movie?.thumb_url,
          category: movie?.category,
        },
        type: "history",
        accessToken: session?.user?.accessToken,
      });
    }
  };

  useEffect(() => {
    if (params?.slug) {
      handleInitWatching();
    }
  }, [params?.slug]);

  // Lấy danh sách phim trong danh sách phát
  useGetPlaylistContainingMovie();

  // Lấy danh sách phát của người dùng
  useGetPlaylists();

  // Lấy dữ liệu tập phim hiện tại từ id
  useSetCurrenEpisode({
    episodes: episodes,
    callback: (item) => dispatch(setCurrentEpisode(item)),
  });

  if (loading) return <SkeletonWachingPage />;
  if (error) {
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <EmptyData
          title="Không tìm thấy kết quả"
          description="Bộ phim này không tồn tại hoặc đã bị xóa"
        />
      </Box>
    );
  }

  return (
    <Box className="flex flex-col gap-12 max-w-[1620px] mx-auto 2xl:px-12 px-4">
      <Box className="lg:mt-32 mt-24">
        <h3 className="xl:text-4xl lg:text-3xl md:text-2xl text-xl title-text font-bold mb-6 sm:inline-block hidden">
          {movie?.name} - {currentEpisode?.name}
        </h3>

        <Box className="flex flex-col relative watch-player xs:-mx-0 -mx-4">
          <SectionVideo />
          <Box className="lg:p-4 p-2 bg-[#08080a] border-l border-r border-b border-[#ffffff10] xs:rounded-b-2xl rounded-b-none flex gap-2 justify-between flex-wrap items-center">
            <Box className="flex lg:gap-x-4 gap-x-2 gap-y-2 items-center flex-wrap">
              <FavoriteButton placement="horizontal" responsiveText />
              <PopoverPlaylist placement="horizontal" responsiveText />
              <ShareButton placement="horizontal" responsiveText />
              <ReportDialog />
              <DownloadFilmButton placement="horizontal" responsiveText />
              <WatchingTogetherButton placement="horizontal" responsiveText />
            </Box>
            <CinemaMode />
          </Box>
        </Box>
      </Box>

      <Box className="flex flex-col gap-12">
        <Box className="flex gap-12 lg:flex-row flex-col pb-12 border-b border-[#ffffff10]">
          <SectionInfo data={movie} />
          <Box className="lg:w-[0.5px] w-full lg:h-auto h-[0.5px] bg-[#ffffff10]"></Box>
          <Box className="xl:flex-2 flex-1">
            <Box className="flex flex-col gap-8">
              {episodes?.map((episode: any, index: number) => (
                <EpisodesList
                  currentEpisode={currentEpisode}
                  setCurrentEpisode={(item) =>
                    dispatch(setCurrentEpisode(item))
                  }
                  key={index}
                  colums={{
                    base: 3,
                    md: 5,
                    lg: 3,
                    xl: 6,
                  }}
                  redirect={false}
                  server_name={episode?.server_name}
                  server_data={episode?.server_data}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <CommentSection />

        <Box className="w-full h-[0.5px] bg-[#ffffff10]"></Box>

        <MovieSuggesstions
          classNameGrids="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 lg:gap-x-4 gap-x-2 gap-y-6"
          title="Đề xuất cho bạn"
          limit={24}
        />
      </Box>
    </Box>
  );
};

export default MainPage;
