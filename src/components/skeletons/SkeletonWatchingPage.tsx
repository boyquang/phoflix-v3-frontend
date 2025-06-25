"use client";

import { Box } from "@chakra-ui/react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonWachingPage = () => {
  return (
    <Box className="flex flex-col gap-12 max-w-[1620px] mx-auto 2xl:px-12 px-4">
      <Box className="lg:mt-32 mt-24 flex flex-col gap-6">
        <Box>
          <Skeleton width="50%" height="6" className="sm:block hidden" />
        </Box>
        <Box className="flex flex-col xs:-mx-0 -mx-4">
          <Box className="relative h-0 lg:pt-[20%] md:pt-[40%] pt-[56%]">
            <Skeleton
              className="absolute inset-0 xs:rounded-t-2xl rounded-t-none rounded-b-none"
              width="100%"
              height="100%"
            />
          </Box>
          <Box className="p-4 bg-[#08080a] flex justify-between flex-wrap gap-2 items-center xs:rounded-b-2xl rounded-b-none rounded-t-none">
            <Box className="flex gap-4 items-center">
              <Skeleton className="sm:min-w-16 min-w-7" height="5" />
              <Skeleton className="sm:min-w-16 min-w-7" height="5" />
              <Skeleton className="sm:min-w-16 min-w-7" height="5" />
              <Skeleton className="sm:min-w-16 min-w-7" height="5" />
              <Skeleton className="sm:min-w-16 min-w-7" height="5" />
              <Skeleton className="sm:min-w-16 min-w-7" height="5" />
            </Box>
            <Skeleton className="min-w-16" height="5" />
          </Box>
        </Box>

        <Box className="flex gap-6 lg:flex-row flex-col pb-12">
          <Box className="flex-1">
            <Box className="flex gap-4 w-full">
              <Box className="w-28 flex-shrink-0 sm:block hidden">
                <Box className="relative h-0 pt-[150%]">
                  <Skeleton
                    className="absolute inset-0 rounded-xl"
                    width="100%"
                    height="100%"
                  />
                </Box>
              </Box>
              <Box className="flex flex-col gap-2 w-full">
                <Skeleton width="80%" height="5" />
                <Skeleton width="50%" height="3" />
                <Box className="flex gap-2 mt-2 flex-wrap">
                  {[...Array(6)].map((_, index) => (
                    <Skeleton key={index} width="64px" height="5" />
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="xl:flex-2 flex-1">
            <Box className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-6 gap-2 w-full">
              {[...Array(16)].map((_, index) => (
                <Skeleton key={index} className="w-full h-12" />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SkeletonWachingPage;
