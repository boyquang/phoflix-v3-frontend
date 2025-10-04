"use client";

import { checkIsTodayAnEvent, getUpcomingEvent } from "@/lib/utils";
import { Box } from "@chakra-ui/react";
import RootLayout from "../layout/RootLayout";
import { useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataMovieEvent } from "@/store/async-thunks/movie.thunk";
import { PiCalendarStarFill } from "react-icons/pi";
import { MdCelebration } from "react-icons/md";
import MovieSwiper from "@/components/shared/MovieSwiper";
import { getEventList } from "@/lib/actions/event.action";
import { eventConfig } from "@/configs/event.config";
import { setFetchedMovieEvent } from "@/store/slices/movie.slice";
import MarkdownViewer from "../shared/MarkdownViewer";
import CollapseElement from "../shared/CollapseElement";

const EventContainer = () => {
  const [event, setEvent] = useState<EventData | null>(null);
  const [isTodayAnEvent, setIsTodayAnEvent] = useState(false);
  const { items, error, fetched } = useSelector(
    (state: RootState) => state.movie.movieEvent
  );
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const elementScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await getEventList();

      if (response?.status && response?.result?.length > 0) {
        setIsTodayAnEvent(checkIsTodayAnEvent(response.result));
        setEvent(getUpcomingEvent(response.result, 7));
      } else {
        setIsTodayAnEvent(checkIsTodayAnEvent(eventConfig));
        setEvent(getUpcomingEvent(eventConfig, 7));
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const handleFetchData = async () => {
      setLoading(true);
      await dispatch(
        fetchDataMovieEvent({
          category: event?.category as Categories,
          country: event?.country as Countries,
          limit: 12,
        })
      );
      setLoading(false);
      dispatch(setFetchedMovieEvent(true));
    };

    if (event && !fetched) {
      handleFetchData();
    }
  }, [event]);

  if (!event) return null;

  return (
    <Box
      className="mb-12 relative rounded-xl overflow-hidden text-white"
      ref={elementScrollRef}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-orange-500 via-yellow-400 via-green-500 via-blue-500 via-indigo-500 to-purple-500" />

      <div className="absolute inset-0 bg-black/20 backdrop-blur-xl" />

      <Box className="relative z-10 flex flex-col gap-4 lg:p-10 md:p-8 p-5 text-center">
        <Box className="flex flex-col items-center gap-2">
          <Box className="animate-pulse flex items-center capitalize italic justify-center gap-1 text-white text-base md:text-xl lg:text-3xl font-semibold">
            <div className="xs:inline-block hidden">
              {isTodayAnEvent ? <MdCelebration /> : <PiCalendarStarFill />}
            </div>
            {isTodayAnEvent ? event?.name : "Sắp tới có sự kiện gì thế?"}
          </Box>
        </Box>

        <CollapseElement
          maxHeight={500}
          positionButton="right"
          elementScrollRef={elementScrollRef}
        >
          <MarkdownViewer content={event?.description} />
        </CollapseElement>

        {items?.length > 0 && (
          <Box className="mt-4 text-left">
            <h4 className="text-gray-50 mb-2 lg:text-2xl md:text-xl text-lg font-semibold">
              Có thể bạn sẽ muốn xem
            </h4>
            <MovieSwiper
              items={items}
              loading={loading}
              error={error}
              orientation="horizontal"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EventContainer;
