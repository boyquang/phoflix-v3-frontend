"use client";

import { Box } from "@chakra-ui/react";

interface RootLayoutProps {
  children: React.ReactNode;
  maxWidth?: MaxWidth;
}

const RootLayout = ({
  children,
  maxWidth = "max-w-[1900px]",
}: RootLayoutProps) => {
  return <Box className={`${maxWidth} mx-auto 2xl:px-12 px-4`}>{children}</Box>;
};

export default RootLayout;
