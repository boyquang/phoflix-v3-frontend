import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createRoom,
  deleteRoom,
  endRoom,
  getListRooms,
  getRoomData,
  joinRoom,
  startLive,
} from "../async-thunks/watch-together-v2.thunk";
import { ROOM_DATA_DEFAULT } from "@/constants/watch-together.contant";

interface WatchTogetherV2Slice {
  listRooms: {
    rooms: Room[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
  currentEpisode: EpisodeMerged | null;
  filter: StatusFilter;
  roomData: (Room & Movie & Episode) | null;
  loading: {
    fetchRoomData: boolean;
    createRoom: boolean;
    joinRoomId: string;
    fetchRooms: boolean;
    startLive: boolean;
    endLive: boolean;
    deleteRoomId: string;
  };
  fetched: boolean;
}

const initialState: WatchTogetherV2Slice = {
  listRooms: {
    rooms: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
  },
  currentEpisode: null,
  filter: "all",
  roomData: null,
  loading: {
    fetchRoomData: false,
    createRoom: false,
    joinRoomId: "",
    fetchRooms: false,
    startLive: false,
    endLive: false,
    deleteRoomId: "",
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
    // Get room data
    builder.addCase(getRoomData.pending, (state) => {
      state.loading.fetchRoomData = true;
    });
    builder.addCase(
      getRoomData.fulfilled,
      (state, action: PayloadAction<ApiResponse<RoomResponse>>) => {
        state.roomData = action.payload.result?.room || null;
        state.loading.fetchRoomData = false;
        state.fetched = true;
      }
    );
    builder.addCase(getRoomData.rejected, (state) => {
      state.roomData = null;
      state.loading.fetchRoomData = false;
    });

    // Create room
    builder.addCase(createRoom.pending, (state) => {
      state.loading.createRoom = true;
    });
    builder.addCase(
      createRoom.fulfilled,
      (state, action: PayloadAction<ApiResponse<RoomResponse>>) => {
        state.roomData = action.payload.result?.room || null;
        state.loading.createRoom = false;
        state.fetched = true;
      }
    );
    builder.addCase(createRoom.rejected, (state) => {
      state.roomData = null;
      state.loading.createRoom = false;
    });

    // Join room
    builder.addCase(joinRoom.pending, (state, action) => {
      const joinRoomId = (action.meta.arg as { roomId: string }).roomId;
      state.loading.joinRoomId = joinRoomId;
    });
    builder.addCase(
      joinRoom.fulfilled,
      (state, action: PayloadAction<ApiResponse<RoomResponse>>) => {
        state.roomData = action.payload.result?.room || null;
        state.loading.joinRoomId = "";
        state.fetched = true;
      }
    );
    builder.addCase(joinRoom.rejected, (state) => {
      state.roomData = null;
      state.loading.joinRoomId = "";
    });

    // Get list rooms (user/all)
    builder.addCase(getListRooms.pending, (state) => {
      state.loading.fetchRooms = true;
    });
    builder.addCase(
      getListRooms.fulfilled,
      (state, action: PayloadAction<ApiResponse<GetListRoomsResponse>>) => {
        state.listRooms = action.payload.result || ROOM_DATA_DEFAULT;
        state.loading.fetchRooms = false;
      }
    );
    builder.addCase(getListRooms.rejected, (state) => {
      state.listRooms = ROOM_DATA_DEFAULT;
      state.loading.fetchRooms = false;
    });

    // Start live
    builder.addCase(startLive.pending, (state) => {
      state.loading.startLive = true;
    });
    builder.addCase(
      startLive.fulfilled,
      (state, action: PayloadAction<ApiResponse<LiveActionResponse>>) => {
        const { status, roomId } = action.payload.result?.room || {};

        if (state.roomData) {
          state.roomData.status = status || "active";

          state.listRooms.rooms = state.listRooms.rooms.map((room) => {
            if (room._id === roomId) {
              return { ...room, status: status || "active" };
            } else {
              return room;
            }
          });
        }
        state.loading.startLive = false;
      }
    );
    builder.addCase(startLive.rejected, (state) => {
      state.loading.startLive = false;
    });

    // End live
    builder.addCase(endRoom.pending, (state) => {
      state.loading.endLive = true;
    });
    builder.addCase(
      endRoom.fulfilled,
      (state, action: PayloadAction<ApiResponse<LiveActionResponse>>) => {
        const { status, roomId } = action.payload.result?.room || {};

        if (state.roomData) {
          state.roomData.status = status || "ended";

          state.listRooms.rooms = state.listRooms.rooms.map((room) => {
            if (room._id === roomId) {
              return { ...room, status: status || "ended" };
            } else {
              return room;
            }
          });
        }
        state.loading.endLive = false;
      }
    );
    builder.addCase(endRoom.rejected, (state) => {
      state.loading.endLive = false;
    });

    // Delete room
    builder.addCase(deleteRoom.pending, (state, action) => {
      const deleteRoomId = (action.meta.arg as { roomId: string }).roomId;
      state.loading.deleteRoomId = deleteRoomId;
    });
    builder.addCase(
      deleteRoom.fulfilled,
      (state, action: PayloadAction<ApiResponse<DeleteRoomResponse>>) => {
        const deletedRoomId = action.payload.result?.room?.roomId;
        if (deletedRoomId) {
          state.listRooms.rooms = state.listRooms.rooms.filter(
            (room) => room._id !== deletedRoomId
          );
          // If the current room is deleted, reset roomData
          if (state.roomData?._id === deletedRoomId) {
            state.roomData = null;
          }
        }
        state.loading.deleteRoomId = "";
      }
    );
    builder.addCase(deleteRoom.rejected, (state) => {
      state.loading.deleteRoomId = "";
    });
  },
});

export default watchTogetherV2Slice.reducer;
export const { setWatchTogetherByKey } = watchTogetherV2Slice.actions;
