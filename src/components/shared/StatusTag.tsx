"use client";

import { Box } from "@chakra-ui/react";

interface StatusTagProps {
  text: string;
  bordered?: boolean;
  rounded?: string;
  size?: "sm" | "md" | "lg";
  uppercase?: boolean;
}

const StatusTag = ({
  text,
  bordered = false,
  size = "sm",
  rounded,
  uppercase = true,
}: StatusTagProps) => {
  const sizeClasses = {
    sm: "text-[10px] h-4 px-1",
    md: "text-[10px] h-5 px-2",
    lg: "text-[12px] h-6 px-3",
  }

  return (
    <Box
      className={`whitespace-nowrap flex items-center justify-center
          ${
            bordered
              ? "bg-primary linear-gradient text-gray-900 font-semibold"
              : "bg-transparent border border-[#ffd875] text-[#ffd875]"
          }
          ${uppercase ? "uppercase" : "capitalize"}
          ${rounded ? rounded : "rounded-sm"} 
          ${sizeClasses[size] || sizeClasses.sm}
        `}
    >
      {text}
    </Box>
  );
};

export default StatusTag;
