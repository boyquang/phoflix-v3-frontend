"use client";

import { topicBackGround } from "@/constants/color";
import { Box } from "@chakra-ui/react";

interface TopicBackgroundProps {
  slug?: string;
}

const TopicBackground = ({ slug }: TopicBackgroundProps) => {
  return (
    <Box
      className={`absolute top-0 left-0 right-0 h-[50vh] opacity-30 z-[1] bg-cover bg-center bg-no-repeat pointer-events-none ${
        topicBackGround[slug as keyof typeof topicBackGround] ??
        "bg-transparent"
      }`}
      style={{
        maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 60%, transparent 100%)",
      }}
    />
  );
};

export default TopicBackground;
