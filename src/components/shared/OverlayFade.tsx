"use client";

import { Box } from "@chakra-ui/react";

const OverlayFade = () => {
  return (
    <>
      <Box className="bg-gradient-to-t h-1/2 absolute z-[1] bottom-0 from-[#191b24] inset-x-0 to-transparent pointer-events-none" />
      <Box className="bg-gradient-to-b h-1/2 absolute z-[1] top-0 from-[#191b24] inset-x-0 to-transparent pointer-events-none" />
      <Box className="bg-gradient-to-r lg:w-1/3 w-1/5 h-full absolute z-[1] left-0 from-[#191b24] inset-y-0 to-transparent pointer-events-none" />
      <Box className="bg-gradient-to-l lg:w-1/3 h-full w-1/5 absolute z-[1] right-0 from-[#191b24] inset-y-0 to-transparent pointer-events-none" />
    </>
  );
};

export default OverlayFade;
