"use client";

import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { fetchDataMovie } from "@/store/async-thunks/movie.thunk";
import {
  initialMovieConfig,
  quantitySectionMovie,
} from "@/constants/movie.contant";
import TopicCards from "@/components/home/TopicCards";
import EventContainer from "@/components/event/EventContainer";
import RootLayout from "@/components/layout/RootLayout";
import Loading from "@/app/loading";
import MovieSection from "@/components/shared/MovieSection";
import {
  setFetchedMovieDataHomePage,
  setQuantityFetched,
} from "@/store/slices/movie.slice";
import MovieTopicList from "./MovieTopicList";
import CommunityHighlights from "../community-hightlights/CommunityHighlights";
import ContinueWatchingMovies from "./ContinueWatchingMovies";
import TopMovieSection from "./TopMovieSection";
import MovieBanner from "./MovieBanner";

const ClientWrapper = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, fetched, quantityFetched } = useSelector(
    (state: RootState) => state.movie.movieData
  );
  const scrollableDivRef = useRef<HTMLDivElement | null>(null);
  const hasFetchedMoreData = useRef(false);
  const quantityFetchedData = useRef(quantitySectionMovie);
  const [loadingMoreData, setLoadingMoreData] = useState(false);
  const [loadingInitData, setLoadingInitData] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (quantityFetched === initialMovieConfig.length) {
        window.removeEventListener("scroll", handleScroll);
        return;
      }

      // kiểm tra đã fetch dữ liệu chưa
      if (scrollableDivRef.current && !hasFetchedMoreData.current) {
        const rect = scrollableDivRef.current.getBoundingClientRect();

        // kiểm tra đã cuộn đến cuối phần scrollableDivRef chưa
        if (rect.top <= window.innerHeight + 300) {
          // kiểm tra xem đã fetch hết dữ liệu chưa
          if (quantityFetchedData.current < initialMovieConfig.length) {
            fetchMoreData();
            hasFetchedMoreData.current = true;
          } else {
            dispatch(setQuantityFetched(quantityFetchedData.current));
            dispatch(setFetchedMovieDataHomePage(true));

            // nếu đã fetch hết dữ liệu thì xóa sự kiện scroll
            window.removeEventListener("scroll", handleScroll);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    try {
      const fetchInitialData = async () => {
        const fetchPromises = initialMovieConfig
          .slice(0, quantitySectionMovie)
          .map((configItem) =>
            dispatch(
              fetchDataMovie({
                type: configItem.type,
                describe: configItem.describe,
              })
            )
          );

        setLoadingInitData(true);
        await Promise.all([...fetchPromises]);

        dispatch(setFetchedMovieDataHomePage(true));
      };

      if (!fetched) {
        fetchInitialData();
      }
    } catch (error) {
    } finally {
      setLoadingInitData(false);
    }
  }, [dispatch]);

  const fetchMoreData = async () => {
    try {
      const start = quantityFetchedData.current;
      const end = start + quantitySectionMovie;

      const fetchPromises = initialMovieConfig
        .slice(start, end)
        .map((configItem) =>
          dispatch(
            fetchDataMovie({
              type: configItem.type,
              describe: configItem.describe,
            })
          )
        );

      setLoadingMoreData(true);
      await Promise.all(fetchPromises);

      quantityFetchedData.current = end;
      hasFetchedMoreData.current = false;
    } catch (error) {
    } finally {
      setLoadingMoreData(false);
    }
  };

  // Lọc và hiển thị dữ liệu đã hoàn thành
  const finalData = initialMovieConfig
    // Lấy ra những data đã tải xong
    .filter(
      (configItem) => data[configItem.type] && !data[configItem.type].loading
    )
    .map((configItem) => ({
      index: configItem.index,
      title: configItem.title,
      link: `/chi-tiet/${configItem.describe}/${configItem.type}`,
      data: data[configItem.type],
      orientation: configItem.orientation,
    }))
    .sort((a, b) => a.index - b.index);

  if (finalData?.length === 0) return <Box className="min-h-screen" />;

  return (
    <Box>
      <Box className="overflow-hidden">
        <TopicCards />
      </Box>
      <Box className="overflow-hidden">
        <RootLayout>
          <EventContainer />
          <ContinueWatchingMovies />
        </RootLayout>
      </Box>

      {/*
        TỪ ĐÂY BẮT ĐẦU: Main content / bố cục trang chủ
        - Cấu trúc chính (thứ tự hiển thị):
          1) MovieTopicList: hiển thị 3 chủ đề/quốc gia đầu (finalData.slice(0,3))
          2) CommunityHighlights
          3) Một số MovieSection / TopMovieSection / MovieBanner ... sắp xếp theo các slice của finalData
             - MovieSection finalData.slice(3,4): 1 loại phim
             - TopMovieSection (top lists) hiển thị danh sách top theo type/describe
             - MovieSection finalData.slice(4,5)
             - MovieSection finalData.slice(5,8): 3 loại phim
             - MovieBanner: banner chuyên mục (ví dụ hoat-hinh)
             - MovieSection finalData.slice(8): phần còn lại
        - finalData được build từ initialMovieConfig (xem constants/movie.constant.ts),
      */}
      <RootLayout>
        <Box className="2xl:mx-0 -mx-4">
          <Box className="flex flex-col gap-12 overflow-hidden">
            <Box className="">
              {!loadingInitData ? (
                <>
                  <MovieTopicList
                    data={finalData?.slice(0, 3)?.map((item) => ({
                      title: item.title,
                      link: item.link,
                      items: item.data.items,
                    }))}
                  />
                  <Box className="my-12">
                    <CommunityHighlights />
                  </Box>
                  <Box className="xl:mt-4">
                    <MovieSection finalData={finalData.slice(3, 4)} />
                    <Box className="lg:my-12 my-4">
                      <TopMovieSection
                        describe="danh-sach"
                        type="phim-le"
                        limit={10}
                        title="Top 10 phim lẻ hôm nay"
                      />
                    </Box>
                    <MovieSection finalData={finalData.slice(4, 5)} />
                    <Box className="lg:my-12 my-4">
                      <TopMovieSection
                        describe="danh-sach"
                        type="phim-bo"
                        limit={10}
                        title="Top 10 phim bộ hôm nay"
                      />
                    </Box>

                    <MovieSection finalData={finalData.slice(5, 8)} />

                    <Box className="lg:my-12 mt-12 pb-6">
                      <MovieBanner
                        describe="danh-sach"
                        type="hoat-hinh"
                        title="Kho tàn anime mới nhất"
                      />
                    </Box>

                    <MovieSection finalData={finalData.slice(9)} />
                  </Box>
                </>
              ) : (
                <Box className="min-h-screen flex items-center justify-center">
                  <Loading type="bars" height="h-1/4" />
                </Box>
              )}
            </Box>
          </Box>
          {loadingMoreData && (
            <Box className="h-64 flex items-center justify-center">
              <Loading type="bars" height="h-1/2" />
            </Box>
          )}
          <Box className="h-1 mt-10" ref={scrollableDivRef} />
        </Box>
      </RootLayout>
    </Box>
  );
};

export default ClientWrapper;
