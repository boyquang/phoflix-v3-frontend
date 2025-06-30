"use client";

import { Box } from "@chakra-ui/react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="max-w-[1900px] mx-auto 2xl:px-12 px-4">{children}</Box>
  );
};

export default RootLayout;
