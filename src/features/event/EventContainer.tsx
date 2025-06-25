"use client";

import { checkIsTodayAnEvent, getUpcomingEvent } from "@/lib/utils";
import { Box } from "@chakra-ui/react";
import RootLayout from "../../components/layouts/RootLayout";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  Describe,
  fetchDataMovieEvent,
} from "@/store/asyncThunks/movieAsyncThunk";
import ShowMoreText from "../../components/shared/ShowMoreText";
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
      <Box className="my-12 bg-[#ffffff2f] rounded-xl overflow-hidden flex flex-col gap-2 lg:p-8 p-4 text-gray-100">
        <Box className="flex items-center gap-1 lg:text-3xl md:text-2xl text-xl text-primary">
          {isTodayAnEvent ? <MdCelebration /> : <PiCalendarStarFill />}
          <h4 className="inline-block">
            {isTodayAnEvent
              ? `Hôm nay là ngày ${event?.name} - ${event?.date}`
              : "Sắp tới có sự kiện gì thế?"}
          </h4>
        </Box>
        <ShowMoreText
          text={event?.description}
          row={10}
          className="text-gray-300 text-sm text-justify"
        />
        <Box className="mt-4">
          <h4 className="text-gray-50 mb-2 lg:text-2xl md:text-xl text-md">
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
    </RootLayout>
  );
};

export default EventContainer;
