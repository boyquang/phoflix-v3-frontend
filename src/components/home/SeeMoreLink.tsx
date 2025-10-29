"use client";

import Link from "next/dist/client/link";
import { FaChevronRight } from "react-icons/fa6";

interface SeeMoreLinkProps {
  title: string;
  link: string;
}

const SeeMoreLink = ({ title = "Xem thêm", link }: SeeMoreLinkProps) => {
  return (
    <Link
      href={link}
      className="px-2 py-1 md:h-[30px] md:w-[30px] md:hover:w-auto group rounded-full border border-[#fff5] hover:border-primary flex text-gray-50 text-sm gap-0.5 hover:text-primary items-center transition-all"
    >
      <span className={`md:hidden md:group-hover:block mb-0.5 text-xs`}> {title}</span>
      <FaChevronRight />
    </Link>
  );
};

export default SeeMoreLink;
