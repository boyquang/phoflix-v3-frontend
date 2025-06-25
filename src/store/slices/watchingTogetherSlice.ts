import { createSlice } from "@reduxjs/toolkit";
import {
  createRoomWatchingTogether,
  getRoomDataWatchingTogether,
  getUsersInRoom,
  joinRoomWatchingTogether,
} from "../asyncThunks/watchingTogetherAsyncThunk";

const movieDataDefault = {
  movieQuality: "",
  movieYear: "",
  movieLang: "",
  movieTime: "",
  movieEpisodeCurrent: "",
  voteAverage: 0,
  movieName: "",
  movieSlug: "",
  moviePoster: "",
  movieThumb: "",
  movieOriginName: "",
  episodes: [],
};

const initialState: WatchingTogetherSlice = {
  movieData: movieDataDefault,
  hasLeftRoom: false,
  maxUserInRoom: 0,
  currentEpisode: null,
  roomOwnerId: "",
  roomId: "",
  loading: false,
  error: false,
};

const watchingTogetherSlice = createSlice({
  name: "watchingTogether",
  initialState,
  reducers: {
    setCurrentEpisode: (state, action) => {
      state.currentEpisode = action.payload;
    },
    shareDataFromOwnerRoom: (state, action) => {
      state.currentEpisode = action.payload?.currentEpisode;
      state.roomOwnerId = action.payload?.roomOwnerId;
      state.roomId = action.payload?.roomId;
      state.maxUserInRoom = action.payload?.maxUserInRoom;
      state.movieData = action.payload?.movieData || movieDataDefault;
    },
    setHasLeftRoom: (state, action) => {
      state.hasLeftRoom = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createRoomWatchingTogether.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(createRoomWatchingTogether.fulfilled, (state, action) => {
      state.loading = false;
      state.roomOwnerId = action.payload?.result?.roomOwnerId;
    });
    builder.addCase(createRoomWatchingTogether.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(joinRoomWatchingTogether.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(joinRoomWatchingTogether.fulfilled, (state, action) => {
      state.loading = false;
      state.roomOwnerId = action.payload?.result?.roomOwnerId;
    });

    builder.addCase(joinRoomWatchingTogether.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getRoomDataWatchingTogether.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getRoomDataWatchingTogether.fulfilled, (state, action) => {
      state.loading = false;
      state.movieData = action.payload?.result.movieData;
      state.roomOwnerId = action.payload?.result.roomOwnerId;
      state.roomId = action.payload?.result.roomId;
      state.maxUserInRoom = action.payload?.result.maxUserInRoom;
    });
    builder.addCase(getRoomDataWatchingTogether.rejected, (state) => {
      state.loading = false;
      state.error = true;
      state.movieData = movieDataDefault;
      state.roomId = "";
      state.roomOwnerId = "";
      state.maxUserInRoom = 0;
    });
  },
});

export const { setCurrentEpisode, setHasLeftRoom, shareDataFromOwnerRoom } =
  watchingTogetherSlice.actions;
export default watchingTogetherSlice.reducer;
