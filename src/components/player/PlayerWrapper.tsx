"use client";

import { useEffect } from "react";

interface PlayerWrapperProps {
  children: React.ReactNode;
  options?: {
    loading?: boolean;
    className?: string;
  };
}

const PlayerWrapper = ({ children, options }: PlayerWrapperProps) => {
  return (
    <div
      className={`relative w-full h-0 pt-[56.25%] z-10 ${options?.className}`}
    >
      <div
        className={`transition-all duration-500 ${
          options?.loading ? "opacity-0 invisible" : "opacity-100 visible"
        }`}
      >
        {children}
      </div>
      <div
        className={`${
          !options?.loading
            ? "hidden"
            : "absolute w-full h-full inset-0 flex items-center justify-center bg-[#08080a]"
        }`}
      />
    </div>
  );
};

export default PlayerWrapper;
