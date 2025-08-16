"use client";

import Image from "@/components/shared/Image";
import StatusTag from "@/components/shared/StatusTag";
import {
  decodeHtmlEntities,
  formatDate,
  formatStringForURL,
  generateUrlImage,
  onMouseEnterShowTooltip,
  onMouseLeaveHideTooltip,
} from "@/lib/utils";
import { AppDispatch, RootState } from "@/store/store";
import { Box, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMovieIds } from "@/store/slices/user.slice";
import CheckboxCustom from "@/components/shared/CheckboxCustom";
import HoverOutlineWrapper from "@/components/shared/HoverOutlineWrapper";
import MovieTooltip from "@/components/shared/MovieTooltip";

interface MovieItemProps {
  item: MovieDB;
  isLoading: boolean;
  callback: (slug: string, id: string) => void;
}

interface Tooltip {
  top: number;
  left: number;
  width: number;
  height: number;
  visible: boolean;
}

const MovieItem = ({ item, isLoading, callback }: MovieItemProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const currentElementRef = useRef<HTMLImageElement | null>(null);
  const tooltipTimeout = useRef<NodeJS.Timeout | null>(null);
  const { windowWidth } = useSelector((state: RootState) => state.system);
  const movieData = item?.movie_data;
  const { seletectedDeleteMode, selectedMovieIds } = useSelector(
    (state: RootState) => state.user.userMovies
  );

  const handleMouseEnter = () => {
    if (windowWidth <= 1280 || seletectedDeleteMode) return;

    onMouseEnterShowTooltip(tooltipTimeout, currentElementRef, setTooltip);
  };

  const handleMouseLeave = () => {
    onMouseLeaveHideTooltip(tooltipTimeout, setTooltip);
  };

  return (
    <Box
      id={item?.id}
      className={`group select-none ${
        seletectedDeleteMode
          ? ""
          : "hover:-translate-y-2 transition-all duration-300"
      }`}
    >
      <Box className="relative">
        <Box
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            if (seletectedDeleteMode) {
              dispatch(setSelectedMovieIds(item?.id));
            }
          }}
        >
          <HoverOutlineWrapper rounded="lg" ringSize="2">
            <Link
              href={
                !seletectedDeleteMode
                  ? `/thong-tin-phim/${item?.movie_slug}`
                  : "#"
              }
              className="flex flex-col gap-2 group"
            >
              <Box className="h-0 overflow-hidden pb-[150%] relative">
                <Image
                  ref={currentElementRef}
                  src={generateUrlImage(movieData?.poster_url)}
                  alt={item?.movie_data.name || "Không xác định"}
                  className="rounded-lg group-hover:brightness-75 transition-all"
                />
              </Box>
            </Link>
            <Box className="absolute xs:left-1/2 xs:transform xs:-translate-x-1/2 left-0 right-0 bottom-0">
              <StatusTag
                uppercase={false}
                text={formatDate(item?.created_at)}
                bordered
                rounded="xs:rounded-t-sm xs:rounded-b-none rounded-t-none rounded-b-xl"
              />
            </Box>
          </HoverOutlineWrapper>

          {tooltip?.visible && (
            <MovieTooltip data={movieData} position={tooltip} />
          )}
        </Box>

        <Box className="absolute right-2 top-2">
          {seletectedDeleteMode ? (
            <CheckboxCustom
              color="primary"
              size="medium"
              checked={selectedMovieIds?.includes(item?.id)}
              onChange={() => dispatch(setSelectedMovieIds(item?.id))}
            />
          ) : (
            <IconButton
              size="xs"
              loading={isLoading}
              onClick={() => callback(item?.movie_slug, item?.id)}
              aria-label="Xóa"
              className="bg-transparent border border-[#ffffffb0] hover:bg-[#ffffff10] rounded-full"
            >
              <MdDelete />
            </IconButton>
          )}
        </Box>
      </Box>
      <Link
        href={`/thong-tin-phim/${item?.movie_slug}`}
        style={{
          WebkitLineClamp: 2,
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
        className="text-gray-50 text-xs font-semibold group-hover:text-[#ffd875] lg:text-sm transition-all mt-2"
      >
        {decodeHtmlEntities(movieData?.name)}
      </Link>
    </Box>
  );
};

export default MovieItem;
