import {
  ENV,
  NEXT_PUBLIC_API_VERSION,
  NEXT_PUBLIC_CRAWL_MOVIES_URL,
} from "../../constants/env.contant";
import { fetcher } from "../fetcher";

const BASE_URL = `${NEXT_PUBLIC_CRAWL_MOVIES_URL}/api/${NEXT_PUBLIC_API_VERSION}/user-movies`;

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
  type,
  page,
  limit,
  accessToken,
  playlistId = null,
}: GetUserMovies): Promise<any> => {
  try {
    const params = new URLSearchParams({
      type,
      page: page.toString(),
      limit: limit.toString(),
    });

    if (playlistId) {
      params.append("playlistId", playlistId);
    }

    const url = `${BASE_URL}?${params.toString()}`;

    const response = await fetcher(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
      console.error("Error fetching user movies:", error);
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

export const checkMovieExists = async ({
  movieId,
  type,
  accessToken,
}: CheckMovieExists): Promise<any> => {
  try {
    const url = `${BASE_URL}/is-existed`;

    const response = await fetcher(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        id: movieId, // id of the movie
        type,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const { status, message, result } = data || {};

      return {
        status: status || false,
        message: message || "Lỗi server! Vui lòng thử lại sau.",
        result: result || { exists: false },
      };
    }

    return data;
  } catch (error) {
    if (ENV === "development") {
      console.error("Error checking movie exists:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: {
        exists: false,
      },
    };
  }
};

/**
 *
 * @param userId: string - id of the user
 * @param movieData: any - data of the movie
 * @param type: string - type of movie ("history" | "favorite" | "playlist")
 * @param playlistId: string - id of the playlist (optional)
 * @param accessToken: string - access token of the user
 * @returns { status: boolean, message: string, result: any }
 */

export const addNewMovie = async ({
  movieId,
  type,
  playlistId,
  accessToken,
}: AddNewMovie): Promise<any> => {
  try {
    const url = `${BASE_URL}/add`;

    const response = await fetcher(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        id: movieId, // id of the movie
        type,
        playlistId,
      }),
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
      console.error("Error adding new movie:", error);
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
 * @param playlistId: string - id of the playlist (optional)
 * @param movieId: string - id of the movie (optional)
 * @returns { status: boolean, message: string, result: any }
 */

export const deleteMovie = async ({
  movieId,
  type,
  accessToken,
  playlistId = null,
}: DeleteMovie): Promise<any> => {
  try {
    const url = `${BASE_URL}/delete`;

    const response = await fetcher(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        id: movieId, // id of the movie
        type,
        playlistId: playlistId || null,
      }),
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

export const deleteAllMovies = async ({
  type,
  accessToken,
  playlistId = null,
}: DeleteAllMovies): Promise<any> => {
  try {
    const url = `${BASE_URL}/delete-all`;

    const response = await fetcher(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        type,
        playlistId: playlistId || null,
      }),
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
      console.error("Error deleting all movies:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

interface DeleteSelectedMovies {
  movieIds: string[];
  type: "history" | "favorite" | "playlist";
  accessToken: string;
  playlistId?: string | null;
}

export const deleteSelectedMovies = async ({
  movieIds,
  type,
  playlistId,
  accessToken,
}: DeleteSelectedMovies) => {
  try {
    const url = `${BASE_URL}/delete-selected-movies`;

    const response = await fetcher(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        movieIds,
        type,
        playlistId: playlistId || null,
      }),
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
      console.error("Error deleting selected movies:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

export const updateProgressMovieHistory = async (
  movieId: string,
  accessToken: string,
  options?: {
    currentTime?: number;
    duration?: number;
    finished?: boolean;
    currentEpisode?: {
      episodeId?: string;
      name?: string;
    }
  }
) => {
  try {
    const url = `${BASE_URL}/update-progress`;

    const response = await fetcher(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ id: movieId, ...options }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: false,
        message: data?.message || "Lỗi server! Vui lòng thử lại sau.",
        result: null,
      };
    }

    return data;
  } catch (error) {
    console.error("Failed to update progress movie history:", error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

export const fetchProgressMovieHistory = async (
  movieId: string,
  accessToken: string
) => {
  try {
    const url = `${BASE_URL}/progress/${movieId}`;

    const response = await fetcher(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: false,
        message: data?.message || "Lỗi server! Vui lòng thử lại sau.",
        result: null,
      };
    }

    return data;
  } catch (error) {
    console.error("Failed to fetcher progress movie history:", error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};
