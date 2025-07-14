"use client";

import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box } from "@chakra-ui/react";

interface SkeletonMovieThumbProps {
  orientation: "horizontal" | "vertical";
}

const SkeletonMovieThumb = ({ orientation }: SkeletonMovieThumbProps) => {
  return (
    <Swiper
      className="movie-slider"
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
      {[...Array(10)].map((_, index) => (
        <SwiperSlide key={index} className="relative pt-4">
          <Box
            className={`h-0 relative ${
              orientation === "horizontal" ? "pb-[62%]" : "pb-[150%]"
            }`}
          >
            <div className="absolute inset-0 w-full h-full rounded-lg bg-gray-300 animate-pulse" />
          </Box>
          <div className="mt-2 h-3 w-full bg-gray-300 rounded animate-pulse" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SkeletonMovieThumb;
