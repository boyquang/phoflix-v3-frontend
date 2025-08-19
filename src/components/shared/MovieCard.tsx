"use client";

import {
  generateUrlImage,
  onMouseEnterShowTooltip,
  onMouseLeaveHideTooltip,
  parseEpisodeCurrent,
} from "@/lib/utils";
import { Badge, Box } from "@chakra-ui/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import MovieTooltip from "./MovieTooltip";
import Image from "../shared/Image";
import HoverOutlineWrapper from "../shared/HoverOutlineWrapper";
import DecodeText from "./DecodeText";

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

const paletteList = [
  "purple",
  "blue",
  "cyan",
  "pink",
  "orange",
  "green",
  "red",
  "teal",
  "gray",
];

const MovieCard = ({ data, orientation }: MovieItemProps) => {
  const currentElementRef = useRef<HTMLImageElement | null>(null);
  const tooltipTimeout = useRef<NodeJS.Timeout | null>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const { windowWidth } = useSelector((state: RootState) => state.system);

  const episodeCurrent =
    data?.episode_current.toLowerCase() || "Không xác định";
  const { episodeInfo, status } = parseEpisodeCurrent(episodeCurrent);
  const episodeText =
    episodeCurrent?.includes("hoàn tất") && episodeInfo
      ? `Tập ${episodeInfo}`
      : status;

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
      <Link href={`/thong-tin-phim/${data?.slug}`} className="group">
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
            <Box className="absolute xs:right-2 top-2 left-2 xs:inline-flex hidden flex-wrap items-center gap-1">
              <Badge
                className="uppercase bg-gray-900 text-white shadow-sm"
                size="xs"
              >
                {data?.quality}
              </Badge>
              {data?.lang?.split("+")?.map((lang, index) => (
                <Badge
                  key={index}
                  size="xs"
                  className="uppercase bg-white text-gray-900 shadow-sm"
                >
                  {lang}
                </Badge>
              ))}
            </Box>
            <Box className="absolute left-1.5 inline-flex top-1.5 xs:left-1/2 xs:bottom-1.5 xs:top-auto xs:-translate-x-1/2 overflow-hidden transform">
              <Badge
                className="bg-primary uppercase linear-gradient text-black"
                size="xs"
              >
                {episodeText}
              </Badge>
            </Box>
          </Box>
        </HoverOutlineWrapper>
        <Box className="mt-2">
          <span
            style={{
              WebkitLineClamp: 2,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
            className="text-gray-50 font-semibold text-xs group-hover:text-[#ffd875] lg:text-sm transition-all"
          >
            <DecodeText text={data?.name} />
          </span>
          <span className="text-xs text-gray-300 truncate block mt-1">
            <DecodeText text={data?.origin_name} />
          </span>
        </Box>
      </Link>

      {tooltip?.visible && <MovieTooltip data={data} position={tooltip} />}
    </Box>
  );
};

export default MovieCard;
