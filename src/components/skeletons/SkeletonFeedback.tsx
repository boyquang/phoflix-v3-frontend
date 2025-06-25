"use client";

import { Box, HStack, Skeleton, Stack } from "@chakra-ui/react";
import { SkeletonCircle } from "@/components/ui/skeleton";

const SkeletonFeedback = () => {
  return (
    <Box className={`flex gap-4 flex-col mt-4 sm:ml-0 ml-[-56px]`}>
      {[...Array(3)].map((_, index) => (
        <HStack gap="4" key={index}>
          <SkeletonCircle size="10" />
          <Stack flex="1">
            <Skeleton height="3" width="120px" />
            <Skeleton height="3" width="160px" />
          </Stack>
        </HStack>
      ))}
    </Box>
  );
};

export default SkeletonFeedback;
