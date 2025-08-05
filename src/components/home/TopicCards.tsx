"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { categories, countries } from "@/constants/movie.contant";
import { Box } from "@chakra-ui/react";
import Link from "next/link";
import RootLayout from "../layout/RootLayout";
import { MdChevronRight } from "react-icons/md";
import { colorGradients } from "@/constants/color.contant";

const TopicCards = () => {
  const totalItems = [...categories, ...countries].length;
  const totalShow = 6;

  return (
    <RootLayout>
      <Box className="relative my-12 lg:px-0">
        <h4 className="inline-block font-semibold text-gradient-primary lg:text-2xl md:text-xl text-md mb-4">
          Bạn đang quan tâm gì?
        </h4>
        <Box className="relative topic-cards">
          <Swiper
            grabCursor={true}
            speed={500}
            touchRatio={1.5}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 8,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 8,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 12,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 16,
              },
              1440: {
                slidesPerView: 6,
                spaceBetween: 18,
              },
              1920: {
                slidesPerView: 7,
                spaceBetween: 20,
              },
            }}
          >
            {categories.slice(0, totalShow).map((category, index) => (
              <SwiperSlide key={index} className="relative">
                <Box
                  className={`bg-gradient-to-r ${
                    colorGradients[index % colorGradients.length]
                  }  rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-300`}
                >
                  <Link
                    className="flex flex-col justify-center gap-2 lg:min-h-32 min-h-28 p-4 text-gray-50"
                    href={`/chi-tiet/the-loai/${category.slug}`}
                  >
                    <h4 className="text-lg">{category.name}</h4>
                    <Box className="flex items-center gap-1">
                      <span className="text-sm">Xem chi tiết</span>
                      <MdChevronRight />
                    </Box>
                  </Link>
                </Box>
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <Box className="bg-[#ffffff0d] border border-[#ffffff10] rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-300 shadow-lg">
                <Link
                  className="flex flex-col justify-center gap-2 lg:min-h-32 min-h-28 p-4 text-white"
                  href="/kham-pha"
                >
                  <h4 className="text-lg">Khám phá</h4>
                  <Box className="flex items-center gap-1">
                    <span className="text-sm">Xem tất cả</span>
                    <MdChevronRight />
                  </Box>
                </Link>
              </Box>
            </SwiperSlide>
          </Swiper>
        </Box>
      </Box>
    </RootLayout>
  );
};

export default TopicCards;
