import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserSearchHistory,
  deleteAllUserSearchHistory,
  deleteUserSearchHistory,
  getPlaylists,
  getPlaylistsContainingMovie,
  getUserSearchHistory,
} from "../async-thunks/user.thunk";

const initialState: UserSlice = {
  searchHistory: {
    items: [],
    loading: false,
    error: false,
    keyword: "",
    fetched: false,
  },
  reviews: {
    items: [],
    loading: false,
    error: false,
    selectedReview: {
      id: 1,
      emoji: "/images/reviews/rate-5.webp",
      text: "Tuyệt vời",
      value: 10,
    },
    reviewContent: "",
  },
  comments: {
    items: [],
    loading: false,
    error: false,
  },
  report: {
    reportError: "",
    reportDescription: "",
  },
  avatar: {
    selectedFilterTabsAvatar: "hoat-hinh",
  },
  playlist: {
    items: [],
    playlistIds: [],
    refreshMovies: false,
    selectedPlaylistId: null,
    refreshPlaylists: false,
  },
  userMovies: {
    selectedDeleteMode: false,
    selectedMovieIds: [],
  },
  movieViewingStatus: {
    fetched: false,
    currentTime: 0,
    duration: 0,
    finished: false,
    currentEpisode: null,
  },
  autoNextEpisode: false,
  cinemaMode: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPlaylistByKey(
      state,
      action: {
        payload: { key: keyof UserSlice["playlist"]; value?: any };
      }
    ) {
      const { key, value } = action.payload;

      if (key in state.playlist) {
        if (key === "refreshMovies" || key === "refreshPlaylists") {
          state.playlist[key] = !state.playlist[key];
          return;
        }

        state.playlist[key] = value;
      }
    },
    setKeyWord: (state, action) => {
      state.searchHistory.keyword = action.payload;
    },
    setSelectedReview: (state, action) => {
      state.reviews.selectedReview = action.payload;
    },
    setReviewContent: (state, action) => {
      state.reviews.reviewContent = action.payload;
    },
    setReportError: (state, action) => {
      state.report.reportError = action.payload;
    },
    setReportDescription: (state, action) => {
      state.report.reportDescription = action.payload;
    },
    setSelectedFilterTabsAvatar: (state, action) => {
      state.avatar.selectedFilterTabsAvatar = action.payload;
    },
    setFetched: (state, action) => {
      state.searchHistory.fetched = action.payload;
    },
    setSelectedDeleteMode: (state, action) => {
      const checked = action.payload;

      state.userMovies.selectedDeleteMode = checked;

      if (!checked) {
        state.userMovies.selectedMovieIds = [];
      }
    },
    setSelectedMovieIds: (state, action) => {
      const movieId = action.payload;

      if (state.userMovies.selectedMovieIds.includes(movieId)) {
        state.userMovies.selectedMovieIds =
          state.userMovies.selectedMovieIds.filter((id) => id !== movieId);
      } else {
        state.userMovies.selectedMovieIds.push(movieId);
      }
    },
    setMovieViewingStatus: (state, action) => {
      state.movieViewingStatus = {
        ...state.movieViewingStatus,
        ...action.payload,
      };
    },

    setAutoNextEpisode: (state, action: PayloadAction<boolean>) => {
      state.autoNextEpisode = action.payload;
      localStorage.setItem("auto_next_episode", action.payload ? "1" : "0");
    },
    setCinemaMode: (state, action: PayloadAction<boolean>) => {
      state.cinemaMode = action.payload;
      localStorage.setItem("cinema_mode", action.payload ? "1" : "0");
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserSearchHistory.pending, (state) => {
      state.searchHistory.loading = true;
      state.searchHistory.error = false;
    });

    builder.addCase(getUserSearchHistory.fulfilled, (state, action) => {
      state.searchHistory.loading = false;
      state.searchHistory.items = action.payload.result;
      state.searchHistory.error = false;
      state.searchHistory.fetched = true;
    });

    builder.addCase(getUserSearchHistory.rejected, (state) => {
      state.searchHistory.loading = false;
      state.searchHistory.error = true;
      state.searchHistory.items = [];
    });

    builder.addCase(getPlaylists.pending, (state) => {});
    builder.addCase(getPlaylists.fulfilled, (state, action) => {
      state.playlist.items = action.payload.result.playlists;
    });
    builder.addCase(getPlaylists.rejected, (state) => {
      state.playlist.items = [];
    });

    builder.addCase(createUserSearchHistory.pending, (state) => {});
    builder.addCase(createUserSearchHistory.fulfilled, (state, action) => {
      state.searchHistory.fetched = false;
    });
    builder.addCase(createUserSearchHistory.rejected, (state) => {});

    builder.addCase(getPlaylistsContainingMovie.pending, (state) => {});
    builder.addCase(getPlaylistsContainingMovie.fulfilled, (state, action) => {
      state.playlist.playlistIds = action.payload.result.playlistIds;
    });
    builder.addCase(getPlaylistsContainingMovie.rejected, (state) => {
      state.playlist.playlistIds = [];
    });

    builder.addCase(deleteUserSearchHistory.pending, (state) => {});
    builder.addCase(deleteUserSearchHistory.fulfilled, (state, action) => {
      const { id } = action.meta.arg;
      state.searchHistory.items = state.searchHistory.items.filter(
        (item) => item.id !== id
      );
    });
    builder.addCase(deleteUserSearchHistory.rejected, (state) => {});

    builder.addCase(deleteAllUserSearchHistory.pending, (state) => {});
    builder.addCase(deleteAllUserSearchHistory.fulfilled, (state) => {
      state.searchHistory.items = [];
    });
    builder.addCase(deleteAllUserSearchHistory.rejected, (state) => {});
  },
});

export const {
  setSelectedReview,
  setReviewContent,
  setSelectedDeleteMode,
  setReportError,
  setKeyWord,
  setSelectedFilterTabsAvatar,
  setReportDescription,
  setFetched,
  setSelectedMovieIds,
  setPlaylistByKey,
  setMovieViewingStatus,
  setAutoNextEpisode,
  setCinemaMode,
} = userSlice.actions;

export default userSlice.reducer;
