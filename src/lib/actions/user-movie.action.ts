import {
  ENV,
  NEXT_PUBLIC_API_VERSION,
  NEXT_PUBLIC_BACKEND_URL,
} from "../../constants/env.contant";

const BASE_URL = `${NEXT_PUBLIC_BACKEND_URL}/api/${NEXT_PUBLIC_API_VERSION}/user`;

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
  userId,
  movieSlug,
  type,
  accessToken,
}: CheckMovieExists): Promise<any> => {
  try {
    const url = `${BASE_URL}/checkMovie`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        userId,
        movieSlug,
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
  userId,
  movieData,
  type,
  playlistId,
  accessToken,
}: AddNewMovie): Promise<any> => {
  try {
    const url = `${BASE_URL}/movie`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        userId,
        movieData,
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
  userId,
  movieSlug,
  type,
  accessToken,
  playlistId = null,
  movieId = null,
}: DeleteMovie): Promise<any> => {
  try {
    const params = new URLSearchParams({
      userId,
      movieSlug,
      type,
    });

    if (playlistId) {
      params.append("playlistId", playlistId);
    }

    if (movieId) {
      params.append("movieId", movieId);
    }

    const url = `${BASE_URL}/movie?${params.toString()}`;

    const response = await fetch(url, {
      method: "DELETE",
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
  userId,
  type,
  accessToken,
  playlistId = null,
}: DeleteAllMovies): Promise<any> => {
  try {
    const params = new URLSearchParams({
      userId,
      type,
    });

    if (playlistId) {
      params.append("playlistId", playlistId);
    }

    const url = `${BASE_URL}/deleteAllMovies?${params.toString()}`;

    const response = await fetch(url, {
      method: "DELETE",
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
  userId: string;
  movieIds: string[];
  type: "history" | "favorite" | "playlist";
  accessToken: string;
  playlistId?: string | null;
}

export const deleteSelectedMovies = async ({
  userId,
  movieIds,
  type,
  playlistId,
  accessToken,
}: DeleteSelectedMovies) => {
  try {
    const url = `${BASE_URL}/deleteSelectedMovies`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        userId,
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
