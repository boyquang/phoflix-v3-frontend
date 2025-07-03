"use client";

import {
  generateUrlImage,
  onMouseEnterShowTooltip,
  onMouseLeaveHideTooltip,
} from "@/lib/utils";
import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import MovieTooltip from "./MovieTooltip";
import StatusTag from "../shared/StatusTag";
import Image from "../shared/Image";
import HoverOutlineWrapper from "../shared/HoverOutlineWrapper";

interface MovieItemProps {
  data: Movie;
  orientation?: "horizontal" | "vertical";
}

interface Tooltip {
  top: number;
  left: number;
  width: number;
  height: number;
  visible: boolean;
}

const MovieCard = ({ data, orientation }: MovieItemProps) => {
  const currentElementRef = useRef<HTMLImageElement | null>(null);
  const tooltipTimeout = useRef<NodeJS.Timeout | null>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const { windowWidth } = useSelector((state: RootState) => state.system);

  const handleMouseEnter = () => {
    if (windowWidth <= 1280) return;

    onMouseEnterShowTooltip(tooltipTimeout, currentElementRef, setTooltip);
  };

  const handleMouseLeave = () => {
    onMouseLeaveHideTooltip(tooltipTimeout, setTooltip);
  };

  return (
    <Box
      className="relative hover:-translate-y-2 transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={`/thong-tin-phim/${data?.slug}`}
        className="flex flex-col gap-2 group"
      >
        <HoverOutlineWrapper rounded="lg" ringSize="2">
          <Box
            className={`h-0 relative ${
              orientation === "horizontal" ? "pb-[62%]" : "pb-[150%]"
            }`}
          >
            <Image
              src={generateUrlImage(
                orientation === "horizontal"
                  ? data?.thumb_url
                  : data?.poster_url
              )}
              ref={currentElementRef}
              className="group-hover:brightness-75 transition-all rounded-lg"
              alt={data?.name || "Không xác định"}
            />
            <Box className="absolute left-1/2 transform -translate-x-1/2 bottom-0 xs:block hidden">
              <StatusTag
                uppercase={false}
                bordered
                size="md"
                rounded="rounded-t-sm"
                text={data?.episode_current || "Không xác định"}
              />
            </Box>
          </Box>
        </HoverOutlineWrapper>
        <span
          style={{
            WebkitLineClamp: 2,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
          className="text-gray-50 text-xs group-hover:text-[#ffd875] lg:text-sm transition-all"
        >
          {data?.name}
        </span>
      </Link>

      {tooltip?.visible && <MovieTooltip data={data} position={tooltip} />}
    </Box>
  );
};

export default MovieCard;
