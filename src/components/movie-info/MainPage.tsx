"use client";

import { fetchDataMovieInfo } from "@/store/asyncThunks/movieAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackgroundMovie from "./BackgroundMovie";
import MovieDetail from "./MovieDetail";
import SkeletonInfoPage from "@/components/skeletons/SkeletonInfoPage";
import EmptyData from "@/components/shared/EmptyData";
import { FaPhotoFilm } from "react-icons/fa6";
import useGetPlaylistContainingMovie from "@/hooks/useGetPlaylistsContainingMovie";
import useGetPlaylists from "@/hooks/useGetPlaylists";
import useFetchActorsList from "@/hooks/useFetchActorsList";
import useFetchMoviePopular from "@/hooks/useFetchMoviePopular";
import MovieMain from "./MovieMain";

const MainPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { movie, loading, error } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );
  const params = useParams();
  const slug = params?.slug ?? "";

  useEffect(() => {
    if (slug && movie?.slug !== slug) {
      dispatch(
        fetchDataMovieInfo({
          slug: slug as string,
          page: "info",
        })
      );
    }
  }, [slug]);

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

  if (loading) return <SkeletonInfoPage />;
  if (error)
    return (
      <Box className="min-h-screen flex items-center justify-center max-w-2xl mx-auto px-4">
        <EmptyData
          className="bg-[#0003] rounded-2xl"
          icon={<FaPhotoFilm />}
          title="Không tìm thấy dữ liệu"
          description="Bộ phim này không tồn tại hoặc có thể đã bị xóa."
        />
      </Box>
    );

  return (
    <>
      <BackgroundMovie url={movie?.thumb_url} />
      <Box className="max-w-[1620px] mx-auto 2xl:px-12 lg:px-4">
        <Box className="mt-[-100px]">
          <SimpleGrid columns={12} gap={0}>
            <GridItem colSpan={{ base: 12, md: 12, lg: 12, xl: 4 }}>
              <MovieDetail data={movie} />
            </GridItem>
            <GridItem
              className="movie-main"
              colSpan={{ base: 12, md: 12, lg: 12, xl: 8 }}
            >
              <MovieMain />
            </GridItem>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
};

export default MainPage;
