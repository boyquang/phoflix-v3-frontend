import { createSlice } from "@reduxjs/toolkit";

interface CrawlMoviesState {
  isOtherProcessRunning: boolean;
  actionCrawl: "create" | "update" | "reset" | null;
}

const initialState: CrawlMoviesState = {
  isOtherProcessRunning: false,
  actionCrawl: null,
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
  },
});

export const { setIsRunning, setActionCrawl } = crawlMoviesSlice.actions;

export default crawlMoviesSlice.reducer;
