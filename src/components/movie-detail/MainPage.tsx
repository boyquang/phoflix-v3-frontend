"use client";

import RootLayout from "@/components/layout/RootLayout";
import {
  Describe,
  fetchDataMovieDetail,
} from "@/store/asyncThunks/movieAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyData from "@/components/shared/EmptyData";
import SkeletonDetailPage from "@/components/skeletons/SkeletonDetailPage";
import TopicBackground from "@/components/shared/TopicBackground";
import PaginationCustom from "@/components/shared/PaginationCustom";
import { RiMovieFill } from "react-icons/ri";
import MovieGrid from "@/components/shared/MovieGrid";

const MainPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const { items, loading, pagination, titlePage } = useSelector(
    (state: RootState) => state.movie.movieDetail
  );
  const totalItems = pagination?.totalItems;
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = 24;

  useEffect(() => {
    dispatch(
      fetchDataMovieDetail({
        describe: params["describe"] as Describe,
        slug: params["slug"] as string,
        page: Number(currentPage),
        limit,
      })
    );
  }, [params["describe"], params["slug"], currentPage]);

  if (loading) return <SkeletonDetailPage slug={params?.slug as string} />;
  if (!items || items?.length === 0) {
    return (
      <Box className="min-h-screen flex items-center justify-center max-w-2xl mx-auto px-4">
        <EmptyData
          className="bg-[#0003] rounded-2xl"
          icon={<RiMovieFill />}
          title="Không có dữ liệu"
          description="Danh sách hiện tại chưa chứa bộ phim nào."
        />
      </Box>
    );
  }

  return (
    <Box className="relative">
      <TopicBackground slug={params["slug"] as string} />
      <RootLayout>
        <Box className="lg:pt-28 pt-24 relative z-10">
          <h3 className="inline-block xl:text-3xl lg:text-2xl text-xl title-text font-bold">
            {`${titlePage} - ${totalItems} bộ phim`}
          </h3>
          <Box className="mt-12">
            <MovieGrid
              items={items}
              classNameGrids="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 lg:gap-x-4 gap-x-2 gap-y-6"
            />
          </Box>

          {!loading && (pagination?.totalItems as number) >= limit && (
            <PaginationCustom
              totalItems={pagination?.totalItems as number}
              itemsPerPage={limit}
              currentPage={currentPage}
              showToaster={false}
            />
          )}
        </Box>
      </RootLayout>
    </Box>
  );
};

export default MainPage;
