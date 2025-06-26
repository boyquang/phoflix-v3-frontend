"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import MovieCard from "./MovieCard";
import SkeletonMovieThumb from "@/components/skeletons/SkeletonMovieThumb";
import Error from "../shared/Error";
import { Box } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/navigation";

interface MovieThumbProps {
  items: any;
  loading: boolean;
  error: boolean;
  orientation: "horizontal" | "vertical";
}

const MovieSwiper = ({
  items,
  loading,
  error,
  orientation,
}: MovieThumbProps) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  if (loading) return <SkeletonMovieThumb orientation={orientation} />;
  if (error) return <Error />;

  return (
    <Box className="relative movie-slider">
      <Box
        ref={prevRef}
        className={`absolute -left-5 top-1/2 z-10 -translate-y-1/2 cursor-pointer 
        bg-gray-50 bg-opacity-40 hover:bg-opacity-70 text-gray-900 rounded-full 
          w-10 h-10 lg:flex hidden items-center justify-center 
          transition-opacity duration-200 ${
            isBeginning ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
      >
        <FaChevronLeft />
      </Box>

      <Box
        ref={nextRef}
        className={`absolute -right-5 top-1/2 z-10 -translate-y-1/2 cursor-pointer 
        bg-gray-50 bg-opacity-40 hover:bg-opacity-70 text-gray-900 rounded-full 
        w-10 h-10 lg:flex hidden items-center justify-center 
        transition-opacity duration-200 ${
          isEnd ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <FaChevronRight />
      </Box>

      <Swiper
        onSwiper={handleSlideChange}
        onSlideChange={handleSlideChange}
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          const navigation = swiper.params.navigation as {
            prevEl?: HTMLElement | null;
            nextEl?: HTMLElement | null;
          };

          navigation.prevEl = prevRef.current;
          navigation.nextEl = nextRef.current;
        }}
        breakpoints={{
          320: {
            slidesPerView: orientation === "horizontal" ? 2 : 3,
            spaceBetween: 8,
          },
          768: {
            slidesPerView: orientation === "horizontal" ? 3 : 4,
            spaceBetween: 8,
          },
          1024: {
            slidesPerView: orientation === "horizontal" ? 3 : 4,
            spaceBetween: 8,
          },
          1280: {
            slidesPerView: orientation === "horizontal" ? 4 : 5,
            spaceBetween: 12,
          },
          1440: {
            slidesPerView: orientation === "horizontal" ? 5 : 6,
            spaceBetween: 16,
          },
          1920: {
            slidesPerView: orientation === "horizontal" ? 6 : 8,
            spaceBetween: 18,
          },
        }}
      >
        {items?.map((item: any, index: number) => (
          <SwiperSlide key={index} className="relative">
            <MovieCard data={item} orientation={orientation} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default MovieSwiper;
