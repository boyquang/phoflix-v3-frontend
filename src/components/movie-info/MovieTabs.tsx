"use client";

import { Box, Tabs } from "@chakra-ui/react";
import TabEpisodes from "./TabEpisodes";
import TabTrailer from "./TabTrailer";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ActorsList from "../actor/ActorsList";
import MovieSuggesstions from "@/components/shared/MovieSuggestions";
import MovieVersionList from "../movie-version/MovieVersionList";
import { useEffect, useState } from "react";

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
  { value: "episodes", label: "Tập phim", isShow: true },
  { value: "trailer", label: "Trailer", isShow: true },
  { value: "actors", label: "Diễn viên", isShow: true },
  { value: "suggest", label: "Đề xuất", isShow: true },
];

const MovieTabs = () => {
  const { items, loading } = useSelector(
    (state: RootState) => state.movie.actorsListByMovie
  );
  const { isLongSeries, isValidEpisodes } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );
  const [tabsToShow, setTabsToShow] = useState(tabs);
  const [activeTab, setActiveTab] = useState("episodes");

  useEffect(() => {
    if (!isValidEpisodes) {
      setTabsToShow((prev) => prev.filter((tab) => tab.value !== "episodes"));
      setActiveTab("trailer");
    } else {
      setTabsToShow(tabs);
      setActiveTab("episodes");
    }
  }, [isValidEpisodes]);

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={(details) => setActiveTab(details.value)}
      colorPalette="yellow"
    >
      <Tabs.List className="border-[#ffffff10]">
        {tabsToShow.map(({ value, label }) => (
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

      {isValidEpisodes && (
        <Tabs.Content
          value="episodes"
          _open={contentAnimOpen}
          _closed={contentAnimClose}
        >
          <Box className="mt-6">
            {isLongSeries ? <TabEpisodes /> : <MovieVersionList />}
          </Box>
        </Tabs.Content>
      )}

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
