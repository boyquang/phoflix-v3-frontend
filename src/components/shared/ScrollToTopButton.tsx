"use client";

import { RootState } from "@/store/store";
import { Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { BsArrowUpShort } from "react-icons/bs";

const ScrollToTopButton = () => {
  const { lastScrollY } = useSelector((state: RootState) => state.system);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      size="xs"
      onClick={handleScrollToTop}
      className={`animate-bounce hover:shadow-[0_5px_10px_10px_rgba(255,255,255,.15)] transition-all duration-300 rounded-md bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)] text-black flex justify-center items-center gap-1
        ${lastScrollY > 520 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <BsArrowUpShort />
      <span className="text-xs">Đầu trang</span>
    </Button>
  );
};

export default ScrollToTopButton;
