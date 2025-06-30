"use client";

import RootLayout from "@/components/layout/RootLayout";
import { fetchDataMovieSearch } from "@/store/asyncThunks/movieAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyData from "@/components/shared/EmptyData";
import SkeletonSearchPage from "@/components/skeletons/SkeletonSearchPage";
import { BiSearchAlt } from "react-icons/bi";
import PaginationCustom from "@/components/shared/PaginationCustom";
import MovieGrid from "@/components/shared/MovieGrid";

const MainPage = () => {
  const searchParams = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const { items, loading, pagination } = useSelector(
    (state: RootState) => state.movie.searchMovie
  );
  const currentPage = Number(searchParams.get("page")) || 1;
  const keyword = searchParams.get("keyword");
  const limit = 24;

  useEffect(() => {
    dispatch(
      fetchDataMovieSearch({
        keyword: keyword as string,
        page: Number(currentPage),
        limit,
      })
    );
  }, [keyword, currentPage]);

  if (loading) return <SkeletonSearchPage />;

  if (!items || items?.length === 0) {
    return (
      <Box className="min-h-screen flex items-center justify-center max-w-2xl mx-auto px-4">
        <EmptyData
          className="bg-[#0003] rounded-2xl"
          icon={<BiSearchAlt />}
          title="Không tìm thấy kết quả phù hợp"
          description="Hãy thử lại với từ khóa khác nhé"
        />
      </Box>
    );
  }

  return (
    <RootLayout>
      <Box className="lg:pt-28 pt-24">
        <h3 className="inline-block xl:text-3xl lg:text-2xl text-xl title-text font-bold">
          Tìm thấy {pagination?.totalItems} kết quả cho từ khóa &quot;
          {keyword}
          &quot;
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
            showToaster={false}
            currentPage={currentPage}
          />
        )}
      </Box>
    </RootLayout>
  );
};

export default MainPage;
