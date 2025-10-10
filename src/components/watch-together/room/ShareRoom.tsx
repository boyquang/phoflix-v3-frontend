"use client";

import { Box } from "@chakra-ui/react";
import { FaLink } from "react-icons/fa6";

interface ShareRoomProps {
  placement?: "vertical" | "horizontal";
  responsiveText?: boolean;
}

const ShareRoom = ({
  placement = "horizontal",
  responsiveText = false,
}: ShareRoomProps) => {
  return (
    <Box
      className={`p-2 select-none sm:min-w-16 cursor-pointer rounded-lg flex justify-center items-center gap-2 text-gray-50 transition-all hover:bg-[#ffffff05] ${
        placement === "vertical" ? "flex-col" : "flex-row"
      }`}
    >
      <FaLink />
      <span
        className={`xs:text-xs text-[10px] whitespace-nowrap ${
          !responsiveText ? "block" : "hidden xs:block"
        }`}
      >
        Chia sẻ
      </span>
    </Box>
  );
};

export default ShareRoom;
