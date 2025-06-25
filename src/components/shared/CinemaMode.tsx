"use client";

import { Box } from "@chakra-ui/react";
import { useState } from "react";

const CinemaMode = () => {
  const [isCinemaMode, setIsCinemaMode] = useState(false);

  const handleToggleCinemaMode = () => {
    setIsCinemaMode((prev) => !prev);
    if (isCinemaMode) {
      document.body.classList.remove("cinema-mode");
    } else {
      document.body.classList.add("cinema-mode");
    }
  };

  return (
    <Box
      onClick={handleToggleCinemaMode}
      className="p-2 select-none sm:min-w-16 cursor-pointer rounded-lg flex justify-center items-center gap-2 transition-all hover:bg-[#ffffff05]"
    >
      <span className="xs:text-xs text-[10px] whitespace-nowrap text-gray-50">
        Rạp phim
      </span>
      <span
        className={`text-[10px] px-1 h-5 flex items-center justify-center rounded-sm border bg-transparent whitespace-nowrap
        ${
          isCinemaMode
            ? "border-[#ffd875] text-[#ffd875]"
            : "border-gray-100 text-gray-100"
        }
        `}
      >
        {isCinemaMode ? "ON" : "OFF"}
      </span>
    </Box>
  );
};

export default CinemaMode;
