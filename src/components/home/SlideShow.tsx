"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import SlideItem from "./SlideItem";
import { useState, useRef } from "react";
import Image from "@/components/shared/Image";
import { generateUrlImage } from "@/lib/utils";

interface SlideShowProps {
  items: Movie[];
}

const SlideShow = ({ items }: SlideShowProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  return (
    <div className="w-full relative">
      <Swiper
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActiveIndex(s.realIndex ?? s.activeIndex ?? 0)}
        slidesPerView={1}
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

      <div
        aria-hidden={items.length === 0}
        className="pointer-events-auto absolute 2xl:py-16 p-4 lg:right-4 right-0 bottom-4 z-50 flex gap-2 lg:items-end items-center lg:w-auto w-full lg:justify-baseline justify-center"
      >
        <div className="flex gap-2 bg-transparent p-1 rounded-md">
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                const s = swiperRef.current;
                if (s && typeof s.slideTo === "function") {
                  s.slideToLoop(idx);
                }
              }}
              className={`lg:w-16 lg:h-11 cursor-pointer hover:border-white hover:shadow-[0_0_0_3px_rgba(255,255,255,0.06)] w-7 h-7 lg:rounded-md rounded-full overflow-hidden relative border-2 transition-all duration-200 ${
                activeIndex === idx
                  ? "border-white shadow-[0_0_0_3px_rgba(255,255,255,0.06)]"
                  : "border-transparent opacity-80 hover:opacity-100"
              }`}
              aria-label={`Thumbnail ${idx + 1}`}
              title={item?.name}
              type="button"
            >
              <Image
                src={generateUrlImage(item?.thumb_url)}
                alt={item?.name || `Thumb ${idx + 1}`}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideShow;
