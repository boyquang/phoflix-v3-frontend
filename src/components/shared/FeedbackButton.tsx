"use client";

import { scrollToElement } from "@/lib/utils";
import { Box } from "@chakra-ui/react";
import { TbMessageFilled } from "react-icons/tb";

interface FeedbackButtonProps {
  placement?: "vertical" | "horizontal";
  responsiveText?: boolean;
}

const FeedbackButton = ({
  placement = "horizontal",
  responsiveText = false,
}: FeedbackButtonProps) => {
  return (
    <Box
      onClick={() => {
        scrollToElement({
          name: "feedback-section",
          type: "class",
          ms: 200,
        });
      }}
      className={`p-2 select-none sm:min-w-16 cursor-pointer rounded-lg text-gray-50 xs:flex hidden justify-center items-center gap-2 transition-all hover:bg-[#ffffff05] 
          ${placement === "vertical" ? "flex-col" : "flex-row"}`}
    >
      <TbMessageFilled />
      <span
        className={`xs:text-xs text-[10px] whitespace-nowrap ${
          !responsiveText ? "block" : "hidden xs:block"
        }`}
      >
        Bình luận
      </span>
    </Box>
  );
};

export default FeedbackButton;
