"use client";

import { Box } from "@chakra-ui/react";
import Link from "next/link";

interface CategoryAndCountryListProps {
  data: { _id: string; name: string; slug: string }[];
  type: "the-loai" | "quoc-gia";
  isOpen: boolean;
}

const CategoryAndCountryList = ({
  data,
  type,
  isOpen,
}: CategoryAndCountryListProps) => {
  return (
    <Box
      className={`absolute left-1/2 top-[calc(100%-8px)] mt-2 min-w-3xl overflow-hidden 
        bg-[#0f111af2] text-gray-50 shadow-lg rounded-md
        transition-all duration-300 ease-in-out z-50
        ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      style={{ transform: "translateX(-50%)" }}
    >
      <ul className="grid grid-cols-5 p-2 text-gray-50 gap-1">
        {data.map((item) => (
          <li key={item._id}>
            <Link
              className="rounded-sm hover:bg-[#ffffff05] text-sm block hover:text-primary px-4 py-2 transition"
              href={`/chi-tiet/${type}/${item.slug}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default CategoryAndCountryList;
