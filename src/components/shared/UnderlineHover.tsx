"use client";

import React from "react";

interface UnderlineLinkProps {
  children: React.ReactNode;
  color?: string; // ví dụ: "blue-500", "pink-400"
  duration?: number; // thời gian transition (ms)
  thickness?: string; // ví dụ: "2px", "1px"
  className?: string;
}

const UnderlineLink: React.FC<UnderlineLinkProps> = ({
  children,
  color = "blue-500",
  duration = 300,
  thickness = "2px",
  className = "",
}) => {
  return (
    <div
      className={`relative inline-block ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
      }}
    >
      <div className="relative z-10">{children}</div>
      <div
        className="absolute left-1/2 bottom-0 -translate-x-1/2 w-0 group-hover:w-full transition-all"
        style={{
          backgroundColor: `var(--tw-color-${color})`,
          height: thickness,
          transitionDuration: `${duration}ms`,
          display: "block",
        }}
      />
    </div>
  );
};

export default UnderlineLink;
