"use client";

import SkeletonMovieThumbTitle from "@/components/skeletons/SkeletonMovieThumbTitle";
import { colorGradientsToWhite } from "@/constants/color";
import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { RiArrowRightWideLine } from "react-icons/ri";

interface MovieThumbTitleProps {
  loading: boolean;
  href: string;
  title: string;
  index: number;
  error: boolean;
}

const MovieTitle = ({
  loading,
  href,
  index,
  title,
  error,
}: MovieThumbTitleProps) => {
  if (loading) return <SkeletonMovieThumbTitle />;
  if (error) return null;

  return (
    <Box className="flex justify-between gap-2 items-center mb-4">
      <h3
        className={`lg:text-2xl md:text-xl text-md inline-block bg-clip-text text-transparent bg-gradient-to-r ${
          colorGradientsToWhite[index % colorGradientsToWhite.length]
        } font-bold lg:mb-0 mb-2`}
      >
        {title}
      </h3>
      <Link
        href={href}
        className="flex text-gray-50 text-sm gap-1 hover:text-[#ffd875] hover:translate-x-0.5 items-center lg:text-md transition-all"
      >
        Xem tất cả
        <RiArrowRightWideLine />
      </Link>
    </Box>
  );
};

export default MovieTitle;
