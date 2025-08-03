"use client";

import { Box } from "@chakra-ui/react";
import SkeletonMovieGrid from "./SkeletonMovieGrid";
import RootLayout from "../layout/RootLayout";
import TopicBackground from "../shared/TopicBackground";

interface SkeletonDetailPageProps {
  slug?: string;
}

const SkeletonDetailPage = ({ slug }: SkeletonDetailPageProps) => {
  return (
    <Box className="relative">
      <TopicBackground slug={slug} />
      <RootLayout>
        <Box className="lg:pt-28 pt-24">
          <h3 className="blink inline-block xl:text-3xl lg:text-2xl text-xl text-gradient-primary font-bold">
            Đang tải danh sách phim...
          </h3>
          <Box className="mt-12">
            <SkeletonMovieGrid
              limit={24}
              classNameGrids="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 lg:gap-x-4 gap-x-2 gap-y-6"
            />
          </Box>
        </Box>
      </RootLayout>
    </Box>
  );
};

export default SkeletonDetailPage;
