"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import SlideItem from "./SlideItem";
import { Box, Skeleton } from "@chakra-ui/react";
import Error from "../shared/Error";

const SlideShow = () => {
  const { items, loading, error } = useSelector(
    (state: RootState) => state.movie.slideShows
  );

  if (loading)
    return (
      <Box className="relative h-0 xl:pt-[42%] lg:pt-[44%] md:pt-[50%] pt-[80%]">
        <Skeleton
          className="w-full h-full absolute inset-0"
          loading
          rounded={0}
        />
      </Box>
    );

  if (error) return <Error />;

  return (
    <Swiper
      slidesPerView={10}
      modules={[Autoplay, EffectFade]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      grabCursor={true}
      effect="fade"
      loop={items.length > 1}
      className="w-full relative"
    >
      {items.map((item, index: number) => (
        <SwiperSlide key={index} className="h-full">
          <SlideItem item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SlideShow;
