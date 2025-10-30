"use client";

import { generateUrlImage } from "@/lib/utils";
import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { useRef, useState } from "react";
import MovieTooltip from "./MovieTooltip";
import Image from "../shared/Image";
import HoverOutlineWrapper from "../shared/HoverOutlineWrapper";
import DecodeText from "./DecodeText";
import useTooltip from "@/hooks/useTooltip";
import EpisodeBadges from "./EpisodeBadges";

interface MovieItemProps {
  data: Movie;
  orientation?: "horizontal" | "vertical";
  options?: {
    showEpisodeBadge?: boolean;
    showPoster?: boolean;
  };
}

const MovieCard = ({
  data,
  orientation,
  options: { showEpisodeBadge = true, showPoster = false } = {},
}: MovieItemProps) => {
  const currentElementRef = useRef<HTMLImageElement | null>(null);
  const tooltipTimeout = useRef<NodeJS.Timeout | null>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const { onMouseEnterShowTooltip, onMouseLeaveHideTooltip } = useTooltip();

  const handleMouseEnter = () => {
    onMouseEnterShowTooltip(tooltipTimeout, currentElementRef, setTooltip);
  };

  const handleMouseLeave = () => {
    onMouseLeaveHideTooltip(tooltipTimeout, setTooltip);
  };

  console.log("render movie card:", data);

  return (
    <Box
      className="relative hover:-translate-y-2 transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/thong-tin-phim/${data?.slug}`} className="group">
        <HoverOutlineWrapper rounded="lg" ringSize="0">
          <Box
            className={`h-0 relative ${
              orientation === "horizontal"
                ? `${showPoster ? "lg:pb-[45%] pb-[56.25%]" : "pb-[56.25%]"}`
                : "pb-[150%]"
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
            {showEpisodeBadge && (
              <EpisodeBadges showEpisodeBadge={showEpisodeBadge} data={data} />
            )}
          </Box>
        </HoverOutlineWrapper>

        <div className="flex items-end gap-4">
          {showPoster && orientation === "horizontal" && (
            <Box className="-mt-20 ml-4 lg:block hidden">
              <Box className="xl:w-[80px] w-[64px] rounded-md overflow-hidden">
                <Box className="relative pb-[150%] h-0 w-full">
                  <Image
                    src={generateUrlImage(data?.poster_url)}
                    className="rounded-md"
                    alt={data?.name || "Không xác định"}
                  />
                </Box>
              </Box>
            </Box>
          )}

          <Box className="mt-2 overflow-hidden">
            <span className="text-gray-50 line-clamp-2 font-semibold text-xs group-hover:text-primary lg:text-sm transition-all">
              <DecodeText text={data?.name} />
            </span>
            <span className="text-xs text-gray-300 line-clamp-1 mt-1">
              <DecodeText text={data?.origin_name} />
            </span>
          </Box>
        </div>
      </Link>

      {tooltip?.visible && <MovieTooltip data={data} position={tooltip} />}
    </Box>
  );
};

export default MovieCard;
