import { createSlice } from "@reduxjs/toolkit";

export interface RoomUser {
  id: string;
  username: string;
  avatar: string;
}

interface RoomUsersState {
  users: RoomUser[];
}

const initialState: RoomUsersState = {
  users: [],
};

const roomUsersSlice = createSlice({
  name: "roomUsers",
  initialState,
  reducers: {
    setRoomUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setRoomUsers } = roomUsersSlice.actions;
export default roomUsersSlice.reducer;
