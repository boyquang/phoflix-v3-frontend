import {
  formatTypeMovie,
  hasMultipleEpisodes,
  hasValidEpisode,
} from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EpisodeSlice {
  episodes: Episode[];
  currentEpisode: EpisodeMerged | null;
  isLongSeries: boolean;
  isValidEpisodes: boolean;
  selectedLanguage: string | null;
  groups: Partial<Record<string, { items: EpisodeMerged[]; label: string }>>;
}

const initialState: EpisodeSlice = {
  episodes: [],
  currentEpisode: null,
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
});

export const {
  setEpisode,
  setCurrentEpisode,
  resetEpisodeState,
  setSelectedLanguage,
} = episodeSlice.actions;
export default episodeSlice.reducer;
