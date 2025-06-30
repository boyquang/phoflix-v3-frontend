"use client";

import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import SlideShow from "@/components/home/SlideShow";
import { useEffect, useRef, useState } from "react";
import {
  fetchDataMovie,
  fetchDataSlideShow,
} from "@/store/asyncThunks/movieAsyncThunk";
import { initialMovieConfig, quantitySectionMovie } from "@/constants/movie";
import TopicCards from "@/components/home/TopicCards";
import EventContainer from "@/components/event/EventContainer";
import RootLayout from "@/components/layouts/RootLayout";
import Loading from "@/app/loading";
import MovieSection from "@/components/shared/MovieSection";
import { setFetchedMovieDataHomePage } from "@/store/slices/movieSlice";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, fetched } = useSelector(
    (state: RootState) => state.movie.movieData
  );
  const scrollableDivRef = useRef<HTMLDivElement | null>(null);
  const hasFetchedMoreData = useRef(false);
  const quantityFetchedData = useRef(quantitySectionMovie);
  const [loadingMoreData, setLoadingMoreData] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // kiểm tra đã fetch dữ liệu chưa
      if (scrollableDivRef.current && !hasFetchedMoreData.current) {
        const rect = scrollableDivRef.current.getBoundingClientRect();

        // kiểm tra đã cuộn đến cuối phần scrollableDivRef chưa
        if (rect.top <= window.innerHeight + 100) {
          // kiểm tra xem đã fetch hết dữ liệu chưa
          if (quantityFetchedData.current < initialMovieConfig.length) {
            fetchMoreData();
            hasFetchedMoreData.current = true;
          } else {
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

      await Promise.all([dispatch(fetchDataSlideShow()), ...fetchPromises]);

      dispatch(setFetchedMovieDataHomePage(true));
    };

    if (!fetched) {
      fetchInitialData();
    }
  }, [dispatch]);

  const fetchMoreData = async () => {
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
    setLoadingMoreData(false);

    quantityFetchedData.current = end;
    hasFetchedMoreData.current = false;
  };

  // Lọc và hiển thị dữ liệu đã hoàn thành
  const finalData = initialMovieConfig
    .filter((configItem) => data[configItem.type])
    .map((configItem) => ({
      title: configItem.title,
      link: `/chi-tiet/${configItem.describe}/${configItem.type}`,
      data: data[configItem.type],
      orientation: configItem.orientation,
    }));

  if (finalData?.length === 0) return <Box className="min-h-screen" />;

  return (
    <Box>
      <SlideShow />
      <Box className="overflow-hidden">
        <TopicCards />
      </Box>
      <EventContainer />
      <RootLayout>
        <Box className="2xl:mx-0 -mx-4">
          <Box className="flex flex-col gap-12 overflow-hidden">
            <Box className="rounded-2xl bg-gradient-to-b from-[#282b3a] via-20% via-transparent">
              <MovieSection finalData={finalData} />
            </Box>
          </Box>
          <Box className="h-1 mt-10" ref={scrollableDivRef} />
          {loadingMoreData && (
            <Box className="h-64 flex items-center justify-center">
              <Loading type="bars" height="h-1/2" />
            </Box>
          )}
        </Box>
      </RootLayout>
    </Box>
  );
};

export default Home;
