"use client";

import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

interface BackButtonProps {
  href: string;
}

const BackButton = ({ href }: BackButtonProps) => {
  return (
    <Link
      href={href}
      className="w-[30px] flex-shrink-0 text-white h-[30px] flex items-center justify-center border rounded-full border-[#ffffff80] hover:border-white"
    >
      <FaChevronLeft />
    </Link>
  );
};

export default BackButton;
