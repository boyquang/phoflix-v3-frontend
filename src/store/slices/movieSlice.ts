import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDataSlideShow,
  fetchDataMovie,
  fetchDataMoviePreview,
  fetchDataMovieDetail,
  fetchDataMovieSearch,
  fetchDataMovieInfo,
  fetchDataMovieEvent,
  fetchActorsListByMovie,
  fetchMoviePopular,
} from "../asyncThunks/movieAsyncThunk";
import { formatTypeMovie } from "@/lib/utils";

const data = {
  items: [],
  loading: false,
  error: false,
};

const initialState: MovieSlice = {
  slideShows: data,
  movieData: {
    data: {},
    fetched: false,
  },
  searchMoviePreview: {
    items: [],
    totalItems: 0,
    loading: true,
    error: false,
  },
  actorsListByMovie: {
    items: [],
    loading: false,
    error: false,
  },
  actorDetail: {
    filter: "all",
  },
  moviePopular: {
    items: [],
    loading: true,
    error: false,
    totalPages: 0,
    totalResults: 0,
  },
  movieInfo: {
    movie: null,
    episodes: null,
    currentEpisode: null,
    isLongSeries: false,
    loading: true,
    error: false,
  },
  movieDetail: {
    items: [],
    titlePage: "",
    pagination: null,
    loading: true,
    error: false,
    fetched: false,
  },
  movieSuggestion: {
    items: [],
    loading: false,
    error: false,
    fetched: false,
  },
  movieEvent: {
    items: [],
    loading: false,
    error: false,
  },
  searchMovie: {
    items: [],
    loading: true,
    error: false,
    titlePage: "",
    pagination: {
      totalItems: 0,
      totalItemsPerPage: 0,
      currentPage: 0,
      totalPages: 0,
    },
  },
  episode: {
    displayMode: "list",
    selectedLanguage: null,
    groups: {},
  },
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setCurrentEpisode: (state, action) => {
      state.movieInfo.currentEpisode = action.payload;
    },
    setFetchedMovieDetail: (state, action) => {
      state.movieDetail.fetched = action.payload;
    },
    setFilterActor: (state, action) => {
      state.actorDetail.filter = action.payload;
    },
    setFetchedMovieSuggestion: (state, action) => {
      state.movieSuggestion.fetched = action.payload;
    },
    setFetchedMovieDataHomePage: (state, action) => {
      state.movieData.fetched = action.payload;
    },
    setDisplayModeEpisode: (state, action) => {
      state.episode.displayMode = action.payload;
    },
    setSelectedLanguage: (state, action) => {
      state.episode.selectedLanguage = action.payload;
    },
    setDataMovieInfo: (state, action) => {
      const { movie, episodes } = action.payload || {};

      state.movieInfo.movie = movie;
      state.movieInfo.episodes = episodes || null;

      // Kiểm tra phim có phải là series dài tập hay không
      state.movieInfo.isLongSeries =
        movie?.tmdb?.type === "tv" || episodes?.[0]?.server_data?.length > 1;

      // Thêm tập phim theo ngôn ngữ
      episodes?.forEach((episode: Episode) => {
        const data = formatTypeMovie(episode.server_name);
        const language = data.language as languageType;

        if (!state.episode.groups[language as languageType]) {
          state.episode.groups[language as languageType] = {
            items: episode.server_data,
            label: data.title,
          };
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataSlideShow.pending, (state, action) => {
      state.slideShows.loading = true;
      state.slideShows.error = false;
    });
    builder.addCase(fetchDataSlideShow.fulfilled, (state, action) => {
      state.slideShows.loading = false;
      state.slideShows.items = action.payload?.items ?? [];
      state.slideShows.error = false;
    });
    builder.addCase(fetchDataSlideShow.rejected, (state, action) => {
      state.slideShows.loading = false;
      state.slideShows.error = true;
      state.slideShows.items = [];
    });
    builder.addCase(fetchDataMovie.pending, (state, action) => {
      const { type } = action.meta.arg;

      state.movieData.data[type] = {
        loading: true,
        items: [],
        error: false,
      };
    });
    builder.addCase(fetchDataMovie.fulfilled, (state, action) => {
      const { type } = action.payload;
      state.movieData.data[type].loading = false;
      state.movieData.data[type].items = action.payload?.res?.data?.items ?? [];
    });
    builder.addCase(fetchDataMovie.rejected, (state, action: any) => {
      const { type } = action.meta.arg;
      state.movieData.data[type].loading = false;
      state.movieData.data[type].error = true;
      state.movieData.data[type].items = [];
    });

    builder.addCase(fetchDataMoviePreview.pending, (state, action) => {
      state.searchMoviePreview.loading = true;
      state.searchMoviePreview.error = false;
      state.searchMoviePreview.items = [];
    });
    builder.addCase(fetchDataMoviePreview.fulfilled, (state, action) => {
      state.searchMoviePreview.loading = false;
      state.searchMoviePreview.items = action.payload?.data?.items ?? [];
      state.searchMoviePreview.totalItems =
        action.payload?.data?.params?.pagination?.totalItems ?? 0;
      state.searchMoviePreview.error = false;
    });
    builder.addCase(fetchDataMoviePreview.rejected, (state, action) => {
      state.searchMoviePreview.loading = false;
      state.searchMoviePreview.error = true;
      state.searchMoviePreview.items = [];
      state.searchMoviePreview.totalItems = 0;
    });

    builder.addCase(fetchDataMovieEvent.pending, (state, action) => {
      state.movieEvent.loading = true;
      state.movieEvent.error = false;
      state.movieEvent.items = [];
    });

    builder.addCase(fetchDataMovieEvent.fulfilled, (state, action) => {
      state.movieEvent.loading = false;
      state.movieEvent.items = action.payload?.data?.items ?? [];
      state.movieEvent.error = false;
    });

    builder.addCase(fetchDataMovieEvent.rejected, (state, action) => {
      state.movieEvent.loading = false;
      state.movieEvent.error = true;
      state.movieEvent.items = [];
    });

    builder.addCase(fetchDataMovieDetail.pending, (state, action) => {
      const target = action.meta.arg.target || "detail";

      if (target === "detail") {
        state.movieDetail.loading = true;
        state.movieDetail.error = false;
        state.movieDetail.items = [];
        state.movieDetail.pagination = null;
        state.movieDetail.titlePage = "";
      } else if (target === "suggestion") {
        state.movieSuggestion.loading = true;
        state.movieSuggestion.error = false;
        state.movieSuggestion.items = [];
      }
    });
    builder.addCase(fetchDataMovieDetail.fulfilled, (state, action) => {
      const target = action.payload?.target || "detail";

      if (target === "detail") {
        state.movieDetail.loading = false;
        state.movieDetail.titlePage = action.payload?.data?.titlePage;
        state.movieDetail.items = action.payload?.data?.items;
        state.movieDetail.pagination = action.payload?.data?.params?.pagination;
        state.movieDetail.error = false;
      } else if (target === "suggestion") {
        state.movieSuggestion.loading = false;
        state.movieSuggestion.items = action.payload?.data?.items ?? [];
        state.movieSuggestion.error = false;
      }
    });
    builder.addCase(fetchDataMovieDetail.rejected, (state, action) => {
      const target = action.meta.arg.target || "detail";

      if (target === "detail") {
        state.movieDetail.loading = false;
        state.movieDetail.error = true;
        state.movieDetail.items = [];
        state.movieDetail.pagination = null;
        state.movieDetail.titlePage = "";
      } else if (target === "suggestion") {
        state.movieSuggestion.loading = false;
        state.movieSuggestion.error = true;
        state.movieSuggestion.items = [];
      }
    });

    builder.addCase(fetchDataMovieSearch.pending, (state, action) => {
      state.searchMovie.loading = true;
      state.searchMovie.error = false;
      state.searchMovie.items = [];
      state.searchMovie.titlePage = "";
      state.searchMovie.pagination = null;
    });
    builder.addCase(fetchDataMovieSearch.fulfilled, (state, action) => {
      state.searchMovie.loading = false;
      state.searchMovie.items = action.payload?.data?.items ?? [];
      state.searchMovie.titlePage = action.payload?.data?.titlePage;
      state.searchMovie.pagination = action.payload?.data?.params?.pagination;
      state.searchMovie.error = false;
    });
    builder.addCase(fetchDataMovieSearch.rejected, (state, action) => {
      state.searchMovie.loading = false;
      state.searchMovie.error = true;
      state.searchMovie.items = [];
      state.searchMovie.pagination = null;
      state.searchMovie.titlePage = "";
    });

    builder.addCase(fetchDataMovieInfo.pending, (state, action) => {
      state.movieInfo.loading = true;
      state.movieInfo.error = false;
      state.movieInfo.episodes = null;
      state.movieInfo.movie = null;
      state.episode.groups = {};
      state.movieInfo.isLongSeries = false;
    });
    builder.addCase(fetchDataMovieInfo.fulfilled, (state, action) => {
      const { movie, episodes } = action.payload || {};

      state.movieInfo.loading = false;
      state.movieInfo.movie = movie;
      state.movieInfo.episodes = episodes || null;
      state.movieInfo.error = !movie;

      // Kiểm tra phim có phải là series dài tập hay không
      state.movieInfo.isLongSeries =
        movie?.tmdb?.type === "tv" || episodes?.[0]?.server_data?.length > 1;

      // Thêm tập phim theo ngôn ngữ
      episodes?.forEach((episode: Episode) => {
        const data = formatTypeMovie(episode.server_name);
        const language = data.language as languageType;

        if (!state.episode.groups[language as languageType]) {
          state.episode.groups[language as languageType] = {
            items: episode.server_data,
            label: data.title,
          };
        }
      });
    });
    builder.addCase(fetchDataMovieInfo.rejected, (state, action) => {
      state.movieInfo.loading = false;
      state.movieInfo.error = true;
      state.movieInfo.episodes = null;
      state.movieInfo.movie = null;
      state.episode.groups = {};
      state.episode.selectedLanguage = null;
      state.movieInfo.isLongSeries = false;
    });

    builder.addCase(fetchActorsListByMovie.pending, (state, action) => {
      state.actorsListByMovie.loading = true;
      state.actorsListByMovie.error = false;
      state.actorsListByMovie.items = [];
    });

    builder.addCase(fetchActorsListByMovie.fulfilled, (state, action) => {
      state.actorsListByMovie.loading = false;
      state.actorsListByMovie.items = action.payload?.cast ?? [];
      state.actorsListByMovie.error = false;
    });

    builder.addCase(fetchActorsListByMovie.rejected, (state, action) => {
      state.actorsListByMovie.loading = false;
      state.actorsListByMovie.error = true;
      state.actorsListByMovie.items = [];
    });

    builder.addCase(fetchMoviePopular.pending, (state, action) => {
      state.moviePopular.loading = true;
      state.moviePopular.error = false;
      state.moviePopular.items = [];
      state.moviePopular.totalPages = 0;
      state.moviePopular.totalResults = 0;
    });

    builder.addCase(fetchMoviePopular.fulfilled, (state, action) => {
      state.moviePopular.loading = false;
      state.moviePopular.items = action.payload?.results ?? [];
      state.moviePopular.error = false;
      state.moviePopular.totalPages = action.payload?.total_pages ?? 0;
      state.moviePopular.totalResults = action.payload?.total_results ?? 0;
    });

    builder.addCase(fetchMoviePopular.rejected, (state, action) => {
      state.moviePopular.loading = false;
      state.moviePopular.error = true;
      state.moviePopular.items = [];
      state.moviePopular.totalPages = 0;
      state.moviePopular.totalResults = 0;
    });
  },
});

export const {
  setCurrentEpisode,
  setDisplayModeEpisode,
  setFetchedMovieSuggestion,
  setSelectedLanguage,
  setFetchedMovieDataHomePage,
  setFetchedMovieDetail,
  setFilterActor,
  setDataMovieInfo,
} = movieSlice.actions;
export default movieSlice.reducer;
