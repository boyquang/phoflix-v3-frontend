"use client";

import { useRef, useState } from "react";
import { Swiper } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Box } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { SwiperOptions } from "swiper/types";

interface SwiperContainerProps extends SwiperOptions {
  children: React.ReactNode;
  keyRefresh?: string;
  showNavigation?: boolean;
  theme?: "while" | "transparent";
  className?: string;
  isMovieSlider?: boolean;
  breakpoints?: {
    [key: number]: {
      spaceBetween: number;
      slidesPerView: number;
    };
  };
}

interface HandleSlideChangeParams {
  isBeginning: boolean;
  isEnd: boolean;
}

const themes = {
  while: "bg-gray-50 text-gray-900",
  transparent: "bg-transparent border border-[#fff3] text-gray-50 bg-[#191B24]",
};

const SwiperContainer = ({
  children, 
  keyRefresh,
  showNavigation = true,
  theme = "while",
  className,
  breakpoints,
  isMovieSlider = true,
  ...props
}: SwiperContainerProps) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper: HandleSlideChangeParams) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <Box className={`relative ${isMovieSlider ? "movie-slider" : ""}`}>
      {showNavigation && (
        <>
          <Box
            ref={prevRef}
            className={`absolute -left-5 top-1/2 z-10 -translate-y-1/2 cursor-pointer 
              ${themes[theme]} rounded-full w-10 h-10 lg:flex hidden items-center justify-center 
                transition-opacity duration-200 ${
                  isBeginning ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
          >
            <FaChevronLeft />
          </Box>

          <Box
            ref={nextRef}
            className={`absolute -right-5 top-1/2 z-10 -translate-y-1/2 cursor-pointer 
              ${themes[theme]} rounded-full
              bg-opacity-40 hover:bg-opacity-70  
              w-10 h-10 lg:flex hidden items-center justify-center 
              transition-opacity duration-200 ${
                isEnd ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
          >
            <FaChevronRight />
          </Box>
        </>
      )}

      <Swiper
        className={className}
        onSwiper={handleSlideChange}
        onSlideChange={handleSlideChange}
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        breakpoints={breakpoints || {}}
        grabCursor={true}
        speed={500}
        touchRatio={1.5}
        lazyPreloadPrevNext={1}
        onBeforeInit={(swiper) => {
          const navigation = swiper.params.navigation as {
            prevEl?: HTMLElement | null;
            nextEl?: HTMLElement | null;
          };

          navigation.prevEl = prevRef.current;
          navigation.nextEl = nextRef.current;
        }}
        key={keyRefresh || "default"}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        {...props}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default SwiperContainer;
