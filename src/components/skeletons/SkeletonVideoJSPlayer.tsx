"use client";

import { Box, Skeleton } from "@chakra-ui/react";

const SkeletonVideoJsPlayer = () => {
  return (
    <Box className="flex flex-col gap-4">
      <Skeleton className="w-full h-6 rounded-lg" />
      <Box className=" xs:-mx-0 -mx-4">
        <Box className="relative h-0 pt-[36%]">
          <Skeleton className="absolute inset-0 w-full h-full xs:rounded-t-2xl rounded-t-none rounded-b-none" />
        </Box>
        <Box className="gap-2 p-4 bg-[#08080a] flex items-center xs:rounded-b-2xl rounded-b-none rounded-t-none">
          <Skeleton className="min-w-16" height="5" />
          <Skeleton className="min-w-16" height="5" />
        </Box>
      </Box>
    </Box>
  );
};

export default SkeletonVideoJsPlayer;
