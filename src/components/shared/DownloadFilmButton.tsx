"use client";

import DownloadFilmDialog from "@/components/shared/DownloadFilmDialog";
import { Box } from "@chakra-ui/react";
import { IoMdDownload } from "react-icons/io";

interface ShareButtonProps {
  placement?: "vertical" | "horizontal";
  responsiveText?: boolean;
}

const DownloadFilmButton = ({
  placement = "horizontal",
  responsiveText = false,
}: ShareButtonProps) => {
  return (
    <DownloadFilmDialog
      trigger={
        <Box
          className={`p-2 select-none lg:flex hidden sm:min-w-16 cursor-pointer rounded-lg justify-center items-center gap-2 text-gray-50 transition-all hover:bg-[#ffffff05] ${
            placement === "vertical" ? "flex-col" : "flex-row"
          }`}
        >
          <IoMdDownload />
          <span
            className={`text-xs whitespace-nowrap ${
              !responsiveText ? "block" : "hidden xs:block"
            }`}
          >
            Tải xuống
          </span>
        </Box>
      }
    />
  );
};

export default DownloadFilmButton;
