"use client";

import { generateUrlImage } from "@/lib/utils";
import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { useRef, useState } from "react";
import MovieTooltip from "./MovieTooltip";
import Image from "../shared/Image";
import HoverOutlineWrapper from "../shared/HoverOutlineWrapper";
import DecodeText from "./DecodeText";
import BadgeCustom from "./BadgeCustom";
import useEpisode from "@/hooks/useEpisode";
import useTooltip from "@/hooks/useTooltip";

interface MovieItemProps {
  data: Movie;
  orientation?: "horizontal" | "vertical";
}

const MovieCard = ({ data, orientation }: MovieItemProps) => {
  const currentElementRef = useRef<HTMLImageElement | null>(null);
  const tooltipTimeout = useRef<NodeJS.Timeout | null>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const { episodeText } = useEpisode({ movie: data });
  const { onMouseEnterShowTooltip, onMouseLeaveHideTooltip } = useTooltip();

  const handleMouseEnter = () => {
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
              <BadgeCustom size="xs" text={data?.quality || "N/A"} />

              {data?.lang?.split("+")?.map((lang, index) => (
                <BadgeCustom key={index} size="xs" text={lang || "N/A"} />
              ))}
            </Box>
            <Box className="absolute left-1.5 inline-flex top-1.5 xs:left-1/2 xs:bottom-1.5 xs:top-auto xs:-translate-x-1/2 overflow-hidden transform">
              <BadgeCustom
                className="bg-primary uppercase linear-gradient text-black"
                size="xs"
                text={episodeText || "N/A"}
              />
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
            className="text-gray-50 font-semibold text-xs group-hover:text-primary lg:text-sm transition-all"
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
