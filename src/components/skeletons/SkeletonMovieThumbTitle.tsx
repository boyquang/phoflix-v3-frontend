"use client";

import { Box } from "@chakra-ui/react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonMovieThumbTitle = () => {
  return (
    <Box className="flex justify-between items-center gap-2 mb-8">
      <Skeleton className="h-6  lg:w-72 w-32" />
      <Skeleton className="h-4  lg:w-28 w-16" />
    </Box>
  );
};

export default SkeletonMovieThumbTitle;
