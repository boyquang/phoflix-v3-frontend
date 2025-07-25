"use client";

import { Box } from "@chakra-ui/react";
import AvatarBot from "./AvartarBot";

const LoadingSendQuestion = () => {
  return (
    <Box className="flex gap-2 mb-4 last:mb-0 items-start justify-start">
      <AvatarBot />
      <Box className="rounded-2xl p-2 bg-white text-black max-w-[75%]">
        <Box className="text-sm font-semibold text-gray-600">Bot</Box>
        <Box className="flex space-x-1 mt-1">
          <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
        </Box>
      </Box>
    </Box>
  );
};

export default LoadingSendQuestion;
