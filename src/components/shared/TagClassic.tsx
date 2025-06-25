"use client";

import Link from "next/link";

interface TagClassicProps {
  text: string;
  isRedirect?: boolean;
  href?: string;
}

export const TagClassic = ({
  text,
  isRedirect,
  href = "#",
}: TagClassicProps) => {
  return (
    <>
      {!isRedirect ? (
        <span className="bg-[rgba(255,255,255,0.06)] border border-[#ffffff10] h-6 p-1 rounded-md text-gray-50 text-xs inline-flex items-center">
          {text}
        </span>
      ) : (
        <Link
          href={href as string}
          className="bg-[rgba(255,255,255,0.1)] h-6 p-1 rounded-md text-gray-50 text-xs hover:text-[#ffd875] inline-flex items-center transition-all"
        >
          {text}
        </Link>
      )}
    </>
  );
};
