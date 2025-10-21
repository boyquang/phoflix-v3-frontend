"use client";

import { Box, HStack, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PaginationItems, PaginationRoot } from "@/components/ui/pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { changeQuery, getIdFromLinkEmbed, scrollToTop } from "@/lib/utils";
import EpisodeItem from "./EpisodeItem";
import HoverOutlineWrapper from "@/components/shared/HoverOutlineWrapper";
import EmptyData from "../shared/EmptyData";
import { setCurrentEpisode } from "@/store/slices/episode.slice";

interface EpisodesListProps {
  episodes: EpisodeMerged[];
  callbackSocket?: (item: EpisodeMerged) => void;
  columns?: Record<string, number>;
  redirect?: boolean;
  movie?: Movie | null;
}

const limitDisplay = 24;

const EpisodesList = ({
  movie,
  episodes,
  callbackSocket,
  columns = {
    base: 2,
    md: 4,
    lg: 6,
    xl: 8,
    "2xl": 8,
  },
  redirect = false,
}: EpisodesListProps) => {
  const [episodeDisplay, setEpisodeDisplay] = useState<EpisodeMerged[]>([]);
  const { windowWidth } = useSelector((state: RootState) => state.system);
  const {
    selectedLanguage,
    currentEpisode,
    isLongSeries,
    seasonEpisodes,
    showThumbnail,
  } = useSelector((state: RootState) => state.episode);
  const [page, setPage] = useState(1);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setEpisodeDisplay(episodes.slice(0, limitDisplay));
  }, [episodes]);

  useEffect(() => {
    setPage(1);
  }, [selectedLanguage]);

  const handleChangePage = (page: number) => {
    const start = (page - 1) * limitDisplay;
    const end = start + limitDisplay;

    setEpisodeDisplay(episodes.slice(start, end));
    setPage(page);
  };

  const handleSetCurrentEpisode = (item: EpisodeMerged) => {
    if (!redirect) {
      if (currentEpisode?.link_embed === item.link_embed) return;

      const id = getIdFromLinkEmbed(item.link_embed, 8);

      const newQuery = [
        { key: "id", value: id },
        { key: "ep", value: item.slug },
        { key: "language", value: selectedLanguage },
      ];
      // Cập nhật url query
      changeQuery(newQuery);
      // Cập nhật tập phim hiện tại
      dispatch(setCurrentEpisode(item));
      // Cuộn lên đầu trang
      scrollToTop(0);
      // Gọi callback nếu có
      if (callbackSocket) callbackSocket(item);
    }
  };

  if (!episodes || episodes?.length === 0) {
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
      <SimpleGrid
        columns={columns}
        columnGap={3}
        rowGap={showThumbnail ? 5 : 3}
        className="mt-4"
      >
        {episodeDisplay?.map((item, index: number) => {
          // Tính index thực tế trong mảng gốc dựa trên trang hiện tại
          const actualIndex = (page - 1) * limitDisplay + index;

          return (
            <HoverOutlineWrapper
              rounded="md"
              key={index}
              ringSize="2"
              show={showThumbnail ? false : true}
            >
              <EpisodeItem
                item={item}
                thumbnailItem={{
                  data: isLongSeries
                    ? seasonEpisodes.items?.[actualIndex]
                    : null,
                  defaultThumbnail: movie?.thumb_url || "",
                }}
                currentEpisode={currentEpisode}
                language={selectedLanguage || "default"}
                redirect={redirect}
                handleSetCurrentEpisode={handleSetCurrentEpisode}
              />
            </HoverOutlineWrapper>
          );
        })}
      </SimpleGrid>

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
