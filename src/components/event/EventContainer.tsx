"use client";

import { checkIsTodayAnEvent, getUpcomingEvent } from "@/lib/utils";
import { Box } from "@chakra-ui/react";
import RootLayout from "../layout/RootLayout";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  Describe,
  fetchDataMovieEvent,
} from "@/store/asyncThunks/movieAsyncThunk";
import ShowMoreText from "../shared/ShowMoreText";
import { PiCalendarStarFill } from "react-icons/pi";
import { MdCelebration } from "react-icons/md";
import MovieSwiper from "@/components/shared/MovieSwiper";

const EventContainer = () => {
  const event = getUpcomingEvent(7);
  const isTodayAnEvent = checkIsTodayAnEvent();
  const { items, error } = useSelector(
    (state: RootState) => state.movie.movieEvent
  );
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleFetchData = async () => {
      setLoading(true);
      await dispatch(
        fetchDataMovieEvent({
          slug: event?.slug as string,
          describe: event?.describe as Describe,
          country: event?.country as "viet-nam",
          limit: 12,
        })
      );
      setLoading(false);
    };

    if (event) {
      handleFetchData();
    }
  }, [event]);

  if (!event) return null;

  return (
    <RootLayout>
      <Box className="mb-12 relative rounded-xl overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-orange-500 via-yellow-400 via-green-500 via-blue-500 via-indigo-500 to-purple-500" />

        <div className="absolute inset-0 bg-black/20 backdrop-blur-xl" />

        <Box className="relative z-10 flex flex-col gap-6 lg:p-10 md:p-8 p-5 text-center">
          <Box className="flex flex-col items-center gap-2">
            <Box className="flex items-center justify-center gap-2 text-white text-xl md:text-3xl font-semibold">
              {isTodayAnEvent ? <MdCelebration /> : <PiCalendarStarFill />}
              {isTodayAnEvent
                ? `Hôm nay là ngày ${event?.name} - ${event?.date}`
                : "Sắp tới có sự kiện gì thế?"}
            </Box>
          </Box>

          <ShowMoreText
            text={event?.description}
            row={8}
            className="text-white text-sm md:text-base text-justify"
          />
          <Box className="mt-4 text-left">
            <h4 className="text-gray-50 mb-3 lg:text-2xl md:text-xl text-lg font-semibold">
              Có thể bạn sẽ muốn xem
            </h4>
            <MovieSwiper
              items={items}
              loading={loading}
              error={error}
              orientation="horizontal"
            />
          </Box>
        </Box>
      </Box>
    </RootLayout>
  );
};

export default EventContainer;
