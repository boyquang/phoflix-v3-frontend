"use client";

import { Badge } from "@chakra-ui/react";

interface BadgeCustomProps {
  text: string | number;
  rounded?: BorderRadius;
  size?: "xs" | "sm" | "md" | "lg";
  bgColor?: BackgroundColor;
  textColor?: TextColor;
  height?: Height;
  className?: string;
}

const BadgeCustom = ({
  text,
  rounded = "rounded-md",
  size = "xs",
  bgColor = "bg-white",
  textColor = "text-gray-900",
  height = "h-5",
  className = "",
}: BadgeCustomProps) => {
  return (
    <Badge
      size={size}
      className={`uppercase ${className} ${bgColor} ${height} ${rounded} ${textColor} shadow-sm`}
    >
      {text || "N/A"}
    </Badge>
  );
};

export default BadgeCustom;
