"use client";

import { Box, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PaginationItems, PaginationRoot } from "@/components/ui/pagination";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  changeQuery,
  getIdFromLinkEmbed,
  scrollToElement,
  scrollToTop,
} from "@/lib/utils";
import EpisodeItem from "./EpisodeItem";
import HoverOutlineWrapper from "@/components/shared/HoverOutlineWrapper";
import EmptyData from "../shared/EmptyData";
import { toast } from "sonner";

interface EpisodesListProps {
  language: LanguageType;
  episodes: EpisodeMerged[];
  currentEpisode: EpisodeMerged | null;
  setCurrentEpisode: (item: EpisodeMerged) => void;
  callbackSocket?: (item: EpisodeMerged) => void;
  columns?: {
    base: number;
    md: number;
    lg: number;
    xl: number;
  };
  redirect?: boolean;
  isScroll?: boolean;
  elementScrollName?: string;
}

const limitDisplay = 24;

const EpisodesList = ({
  episodes: episodes,
  language,
  currentEpisode,
  setCurrentEpisode,
  callbackSocket,
  columns = {
    base: 2,
    md: 4,
    lg: 6,
    xl: 8,
  },
  redirect = false,
  isScroll = false,
  elementScrollName = "movie-main",
}: EpisodesListProps) => {
  const [episodeDisplay, setEpisodeDisplay] = useState<EpisodeMerged[]>([]);
  const { windowWidth } = useSelector((state: RootState) => state.system);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setEpisodeDisplay(episodes.slice(0, limitDisplay));
  }, [episodes]);

  useEffect(() => {
    setPage(1);
  }, [language]);

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

  const handleSetCurrentEpisode = (item: EpisodeMerged) => {
    if (!redirect) {
      if (currentEpisode?.link_embed === item.link_embed) return;

      const id = getIdFromLinkEmbed(item.link_embed, 8);

      const newQuery = [
        { key: "id", value: id },
        { key: "ep", value: item.slug },
        { key: "language", value: language },
      ];
      // Cập nhật url query
      changeQuery(newQuery);
      // Cập nhật tập phim hiện tại
      setCurrentEpisode(item);
      // Cuộn lên đầu trang
      scrollToTop();
      // Gọi callback nếu có
      if (callbackSocket) callbackSocket(item);
    }
  };

  if (!episodes || episodes.length === 0) {
    return (
      <EmptyData
        title="Không có tập phim nào"
        description="Chúng tôi sẽ cập nhật tập phim trong thời gian sớm nhất."
        className="mt-6 bg-[#0003] rounded-2xl"
      />
    );
  }

  return (
    <>
      <Box
        className={`grid mt-4
              grid-cols-${columns.base ?? 2} 
              md:grid-cols-${columns.md ?? 4} 
              lg:grid-cols-${columns.lg ?? 6} 
              xl:grid-cols-${columns.xl ?? 8} 
              gap-3
            `}
      >
        {episodeDisplay?.map((item, index: number) => (
          <HoverOutlineWrapper rounded="md" key={index} ringSize="2">
            <EpisodeItem
              item={item}
              currentEpisode={currentEpisode}
              language={language}
              redirect={redirect}
              handleSetCurrentEpisode={handleSetCurrentEpisode}
            />
          </HoverOutlineWrapper>
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
    </>
  );
};

export default EpisodesList;
