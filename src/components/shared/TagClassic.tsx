"use client";

import Link from "next/link";

interface TagClassicProps {
  text: string | number;
  isRedirect?: boolean;
  href?: string;
  bordered?: boolean;
}

export const TagClassic = ({
  text,
  isRedirect,
  href = "#",
  bordered = true,
}: TagClassicProps) => {
  const borderClass = bordered ? "border border-white" : "border-none";

  return (
    <>
      {!isRedirect ? (
        <span className={`bg-[rgba(255,255,255,0.06)] ${borderClass} h-5 px-1.5 rounded-md text-white text-xs inline-flex items-center`}>
          {text}
        </span>
      ) : (
        <Link
          href={href as string}
          className="bg-[rgba(255,255,255,0.1)] h-5 px-1.5 rounded-md text-white text-xs hover:text-[#ffd875] inline-flex items-center transition-all"
        >
          {text}
        </Link>
      )}
    </>
  );
};
