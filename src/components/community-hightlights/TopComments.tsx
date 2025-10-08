"use client";

import { Box } from "@chakra-ui/react";
import SwiperContainer from "../shared/SwipperContainer";
import { SwiperSlide } from "swiper/react";
import { FaMedal } from "react-icons/fa";
import NotDataAvailable from "./NotDataAvailable";
import TopCommentItem from "./TopCommentItem";

interface TopCommentProps {
  comments: TTopComment[];
}

const TopComments = ({ comments }: TopCommentProps) => {
  return (
    <Box className="border-b border-[#fff2]">
      <Box className="xl:p-6 p-4">
        <Box className="">
          <Box className="flex items-center gap-2">
            <FaMedal className="text-primary" />
            <h4 className="xl:text-base text-sm uppercase text-white font-semibold">
              Top bình luận
            </h4>
          </Box>

          {!comments || comments?.length === 0 ? (
            <NotDataAvailable />
          ) : (
            <Box className="relative">
              <SwiperContainer
                showNavigation={false}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 8,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 8,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 8,
                  },
                  1280: {
                    slidesPerView: 4,
                    spaceBetween: 12,
                  },
                  1440: {
                    slidesPerView: 5,
                    spaceBetween: 16,
                  },
                  1920: {
                    slidesPerView: 6,
                    spaceBetween: 18,
                  },
                }}
              >
                {comments?.map((comment, index) => (
                  <SwiperSlide key={index}>
                    <TopCommentItem comment={comment} />
                  </SwiperSlide>
                ))}
              </SwiperContainer>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TopComments;
