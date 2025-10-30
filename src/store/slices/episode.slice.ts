import {
  formatTypeMovie,
  hasMultipleEpisodes,
  hasValidEpisode,
} from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSeasonEpisodes } from "../async-thunks/movie.thunk";

interface EpisodeSlice {
  episodes: Episode[];
  seasonEpisodes: {
    items: SeasonEpisode[];
  };
  currentEpisode: EpisodeMerged | null;
  showThumbnail: boolean;
  isLongSeries: boolean;
  isValidEpisodes: boolean;
  selectedLanguage: string | null;
  groups: Partial<Record<string, { items: EpisodeMerged[]; label: string }>>;
}

const initialState: EpisodeSlice = {
  episodes: [],
  seasonEpisodes: {
    items: [],
  },
  currentEpisode: null,
  showThumbnail: false,
  isLongSeries: false,
  isValidEpisodes: false,
  selectedLanguage: null,
  groups: {},
};

const episodeSlice = createSlice({
  name: "episode",
  initialState,
  reducers: {
    setSelectedLanguage: (state, action: PayloadAction<string | null>) => {
      state.selectedLanguage = action.payload;
    },
    setShowThumbnail: (state, action: PayloadAction<boolean>) => {
      state.showThumbnail = action.payload;
    },
    setCurrentEpisode: (state, action: PayloadAction<EpisodeMerged | null>) => {
      state.currentEpisode = action.payload;
    },
    setEpisode: (
      state,
      action: PayloadAction<{ episodes: Episode[]; movie: Movie }>
    ) => {
      // reset state
      state.groups = {};
      state.isLongSeries = false;
      state.isValidEpisodes = false;
      state.selectedLanguage = null;

      const episodes = action.payload.episodes || [];
      const movie = action.payload.movie || null;
      const isValidEpisodes = hasValidEpisode(episodes || []);
      state.episodes = episodes;
      state.isValidEpisodes = isValidEpisodes;

      if (isValidEpisodes) {
        if (movie?.is_cinema) {
          state.isLongSeries = false;
        } else {
          state.isLongSeries = hasMultipleEpisodes(episodes || []);
        }

        episodes.forEach((episode: Episode) => {
          const data = formatTypeMovie(episode.server_name);
          const language = data.language;

          if (!state.groups[language]) {
            state.groups[language] = {
              items: episode.server_data,
              label: data.title,
            };
          }
        });
      }
    },
    resetEpisodeState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSeasonEpisodes.pending, (state) => {
      state.seasonEpisodes.items = [];
    });
    builder.addCase(
      fetchSeasonEpisodes.fulfilled,
      (state, action: PayloadAction<ApiResponse<SeasonEpisodes>>) => {
        const { episodes } = action.payload.result || { episodes: [] };
        state.seasonEpisodes.items = episodes || [];
      }
    );
    builder.addCase(fetchSeasonEpisodes.rejected, () => {
      // You can handle rejected state if needed
    });
  },
});

export const {
  setEpisode,
  setCurrentEpisode,
  resetEpisodeState,
  setShowThumbnail,
  setSelectedLanguage,
} = episodeSlice.actions;
export default episodeSlice.reducer;
