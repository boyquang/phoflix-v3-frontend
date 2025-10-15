import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createRoom,
  getRoomData,
} from "../async-thunks/watch-together-v2.thunk";

interface WatchTogetherV2Slice {
  listRooms: Room[];
  filter: StatusFilter;
  roomData: (Room & Movie & Episode) | null;
  loading: {
    roomData: boolean;
    createRoom: boolean;
  };
  fetched: boolean;
}

const initialState: WatchTogetherV2Slice = {
  listRooms: [],
  filter: "all",
  roomData: null,
  loading: {
    roomData: false,
    createRoom: false,
  },
  fetched: false,
};

const watchTogetherV2Slice = createSlice({
  name: "watchTogetherV2",
  initialState,
  reducers: {
    setWatchTogetherByKey: (state, action) => {
      const { key, value } = action.payload;
      (state as any)[key] = value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRoomData.pending, (state) => {
      state.loading.roomData = true;
    });
    builder.addCase(
      getRoomData.fulfilled,
      (state, action: PayloadAction<GetRoomDataResponse>) => {
        state.roomData = action.payload.result?.room || null;
        state.loading.roomData = false;
        state.fetched = true;
      }
    );
    builder.addCase(getRoomData.rejected, (state) => {
      state.roomData = null;
      state.loading.roomData = false;
    });
    builder.addCase(createRoom.pending, (state) => {
      state.loading.createRoom = true;
    });
    builder.addCase(
      createRoom.fulfilled,
      (state, action: PayloadAction<GetRoomDataResponse>) => {
        state.roomData = action.payload.result?.room || null;
        state.loading.createRoom = false;
        state.fetched = true;
      }
    );
    builder.addCase(createRoom.rejected, (state) => {
      state.roomData = null;
      state.loading.createRoom = false;
    });
  },
});

export default watchTogetherV2Slice.reducer;
export const { setWatchTogetherByKey } = watchTogetherV2Slice.actions;
