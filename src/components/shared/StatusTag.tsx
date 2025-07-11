"use client";

import { Box } from "@chakra-ui/react";

interface StatusTagProps {
  text: string;
  bordered?: boolean;
  rounded?: string;
  size?: "sm" | "md" | "lg";
  uppercase?: boolean;
  className?: string;
}

const StatusTag = ({
  text,
  bordered = false,
  size = "sm",
  rounded,
  uppercase = true,
  className = "",
}: StatusTagProps) => {
  const sizeClasses = {
    sm: "text-[10px] h-4 px-1 py-0.5",
    md: "text-[10px] h-5 px-2 py-1",
    lg: "text-[12px] h-6 px-3 py-1.5",
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
          ${className}
        `}
    >
      {text}
    </Box>
  );
};

export default StatusTag;
