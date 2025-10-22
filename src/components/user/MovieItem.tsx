"use client";

import Image from "@/components/shared/Image";
import StatusTag from "@/components/shared/StatusTag";
import {
  formatDate,
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
import DecodeText from "../shared/DecodeText";
import { usePathname } from "next/navigation";
import MovieProgress from "./MovieProgress";
import { FaTimes } from "react-icons/fa";

interface MovieItemProps {
  item: Movie;
  isLoading: boolean;
  callback: (movieId: string) => void;
}

interface Tooltip {
  top: number;
  left: number;
  width: number;
  height: number;
  visible: boolean;
}

const pathsWithProgress = ["/", "/nguoi-dung/lich-su-xem"];

const MovieItem = ({ item, isLoading, callback }: MovieItemProps) => {
  const dispatch: AppDispatch = useDispatch();
  const pathname = usePathname();
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const currentElementRef = useRef<HTMLImageElement | null>(null);
  const tooltipTimeout = useRef<NodeJS.Timeout | null>(null);
  const { windowWidth } = useSelector((state: RootState) => state.system);
  const { selectedDeleteMode, selectedMovieIds } = useSelector(
    (state: RootState) => state.user.userMovies
  );

  const handleMouseEnter = () => {
    if (windowWidth <= 1280 || selectedDeleteMode) return;

    onMouseEnterShowTooltip(tooltipTimeout, currentElementRef, setTooltip);
  };

  const handleMouseLeave = () => {
    onMouseLeaveHideTooltip(tooltipTimeout, setTooltip);
  };

  const showProgress = pathsWithProgress.includes(pathname);
  const Tag = selectedDeleteMode ? "div" : Link;
  let href: string | null = null;

  if (showProgress) {
    const id = item?.currentEpisode?.episodeId || "error-episode-id";
    href = `/dang-xem/${item?.slug}?id=${id}&ref=continue`;
  } else {
    href = `/thong-tin-phim/${item?.slug}`;
  }

  return (
    <Box
      id={item?._id}
      className={`group select-none ${
        selectedDeleteMode
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
            if (selectedDeleteMode) {
              dispatch(setSelectedMovieIds(item?._id));
            }
          }}
        >
          <HoverOutlineWrapper rounded="lg" ringSize="2">
            <Tag
              href={!selectedDeleteMode ? href : "#"}
              className="flex flex-col gap-2 group"
            >
              <Box className="h-0 overflow-hidden pb-[150%] relative">
                <Image
                  ref={currentElementRef}
                  src={generateUrlImage(item?.poster_url)}
                  alt={item?.name || "Không xác định"}
                  className="rounded-lg group-hover:brightness-75 transition-all"
                />
              </Box>
            </Tag>
            <Box className="absolute xs:left-1/2 xs:transform xs:-translate-x-1/2 left-0 right-0 bottom-0">
              <StatusTag
                uppercase={false}
                text={formatDate(item?.createAt || "N/a")}
                bordered
                rounded="xs:rounded-t-sm xs:rounded-b-none rounded-t-none rounded-b-xl"
              />
            </Box>
          </HoverOutlineWrapper>

          {tooltip?.visible && <MovieTooltip data={item} position={tooltip} />}
        </Box>

        <Box className="absolute right-2 top-2">
          {selectedDeleteMode ? (
            <CheckboxCustom
              color="primary"
              size="medium"
              checked={selectedMovieIds?.includes(item?._id)}
              onChange={() => {
                dispatch(setSelectedMovieIds(item?._id));
              }}
            />
          ) : (
            <IconButton
              size="xs"
              loading={isLoading}
              onClick={() => callback(item?._id)}
              aria-label="Xóa"
              className="rounded-lg bg-white text-black hover:opacity-75"
            >
              <FaTimes />
            </IconButton>
          )}
        </Box>
      </Box>

      {showProgress && <MovieProgress item={item} />}

      <Link
        href={`/thong-tin-phim/${item?.slug}`}
        className="mt-2 block text-center"
      >
        <Box className="text-gray-50 line-clamp-1 text-xs font-semibold group-hover:text-primary lg:text-sm transition-all">
          <DecodeText text={item?.name} />
          <span className="text-xs text-gray-300 truncate block mt-1">
            <DecodeText text={item?.origin_name} />
          </span>
        </Box>
      </Link>
    </Box>
  );
};

export default MovieItem;
