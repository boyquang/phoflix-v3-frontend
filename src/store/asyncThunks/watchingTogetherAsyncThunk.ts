import { createAsyncThunk } from "@reduxjs/toolkit";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const ENVIRONMENT = process.env.ENV;

/**
 * * @param userId - Id của người dùng tạo phòng
 *
 */

export const getRoomDataWatchingTogether = createAsyncThunk(
  "user/getRoomDataWatchingTogether",

  async ({ roomId, accessToken }: GetRoomDataWatchingTogether) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/watchingTogether/roomData?roomId=${roomId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch room data");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (ENVIRONMENT === "development") {
        console.log("Error in getRoomDataWatchingTogether:", error);
      }
      throw error;
    }
  }
);

export const getUsersInRoom = createAsyncThunk(
  "user/getUsersInRoom",
  async ({ roomId, accessToken }: GetUsersInRoom) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/watchingTogether/listUsersInRoom?roomId=${roomId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users in room");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (ENVIRONMENT === "development") {
        console.log("Error in getUsersInRoom:", error);
      }
      throw error;
    }
  }
);

export const createRoomWatchingTogether = createAsyncThunk(
  "user/createRoomWatchingTogether",
  async ({ userId, movieData, accessToken }: CreateRoomWatchingTogether) => {
    try {
      const response = await fetch(`${BACKEND_URL}/watchingTogether/room`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          userId,
          movieData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create room watching together");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (ENVIRONMENT === "development") {
        console.log("Error in createRoomWatchingTogether:", error);
      }
      throw error;
    }
  }
);

export const joinRoomWatchingTogether = createAsyncThunk(
  "user/joinRoomDataWatchingTogether",
  async ({ user, roomId, accessToken }: JoinRoomWatchingTogether) => {
    try {
      const response = await fetch(`${BACKEND_URL}/watchingTogether/joinRoom`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          roomId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch room data");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (ENVIRONMENT === "development") {
        console.log("Error in getRoomDataWatchingTogether:", error);
      }
      throw error;
    }
  }
);

export const leaveRoomWatchingTogether = createAsyncThunk(
  "user/leaveRoomWatchingTogether",
  async ({ userId, roomId, accessToken }: LeaveRoomWatchingTogether) => {
    try {
      const params = new URLSearchParams({
        userId,
        roomId,
      });

      const response = await fetch(
        `${BACKEND_URL}/watchingTogether/leaveRoom?${params.toString()}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to leave room watching together");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (ENVIRONMENT === "development") {
        console.log("Error in leaveRoomWatchingTogether:", error);
      }
      throw error;
    }
  }
);

export const kickUserOutOfRoomWatchingTogether = createAsyncThunk(
  "user/kickUserOutOfRoomWatchingTogether",
  async ({
    userId,
    roomId,
    roomOwnerId,
    accessToken,
  }: KickUserOutOfRoomWatchingTogether) => {
    try {
      const params = new URLSearchParams({
        userId,
        roomId,
        roomOwnerId,
      });

      const response = await fetch(
        `${BACKEND_URL}/watchingTogether/kickUserOutOfRoom?${params.toString()}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to kick user out of room watching together");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (ENVIRONMENT === "development") {
        console.log("Error in kickUserOutOfRoomWatchingTogether:", error);
      }
      throw error;
    }
  }
);
