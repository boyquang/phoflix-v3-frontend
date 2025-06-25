"use client";

import { Box, Skeleton } from "@chakra-ui/react";

const SkeleTonTopSearchTrending = () => {
  return (
    <Box className="grid grid-cols-6 items-center gap-2 mt-4">
      {[...Array(6)].map((_, index) => (
        <Skeleton key={index} className="h-6" />
      ))}
    </Box>
  );
};

export default SkeleTonTopSearchTrending;
