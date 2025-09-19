import { createSlice, current } from "@reduxjs/toolkit";
import { set } from "lodash";

type CrawlMoviesState = {
  isOtherProcessRunning: boolean;
  actionCrawl: "create" | "update" | "reset" | null;
  movieDetail: MovieDetail | null;
};

export const episodeDefault = [
  {
    server_name: "",
    server_data: [
      { name: "", link_m3u8: "" },
      { name: "", link_m3u8: "" },
      { name: "", link_m3u8: "" },
    ],
  },
];

export const defaultInputValues = ["", "", "", ""];

export const movieDetailDefault: MovieDetail = {
  actors: defaultInputValues,
  directors: defaultInputValues,
  countries: [],
  categories: [],
  content: "",
  episode_current: "",
  episode_total: "",
  is_cinema: false,
  lang: "",
  name: "",
  origin_name: "",
  poster_url: "",
  thumb_url: "",
  quality: "HD",
  slug: "",
  sub_docquyen: false,
  time: "",
  tmdb: {
    type: "movie",
    id: null,
    season: null,
    vote_average: 0,
    vote_count: 0,
  },
  trailer_url: "",
  type: "single",
  year: new Date().getFullYear(),
  episodes: episodeDefault,
};

const initialState: CrawlMoviesState = {
  isOtherProcessRunning: false,
  actionCrawl: null,
  movieDetail: movieDetailDefault,
};

const crawlMoviesSlice = createSlice({
  name: "crawlMovies",
  initialState,
  reducers: {
    setIsRunning(state, action) {
      state.isOtherProcessRunning = action.payload;
    },
    setActionCrawl(state, action) {
      state.actionCrawl = action.payload;
    },

    setMovieDetailJson(state, action) {
      state.movieDetail = action.payload;
    },

    setMovieDetailField: (state, action) => {
      const { field, value } = action.payload;

      if (state.movieDetail) {
        set(state.movieDetail, field, value);
      }
    },
    setEpisode(
      state,
      action: {
        payload: PayloadSetEpisode;
      }
    ) {
      const { serverIndex, episodeIndex, field, value } = action.payload;

      if (
        state.movieDetail?.episodes?.[serverIndex]?.server_data?.[episodeIndex]
      ) {
        state.movieDetail.episodes[serverIndex].server_data[episodeIndex][
          field
        ] = value;
      }
    },

    setServerName(
      state,
      action: {
        payload: { serverIndex: number; value: string };
      }
    ) {
      const { serverIndex, value } = action.payload;

      if (state.movieDetail?.episodes?.[serverIndex]) {
        state.movieDetail.episodes[serverIndex].server_name = value;
      }
    },

    addNewServerData(state) {
      if (state.movieDetail?.episodes) {
        state.movieDetail.episodes.push(...episodeDefault);
      }
    },

    addNewEpisode(
      state,
      action: {
        payload: { serverIndex: number };
      }
    ) {
      const { serverIndex } = action.payload;

      if (state.movieDetail?.episodes?.[serverIndex]) {
        state.movieDetail.episodes[serverIndex].server_data.push({
          name: "",
          link_m3u8: "",
        });
      }
    },

    deleteServerData(
      state,
      action: {
        payload: { serverIndex: number };
      }
    ) {
      const { serverIndex } = action.payload;

      if (state.movieDetail?.episodes?.[serverIndex]) {
        state.movieDetail.episodes.splice(serverIndex, 1);
      }
    },

    deleteEpisode(
      state,
      action: {
        payload: { serverIndex: number; episodeIndex: number };
      }
    ) {
      const { serverIndex, episodeIndex } = action.payload;

      if (
        state.movieDetail?.episodes?.[serverIndex]?.server_data?.[episodeIndex]
      ) {
        state.movieDetail.episodes[serverIndex].server_data.splice(
          episodeIndex,
          1
        );
      }
    },
  },
});

export const {
  setIsRunning,
  setActionCrawl,
  setMovieDetailField,
  setEpisode,
  addNewEpisode,
  addNewServerData,
  deleteServerData,
  deleteEpisode,
  setMovieDetailJson,
  setServerName,
} = crawlMoviesSlice.actions;

export default crawlMoviesSlice.reducer;
