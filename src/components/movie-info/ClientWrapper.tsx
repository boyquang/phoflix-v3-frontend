"use client";

import useFetchActorsList from "@/hooks/useFetchActorsList";
import useFetchMoviePopular from "@/hooks/useFetchMoviePopular";
import useGetPlaylists from "@/hooks/useGetPlaylists";
import useGetPlaylistContainingMovie from "@/hooks/useGetPlaylistsContainingMovie";
import { setDataMovieInfo } from "@/store/slices/movieSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackgroundMovie from "./BackgroundMovie";
import { Box, Button } from "@chakra-ui/react";
import MovieDetail from "./MovieDetail";
import Link from "next/link";
import { FaPlay } from "react-icons/fa6";
import FavoriteButton from "../shared/FavoriteButton";
import PopoverPlaylist from "../user/playlist/PopoverPlaylist";
import ShareButton from "../shared/ShareButton";
import FeedbackButton from "../shared/FeedbackButton";
import ReviewButton from "../shared/ReviewButton";
import MovieTabs from "./MovieTabs";
import FeedbackSection from "../feedback/FeedbackSection";

interface ClientWrapperProps {
  movie: Movie;
  episodes: Episode[];
}

const ClientWrapper = ({ movie, episodes }: ClientWrapperProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { movie: movieInfo } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );

  useEffect(() => {
    dispatch(setDataMovieInfo({ movie, episodes }));
  }, [movie, episodes]);

  // Lấy danh sách diễn viên
  useFetchActorsList();

  // Lấy danh sách phim phổ biến
  useFetchMoviePopular({
    page: 1,
  });

  // Lấy danh sách phim trong danh sách phát
  useGetPlaylistContainingMovie();

  // Lấy danh sách phát của người dùng
  useGetPlaylists();

  if (!movieInfo || Object.keys(movieInfo).length === 0) {
    return <div className="min-h-screen"></div>;
  }

  return (
    <>
      <BackgroundMovie url={movie?.thumb_url as string} />
      <div className="max-w-[1620px] mx-auto 2xl:px-12 lg:px-4">
        <div className="mt-[-100px]">
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-12 xl:col-span-4">
              <MovieDetail data={movie} />
            </div>
            <div className="movie-main col-span-12 xl:col-span-8">
              <Box className="relative h-full z-[10] flex flex-col gap-4 lg:p-8 md:p-6 p-4 xl:rounded-tl-4xl xl:rounded-tr-4xl xl:rounded-br-4xl xl:rounded-bl-none lg:rounded-bl-4xl lg:rounded-br-4xl lg:bg-[#282b3a8a] lg:backdrop-blur-lg">
                <Box className="flex flex-col gap-8">
                  <Box className="flex gap-6 md:flex-row flex-col md:justify-start justify-center md:items-start items-center ">
                    <Link
                      href={`/dang-xem/${movie.slug}`}
                      className="md:min-w-auto min-w-[300px]"
                    >
                      <Button
                        className="w-full h-14 text-lg shadow-lg shadow-primary bg-primary linear-gradient border-none text-gray-800"
                        rounded="full"
                      >
                        <FaPlay />
                        Xem ngay
                      </Button>
                    </Link>
                    <Box className="flex justify-between gap-6 flex-1 items-center xs:w-auto w-full">
                      <Box className="flex xs:gap-3 gap-2">
                        <FavoriteButton placement="vertical" />
                        <PopoverPlaylist placement="vertical" />
                        <ShareButton placement="vertical" />
                        <FeedbackButton placement="vertical" />
                      </Box>
                      <ReviewButton />
                    </Box>
                  </Box>
                  <MovieTabs />
                  <Box className="w-full h-[0.5px] bg-[#ffffff10] my-6"></Box>
                  <FeedbackSection />
                </Box>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientWrapper;
