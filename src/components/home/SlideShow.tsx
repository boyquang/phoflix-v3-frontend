"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import SlideItem from "./SlideItem";

interface SlideShowProps {
  items: Movie[];
}

const SlideShow = ({ items }: SlideShowProps) => {
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
