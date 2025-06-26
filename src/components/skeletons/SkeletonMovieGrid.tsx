"use client";

import { Box, Skeleton } from "@chakra-ui/react";

interface SkeletonMovieGridProps {
  limit?: number;
  classNameGrids?: string;
}

const SkeletonMovieGrid = ({
  limit = 24,
  classNameGrids,
}: SkeletonMovieGridProps) => {
  return (
    <div className={classNameGrids}>
      {[...Array(limit)].map((_, index) => (
        <div key={index}>
          <Box className="flex flex-col gap-2">
            <Box className="pb-[150%] h-0 relative">
              <Skeleton
                className="absolute inset-0 w-full h-full"
                rounded="lg"
              />
            </Box>
            <Skeleton width="90%" height="3" />
          </Box>
        </div>
      ))}
    </div>
  );
};

export default SkeletonMovieGrid;
