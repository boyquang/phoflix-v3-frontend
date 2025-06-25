"use client";

import { Box, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PaginationItems, PaginationRoot } from "@/components/ui/pagination";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  changeQuery,
  formatTypeMovie,
  getIdFromLinkEmbed,
  handleShowToaster,
  scrollToElement,
  scrollToTop,
} from "@/lib/utils";
import EpisodeItem from "./EpisodeItem";
import LanguageIcon from "./LanguageIcon";
import HoverOutlineWrapper from "@/components/shared/HoverOutlineWrapper";

type Episode = {
  name: string;
  slug: string;
  link_embed: string;
  link_m3u8: string;
  filename: string;
};

interface EpisodesListProps {
  server_name: string;
  server_data: Episode[];
  currentEpisode: Episode;
  setCurrentEpisode: (item: Episode) => void;
  callbackSocket?: (item: Episode) => void;
  colums?: {
    base: number;
    md: number;
    lg: number;
    xl: number;
  };
  redirect?: boolean;
  showToaster?: boolean;
  isScroll?: boolean;
  elementScrollName?: string;
}

const limitDisplay = 24;

const EpisodesList = ({
  server_data: episodes,
  server_name,
  currentEpisode,
  setCurrentEpisode,
  callbackSocket,
  colums = {
    base: 2,
    md: 4,
    lg: 6,
    xl: 8,
  },
  redirect = false,
  showToaster = true,
  isScroll = false,
  elementScrollName = "movie-main",
}: EpisodesListProps) => {
  const [episodeDisplay, setEpisodeDisplay] = useState(
    episodes.slice(0, limitDisplay)
  );
  const { windowWidth } = useSelector((state: RootState) => state.system);
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const typeMovie = formatTypeMovie(server_name);

    setTitle(typeMovie.title);
    setLanguage(typeMovie.language);
  }, [server_name]);

  const handleChangePage = (page: number) => {
    const start = (page - 1) * limitDisplay;
    const end = start + limitDisplay;

    setEpisodeDisplay(episodes.slice(start, end));
    setPage(page);

    if (isScroll) {
      scrollToElement({
        name: elementScrollName,
        type: "class",
        ms: 200,
        block: "start",
      });
    }
  };

  const handleSetCurrentEpisode = (item: Episode) => {
    if (!redirect) {
      if (currentEpisode?.link_embed === item.link_embed) return;

      const id = getIdFromLinkEmbed(item.link_embed, 8);
      const typeMovie = formatTypeMovie(server_name);

      const newQuery = [
        { key: "id", value: id },
        { key: "episode", value: item.slug },
        { key: "type", value: typeMovie.language },
      ];

      // Cập nhật url query
      changeQuery(newQuery);

      // Cập nhật tập phim hiện tại
      setCurrentEpisode(item);

      // Cuộn lên đầu trang
      scrollToTop();

      // Gọi callback nếu có
      if (callbackSocket) {
        callbackSocket(item);
      }

      // Hiển thị toaster nếu cần
      if (showToaster) {
        handleShowToaster(
          `Bạn đang xem ${item?.filename}`,
          "Chúc bạn xem phim vui vẻ!"
        );
      }
    }
  };

  return (
    <Box>
      <Box className="items-center gap-1 text-gray-50 rounded-md bg-[#ffffff10] px-2 py-1 inline-flex">
        <LanguageIcon language={language} />
        <h3 className="font-semibold text-xs">{title}</h3>
      </Box>

      <Box
        className={`grid mt-4
              grid-cols-${colums.base ?? 2} 
              md:grid-cols-${colums.md ?? 4} 
              lg:grid-cols-${colums.lg ?? 6} 
              xl:grid-cols-${colums.xl ?? 8} 
              gap-3
            `}
      >
        {episodeDisplay?.map((item: any, index: number) => (
          <Box className="relative group" key={index}>
            <HoverOutlineWrapper rounded="md" />
            <EpisodeItem
              item={item}
              currentEpisode={currentEpisode}
              server_name={server_name}
              redirect={redirect}
              handleSetCurrentEpisode={handleSetCurrentEpisode}
            />
          </Box>
        ))}
      </Box>

      {episodes?.length >= limitDisplay && (
        <Box className="flex mx-auto justify-center my-6">
          <PaginationRoot
            size={windowWidth < 768 ? "xs" : "md"}
            count={Number(episodes?.length)}
            pageSize={Number(limitDisplay)}
            page={page}
            siblingCount={1}
            variant="solid"
            onPageChange={(details) => handleChangePage(details.page)}
          >
            <HStack>
              <PaginationItems className="bg-[#282b3a] border-transparent text-gray-50" />
            </HStack>
          </PaginationRoot>
        </Box>
      )}
    </Box>
  );
};

export default EpisodesList;
