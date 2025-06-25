"use client";

import { Box, HStack, Separator } from "@chakra-ui/react";

interface DividerProps {
  children: React.ReactNode;
  orientation?: "center" | "left" | "right";
}

const Divider = ({ children, orientation = "center" }: DividerProps) => {
  return (
    <HStack>
      {orientation === "center" && (
        <>
          <Separator className="border-[#ffffff10] border-[1.5px] xs:block hidden" flex="1" />
          <Box className="flex-flex-shink-0">{children}</Box>
          <Separator className="border-[#ffffff10] border-[1.5px] xs:block hidden" flex="1" />
        </>
      )}
      {orientation === "left" && (
        <>
          <Box className="flex-flex-shink-0">{children}</Box>
          <Separator className="border-[#ffffff10] border-[1.5px] xs:block hidden" flex="1" />
        </>
      )}
      {orientation === "right" && (
        <>
          <Separator className="border-[#ffffff10] border-[1.5px] xs:block hidden" flex="1" />
          <Box className="flex-flex-shink-0">{children}</Box>
        </>
      )}
    </HStack>
  );
};

export default Divider;
