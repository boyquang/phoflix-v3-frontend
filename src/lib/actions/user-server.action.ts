"use server";

import {
  ENV,
  NEXT_PUBLIC_API_VERSION,
  NEXT_PUBLIC_BACKEND_URL,
} from "../../constants/env.contant";

const BASE_URL = `${NEXT_PUBLIC_BACKEND_URL}/api/${NEXT_PUBLIC_API_VERSION}/user`;

/**
 *
 * @param userId: string - id of the user
 * @param username: string - username of the user
 * @param accessToken: string - access token of the user
 * @returns { status: boolean, message: string, result: any }
 */

export const getUserProfile = async ({
  email,
  typeAccount,
  accessToken,
}: GetUserProfile): Promise<any> => {
  try {
    const params = new URLSearchParams({
      email,
      typeAccount,
    });

    const url = `${BASE_URL}/profile?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const { status, message, result } = data || {};

      return {
        status: status || false,
        message: message || "Lỗi server! Vui lòng thử lại sau.",
        result: result || null,
      };
    }

    return data;
  } catch (error) {
    if (ENV === "development") {
      console.error("Error getting user profile:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

/**
 *
 * @param userId: string - id of the user
 * @param type: string - type of movie ("history" | "favorite" | "playlist")
 * @param page: number - page number
 * @param limit: number - number of movies per page
 * @param accessToken: string - access token of the user
 * @returns { status: boolean, message: string, result: any }
 */

export const getUserMovies = async ({
  userId,
  type,
  page,
  limit,
  accessToken,
}: GetUserMovies): Promise<any> => {
  try {
    const params = new URLSearchParams({
      userId,
      type,
      page: page.toString(),
      limit: limit.toString(),
    });

    const url = `${BASE_URL}/movies?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      const { status, message, result } = data || {};

      return {
        status: status || false,
        message: message || "Lỗi server! Vui lòng thử lại sau.",
        result: result || null,
      };
    }

    return data;
  } catch (error) {
    if (ENV === "development") {
      console.error("Error getting user movies:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

/**
 *
 * @param userId: string - id of the user
 * @param movieSlug: string - slug of the movie
 * @param type: string - type of movie ("history" | "favorite" | "playlist")
 * @param accessToken: string - access token of the user
 * @returns { status: boolean, message: string, result: any }
 */

export const deleteMovie = async ({
  userId,
  movieSlug,
  type,
}: DeleteMovie): Promise<any> => {
  try {
    const params = new URLSearchParams({
      userId,
      movieSlug,
      type,
    });

    const url = `${BASE_URL}/movie?${params.toString()}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const { status, message, result } = data || {};

      return {
        status: status || false,
        message: message || "Lỗi server! Vui lòng thử lại sau.",
        result: result || null,
      };
    }

    return data;
  } catch (error) {
    if (ENV === "development") {
      console.error("Error deleting movie:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

/**
 *
 * @param userId: string - id of the user
 * @param accessToken: string - access token of the user
 * @returns { status: boolean, message: string, result: any }
 */

export const getUserPlaylists = async ({
  userId,
  accessToken,
}: GetUserPlaylists): Promise<any> => {
  try {
    const params = new URLSearchParams({
      userId,
    });

    const url = `${BASE_URL}/playlists?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const { status, message, result } = data || {};

      return {
        status: status || false,
        message: message || "Lỗi server! Vui lòng thử lại sau.",
        result: result || null,
      };
    }

    return data;
  } catch (error) {
    if (ENV === "development") {
      console.error("Error getting user playlists:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

/**
 *
 * @param userId: string - id of the user
 * @param playlistId: string - id of the playlist
 * @param page: number - page number
 * @param limit: number - number of movies per page
 * @param accessToken: string - access token of the user
 * @returns { status: boolean, message: string, result: any }
 */

export const getUserMoviesFromPlaylist = async ({
  userId,
  playlistId,
  page,
  limit,
  accessToken,
}: GetUserMoviesFromPlaylist): Promise<any> => {
  try {
    const params = new URLSearchParams({
      userId,
      playlistId,
      page: page.toString(),
      limit: limit.toString(),
    });

    const url = `${BASE_URL}/playlist/movies?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const { status, message, result } = data || {};

      return {
        status: status || false,
        message: message || "Lỗi server! Vui lòng thử lại sau.",
        result: result || null,
      };
    }

    return data;
  } catch (error) {
    if (ENV === "development") {
      console.error("Error getting user movies from playlist:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};
