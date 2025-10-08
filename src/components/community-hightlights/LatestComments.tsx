"use client";

import { Box } from "@chakra-ui/react";
import { AiFillThunderbolt } from "react-icons/ai";
import SwiperContainer from "../shared/SwipperContainer";
import { SwiperSlide } from "swiper/react";
import NotDataAvailable from "./NotDataAvailable";
import LatestCommentItem from "./LatestCommentItem";

interface LatestCommentsProps {
  comments: TLatestComment[];
}

const LatestComments = ({ comments }: LatestCommentsProps) => {
  return (
    <Box className="p-6 flex-1 xl:block hidden overflow-hidden">
      <Box className="flex items-center gap-2 mb-4">
        <Box className="text-primary">
          <AiFillThunderbolt />
        </Box>
        <h4 className="xl:text-base text-sm uppercase text-white font-semibold">
          Bình luận mới
        </h4>
      </Box>

      {!comments || comments?.length === 0 ? (
        <NotDataAvailable />
      ) : (
        <Box className="relative ">
          <SwiperContainer
            isMovieSlider={false}
            className="max-h-[330px]"
            direction="vertical"
            showNavigation={false}
            slidesPerView="auto"
            autoHeight={false}
            spaceBetween={8}
          >
            {comments?.map((comment, index) => (
              <SwiperSlide key={index}>
                <LatestCommentItem comment={comment} />
              </SwiperSlide>
            ))}
          </SwiperContainer>
        </Box>
      )}
    </Box>
  );
};

export default LatestComments;
