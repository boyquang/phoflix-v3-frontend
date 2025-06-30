"use client";

import RootLayout from "@/components/layout/RootLayout";
import FilterBox from "./FilterBox";
import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import SkeletonMovieGrid from "@/components/skeletons/SkeletonMovieGrid";
import EmptyData from "@/components/shared/EmptyData";
import { useEffect, useRef } from "react";
import { fetchDataMovieSearch } from "@/store/asyncThunks/movieAsyncThunk";
import { useSearchParams } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import PaginationCustom from "@/components/shared/PaginationCustom";
import { RiMovieFill } from "react-icons/ri";
import MovieGrid from "@/components/shared/MovieGrid";

const MainPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items, loading, pagination } = useSelector(
    (state: RootState) => state.movie.searchMovie
  );
  const totalItems = pagination?.totalItems || 0;
  const totalItemsPerPage = pagination?.totalItemsPerPage || 0;
  const limit = 24;
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || 1;
  const country = searchParams.get("country") || "";
  const category = searchParams.get("category") || "";
  const sort_lang = searchParams.get("sort_lang") || "";
  const year = searchParams.get("year") || "";
  const sort_type = searchParams.get("sort_type") || "desc";
  const elementScrollRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleFetchData = () => {
    dispatch(
      fetchDataMovieSearch({
        keyword: "a",
        page: currentPage as number,
        limit,
        country: country as any,
        category: category as any,
        sort_lang: sort_lang as any,
        year: year as any,
        sort_type: sort_type as any,
      })
    );
  };

  return (
    <RootLayout>
      <Box className="lg:pt-28 pt-24">
        <h3 className="inline-block title-text font-bold xl:text-3xl lg:text-2xl text-xl">
          Lọc nâng cao
        </h3>

        <FilterBox />

        <Box className="filter-result" />

        <div className="flex items-center gap-2 my-4 text-gray-100 font-bold lg:text-xl text-sm">
          <IoSearch />
          <h3 ref={elementScrollRef} className={`${loading ? "blink" : ""}`}>
            {loading
              ? "Đang tìm kiếm phim..."
              : `Tìm thấy ${totalItems} kết quả`}
          </h3>
        </div>

        <Box className="mt-12">
          {!loading ? (
            <>
              {items?.length > 0 ? (
                <MovieGrid
                  items={items}
                  classNameGrids="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 lg:gap-x-4 gap-x-2 gap-y-6"
                  orientation="vertical"
                />
              ) : (
                <Box className="h-96 max-w-2xl mx-auto flex items-center justify-center">
                  <EmptyData
                    className="bg-[#0003] rounded-2xl"
                    icon={<RiMovieFill />}
                    title="Không tìm thấy dữ liệu"
                    description="Không có bộ phim nào trong danh sách này"
                  />
                </Box>
              )}
            </>
          ) : (
            <SkeletonMovieGrid
              limit={24}
              classNameGrids="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 lg:gap-x-4 gap-x-2 gap-y-6"
            />
          )}
        </Box>

        {totalItems >= limit && (
          <PaginationCustom
            currentPage={Number(currentPage)}
            totalItems={totalItems}
            itemsPerPage={totalItemsPerPage}
            isScroll={true}
            showToaster={false}
            callback={handleFetchData}
          />
        )}
      </Box>
    </RootLayout>
  );
};

export default MainPage;
