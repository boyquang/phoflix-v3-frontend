"use client";

import { Box } from "@chakra-ui/react";
import TopComments from "./TopComments";
import MovieRankingList from "./MovieRankingList";
import LatestComments from "./LatestComments";

const CommunityHighlights = () => {
  return (
    <Box className="2xl:border border-y  2xl:rounded-2xl rounded-none border-[#fff2] flex flex-col">
      <TopComments />
      <Box className="flex items-stretch xl:overflow-hidden overflow-auto" style={{
        scrollbarWidth: "none",
      }}>
        <MovieRankingList type="mostPopular" />
        <MovieRankingList type="mostFavorite" />
        <LatestComments />
      </Box>
    </Box>
  );
};

export default CommunityHighlights;
