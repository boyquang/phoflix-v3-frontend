import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createRoom,
  deleteRoom,
  endRoom,
  getListRooms,
  getRoomData,
  joinRoom,
  kickUser,
  leaveRoom,
  startLive,
} from "@/store/async-thunks/watch-together-v2.thunk";
import { ROOM_DATA_DEFAULT } from "@/constants/watch-together.contant";

interface WatchTogetherV2Slice {
  listRooms: {
    rooms: Room[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
  videoPlayer: {
    currentTime: number;
  };
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
    kickUserId: string;
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
  videoPlayer: {
    currentTime: 0,
  },
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
    kickUserId: "",
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
    setRoomData: (state, action: PayloadAction<Room & Movie & Episode>) => {
      state.roomData = action.payload;
    },

    // socket room created
    setRoomCreated: (state, action: PayloadAction<Room>) => {
      const updatedRoom = action.payload;
      state.listRooms.rooms = [updatedRoom, ...state.listRooms.rooms];
    },

    // socket user joined by link
    setUserJoinedRoomByLink: (
      state,
      action: PayloadAction<{
        roomId: string;
        participantUsers: ParticipantUser[];
        currentParticipants: number;
      }>
    ) => {
      const { roomId, participantUsers, currentParticipants } =
        action.payload || {};

      if (state.roomData && state.roomData._id === roomId) {
        state.roomData.participantUsers = participantUsers;
        state.roomData.currentParticipants = currentParticipants;
      }

      const roomIndex = state.listRooms.rooms?.findIndex(
        (room) => room?._id === roomId
      );

      if (roomIndex !== -1) {
        state.listRooms.rooms[roomIndex].participantUsers = participantUsers;
        state.listRooms.rooms[roomIndex].currentParticipants =
          currentParticipants;
      }
    },

    // socket user joined
    setUserJoined: (
      state,
      action: PayloadAction<{ roomId: string; user: ParticipantUser }>
    ) => {
      const { roomId, user } = action.payload;

      // cập nhật thông tin khi đang ở trong phòng
      if (state.roomData && state.roomData._id === roomId) {
        const exists = state.roomData?.participantUsers?.find(
          (u) => u.userId === user.userId
        );

        if (!exists) {
          state.roomData?.participantUsers?.push(user);
          state.roomData.currentParticipants =
            state.roomData?.participantUsers?.length;
        }
      }

      // cập nhật thông tin khi đang ở /xem-chung
      const roomIndex = state.listRooms.rooms?.findIndex(
        (room) => room?._id === roomId
      );

      if (roomIndex !== -1) {
        const exists = state.listRooms.rooms[roomIndex].participantUsers?.find(
          (u) => u?.userId === user?.userId
        );
        // nếu user chưa có trong phòng thì thêm vào
        if (!exists) {
          state.listRooms.rooms[roomIndex].participantUsers?.push(user);
          state.listRooms.rooms[roomIndex].currentParticipants =
            state.listRooms.rooms[roomIndex].participantUsers?.length;
        }
      }
    },

    // socket lived/ended room
    setLiveRoomStatus: (
      state,
      action: PayloadAction<{ status: "active" | "ended"; roomId: string }>
    ) => {
      // cập nhật thông tin khi đang ở trong phòng
      if (state.roomData) {
        state.roomData.status = action.payload?.status;
      }

      // cập nhật thông tin khi đang ở /xem-chung
      const roomIndex = state.listRooms.rooms?.findIndex(
        (room) => room?._id === action.payload?.roomId
      );
      if (roomIndex !== -1) {
        state.listRooms.rooms[roomIndex].status = action.payload?.status;
      }
    },

    // socket deleted room
    setDeletedRoom: (state, action: PayloadAction<string>) => {
      const deletedRoomId = action.payload;
      const roomExists = state.listRooms.rooms?.some(
        (room) => room?._id === deletedRoomId
      );

      if (roomExists) {
        state.listRooms.rooms = state.listRooms.rooms?.filter(
          (room) => room?._id !== deletedRoomId
        );
        state.listRooms.totalItems = Math.max(
          0,
          state.listRooms.totalItems - 1
        );
      }

      if (state.roomData?._id === deletedRoomId) {
        state.roomData = null;
      }
    },

    // socket user kicked
    setUserKicked: (
      state,
      action: PayloadAction<{ roomId: string; targetUserId: string }>
    ) => {
      const { roomId, targetUserId } = action.payload;

      // cập nhật thông tin khi đang ở trong phòng
      if (state.roomData && state.roomData?._id === roomId) {
        state.roomData.participantUsers =
          state.roomData.participantUsers?.filter(
            (user) => user.userId !== targetUserId
          );
        state.roomData.currentParticipants =
          state.roomData.participantUsers?.length;
      }

      // cập nhật thông tin khi đang ở /xem-chung
      const roomIndex = state.listRooms.rooms?.findIndex(
        (room) => room?._id === roomId
      );

      if (roomIndex !== -1) {
        state.listRooms.rooms[roomIndex].participantUsers =
          state.listRooms.rooms[roomIndex].participantUsers?.filter(
            (user) => user?.userId !== targetUserId
          );
        state.listRooms.rooms[roomIndex].currentParticipants =
          state.listRooms.rooms[roomIndex].participantUsers?.length;
      }
    },

    // socket video time synced
    setVideoTimeSynced: (
      state,
      action: PayloadAction<{ currentTime: number; roomId: string }>
    ) => {
      const { currentTime, roomId } = action.payload || {};

      // đồng bộ thời gian video đúng phòng
      if (state.roomData && state.roomData?._id === roomId) {
        state.videoPlayer.currentTime = currentTime;
      }
    },

    // socket user left room
    setUserLeftRoom: (
      state,
      action: PayloadAction<{ roomId: string; userId: string }>
    ) => {
      const { roomId, userId } = action.payload || {};

      if (state.roomData && state.roomData?._id === roomId) {
        state.roomData.participantUsers =
          state.roomData.participantUsers?.filter(
            (user) => user?.userId !== userId
          );
        state.roomData.currentParticipants =
          state.roomData.participantUsers?.length;
      }

      const roomIndex = state.listRooms.rooms?.findIndex(
        (room) => room?._id === roomId
      );

      if (roomIndex !== -1) {
        state.listRooms.rooms[roomIndex].participantUsers =
          state.listRooms.rooms[roomIndex].participantUsers?.filter(
            (user) => user?.userId !== userId
          );
        state.listRooms.rooms[roomIndex].currentParticipants =
          state.listRooms.rooms[roomIndex].participantUsers?.length;
      }
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
        const { room } = action.payload.result || {};
        state.roomData = room || null;
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
        }
        
        state.listRooms.rooms = state.listRooms.rooms?.map((room) => {
          if (room._id === roomId) {
            return { ...room, status: status || "active" };
          } else {
            return room;
          }
        });
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
        }

        state.listRooms.rooms = state.listRooms.rooms?.map((room) => {
          if (room._id === roomId) {
            return { ...room, status: status || "ended" };
          } else {
            return room;
          }
        });
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
          state.listRooms.rooms = state.listRooms.rooms?.filter(
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

    // Kick user
    builder.addCase(kickUser.pending, (state, action) => {
      const kickUserId = (action.meta.arg as { userId: string }).userId;
      state.loading.kickUserId = kickUserId;
    });
    builder.addCase(
      kickUser.fulfilled,
      (state, action: PayloadAction<ApiResponse<KickUserResponse>>) => {
        const room = action.payload.result?.room;
        if (room && state.roomData) {
          state.roomData.participantUsers = room.participantUsers;
          state.roomData.currentParticipants =
            state.roomData.participantUsers?.length;
        }
        state.loading.kickUserId = "";
      }
    );
    builder.addCase(kickUser.rejected, (state) => {
      state.loading.kickUserId = "";
    });

    // leave room
    builder.addCase(leaveRoom.pending, (state) => {});
    builder.addCase(
      leaveRoom.fulfilled,
      (state, action: PayloadAction<ApiResponse<LeaveRoomResponse>>) => {
        // state.roomData = null;
      }
    );
    builder.addCase(leaveRoom.rejected, (state) => {});
  },
});

export default watchTogetherV2Slice.reducer;
export const {
  setWatchTogetherByKey,
  setRoomData,
  setLiveRoomStatus,
  setRoomCreated,
  setUserJoined,
  setDeletedRoom,
  setUserKicked,
  setVideoTimeSynced,
  setUserLeftRoom,
  setUserJoinedRoomByLink,
} = watchTogetherV2Slice.actions;
