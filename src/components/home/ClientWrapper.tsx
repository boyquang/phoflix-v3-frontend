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
      <EventContainer />
      <RootLayout>
        <Box className="2xl:mx-0 -mx-4">
          <Box className="flex flex-col gap-12 overflow-hidden">
            <Box className="rounded-2xl bg-gradient-to-b from-[#282b3a] via-20% via-transparent">
              {!loadingInitData ? (
                <MovieSection finalData={finalData} />
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
