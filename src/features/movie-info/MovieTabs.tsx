"use client";

import { Box, Tabs } from "@chakra-ui/react";
import TabEpisodes from "./TabEpisodes";
import TabTrailer from "./TabTrailer";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ActorsList from "../actor/ActorsList";
import MovieSuggesstions from "@/components/shared/MovieSuggestions";

// CSS dùng chung
const selectedTabStyle = {
  color: "#ffd875",
  "&:before": {
    height: "1px",
    backgroundColor: "#ffd875",
  },
};

const contentAnimOpen = {
  animationName: "fade-in",
  animationDuration: "160ms",
};

const contentAnimClose = {
  animationName: "fade-out",
  animationDuration: "160ms",
};

const tabs = [
  { value: "episodes", label: "Tập phim" },
  { value: "trailer", label: "Trailer" },
  { value: "actors", label: "Diễn viên" },
  { value: "suggest", label: "Đề xuất" },
];

const MovieTabs = () => {
  const { items, loading } = useSelector(
    (state: RootState) => state.movie.actorsListByMovie
  );

  return (
    <Tabs.Root defaultValue="episodes" colorPalette="yellow">
      <Tabs.List className="border-[#ffffff10]">
        {tabs.map(({ value, label }) => (
          <Tabs.Trigger
            key={value}
            value={value}
            className="text-gray-50 sm:text-[14px] text-xs"
            _selected={selectedTabStyle}
          >
            {label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.Content
        value="episodes"
        _open={contentAnimOpen}
        _closed={contentAnimClose}
      >
        <Box className="mt-6">
          <TabEpisodes />
        </Box>
      </Tabs.Content>

      <Tabs.Content
        value="trailer"
        _open={contentAnimOpen}
        _closed={contentAnimClose}
      >
        <Box className="mt-6">
          <TabTrailer />
        </Box>
      </Tabs.Content>

      <Tabs.Content
        value="actors"
        _open={contentAnimOpen}
        _closed={contentAnimClose}
      >
        <Box className="mt-6">
          <ActorsList
            classNameGrids="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 lg:gap-x-4 gap-x-2 gap-y-6"
            items={items}
            loading={loading}
          />
        </Box>
      </Tabs.Content>

      <Tabs.Content
        value="suggest"
        _open={contentAnimOpen}
        _closed={contentAnimClose}
      >
        <Box className="mt-6">
          <MovieSuggesstions
            limit={15}
            title="Có thể bạn sẽ thích"
            classNameGrids="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 lg:gap-x-4 gap-x-2 gap-y-6"
          />
        </Box>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default MovieTabs;
