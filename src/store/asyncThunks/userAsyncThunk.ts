import { createAsyncThunk } from "@reduxjs/toolkit";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const ENVIRONMENT = process.env.ENV;

/**
 * * @param userId - The ID of the user.
 * * @param accessToken - The access token of the user.
 * * @returns { status: boolean; message: string; result: any;}
 */

export const getUserSearchHistory = createAsyncThunk(
  "user/getUserSearchHistory",
  async ({ userId, accessToken }: GetUserSearchHistory) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/user/search-history?id=${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user search history");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (ENVIRONMENT === "development") {
        console.log("Error in getUserSearchHistory:", error);
      }
      throw error;
    }
  }
);

/**
 * * @param userId - The ID of the user.
 * * * @param keyword - The keyword to search for.
 * * * @param accessToken - The access token of the user.
 * * @returns { status: boolean; message: string; result: any;}
 */

export const createUserSearchHistory = createAsyncThunk(
  "user/createUserSearchHistory",
  async ({ userId, keyword, accessToken }: CreateUserSearchHistory) => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/search-history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ userId, keyword }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user search history");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (ENVIRONMENT === "development") {
        console.log("Error in createUserSearchHistory:", error);
      }
      throw error;
    }
  }
);

// ======================= DELETE USER SEARCH HISTORY =======================

export const deleteUserSearchHistory = createAsyncThunk(
  "user/deleteUserSearchHistory",
  async ({ id, userId, accessToken }: DeleteUserSearchHistory) => {
    try {
      const params = new URLSearchParams({
        id,
        userId,
      });

      const response = await fetch(
        `${BACKEND_URL}/user/search-history?${params.toString()}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user search history");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (ENVIRONMENT === "development") {
        console.log("Error in deleteUserSearchHistory:", error);
      }
      throw error;
    }
  }
);

export const deleteAllUserSearchHistory = createAsyncThunk(
  "user/deleteAllUserSearchHistory",
  async ({ userId, accessToken }: DeleteAllUserSearchHistory) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/user/search-history/all?userId=${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete all user search history");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (ENVIRONMENT === "development") {
        console.log("Error in deleteAllUserSearchHistory:", error);
      }
      throw error;
    }
  }
);

export const getPlaylists = createAsyncThunk(
  "user/getPlaylists",
  async ({ userId, accessToken }: GetUserPlaylists) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/user/playlists?userId=${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user playlists");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (ENVIRONMENT === "development") {
        console.log("Error in getPlaylists:", error);
      }
      throw error;
    }
  }
);

export const getPlaylistsContainingMovie = createAsyncThunk(
  "user/getPlaylistsContainingMovie",
  async ({ userId, movieSlug, accessToken }: GetPlaylistsContainingMovie) => {
    try {
      const params = new URLSearchParams({
        userId,
        movieSlug,
      });

      const response = await fetch(
        `${BACKEND_URL}/user/playlists/listByMovie?${params.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch playlists containing movie");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (ENVIRONMENT === "development") {
        console.log("Error in getPlaylistsContainingMovie:", error);
      }
      throw error;
    }
  }
);
