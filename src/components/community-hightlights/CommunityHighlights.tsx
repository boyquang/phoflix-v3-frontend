"use client";

import { Box } from "@chakra-ui/react";
import TopComments from "./TopComments";
import MovieRankingList from "./MovieRankingList";
import LatestComments from "./LatestComments";
import { useEffect, useState } from "react";
import {
  getLatestFeedbacks,
  getMostRakingFeedbacks,
} from "@/lib/actions/feedback.action";
import { getMovieRakingList } from "@/lib/actions/movie.action";

type TCommunityHighlights = {
  latestComments: TLatestComment[];
  topComments: TTopComment[];
  mostPopularMovies: TMovieRanking[];
  mostFavoriteMovies: TMovieRanking[];
};

const CommunityHighlights = () => {
  const [data, setData] = useState<TCommunityHighlights | null>(null);

  const getValueFromPromiseSelected = (promise: PromiseSettledResult<any>) => {
    if (promise.status === "fulfilled") {
      return promise.value?.result?.items || [];
    }
    return [];
  };

  useEffect(() => {
    const fetchData = async () => {
      const [
        latestCommentsRes,
        topCommentsRes,
        mostPopularMoviesRes,
        mostFavoriteMoviesRes,
      ] = await Promise.allSettled([
        getLatestFeedbacks(),
        getMostRakingFeedbacks(),
        getMovieRakingList("mostPopular", 5),
        getMovieRakingList("mostFavorite", 5),
      ]);

      setData({
        latestComments: getValueFromPromiseSelected(latestCommentsRes),
        topComments: getValueFromPromiseSelected(topCommentsRes),
        mostPopularMovies: getValueFromPromiseSelected(mostPopularMoviesRes),
        mostFavoriteMovies: getValueFromPromiseSelected(mostFavoriteMoviesRes),
      });
    };

    fetchData();
  }, []);

  return (
    <Box className="2xl:border border-y  2xl:rounded-2xl rounded-none border-[#fff2] flex flex-col">
      <TopComments comments={data?.topComments || []} />
      <Box
        className="flex items-stretch xl:overflow-hidden overflow-auto"
        style={{
          scrollbarWidth: "none",
        }}
      >
        <MovieRankingList
          items={data?.mostPopularMovies || []}
          type="mostPopular"
        />
        <MovieRankingList
          type="mostFavorite"
          items={data?.mostFavoriteMovies || []}
        />
        <LatestComments comments={data?.latestComments || []} />
      </Box>
    </Box>
  );
};

export default CommunityHighlights;
