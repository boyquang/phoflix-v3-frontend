"use client";

import { SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import Error from "../shared/Error";
import Loading from "@/app/loading";
import SwiperContainer from "./SwipperContainer";

interface MovieThumbProps {
  items: Movie[];
  loading: boolean;
  error: boolean;
  orientation: "horizontal" | "vertical";
  showNavigation?: boolean;
  breakpoints?: {
    [key: number]: {
      slidesPerView: number;
      spaceBetween: number;
    };
  };
}

const MovieSwiper = ({
  items,
  loading,
  error,
  orientation,
  breakpoints,
  showNavigation = true,
}: MovieThumbProps) => {
  if (loading) return <Loading height="h-36" />;
  if (error || !items || items?.length === 0) return <Error />;

  return (
    <SwiperContainer
      showNavigation={showNavigation}
      keyRefresh={orientation}
      breakpoints={
        breakpoints || {
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
            slidesPerView: orientation === "horizontal" ? 6 : 7,
            spaceBetween: 18,
          },
        }
      }
    >
      {items?.map((item, index: number) => (
        <SwiperSlide key={index} className="relative">
          <MovieCard data={item} orientation={orientation} />
        </SwiperSlide>
      ))}
    </SwiperContainer>
  );
};

export default MovieSwiper;
