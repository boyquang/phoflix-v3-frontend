import {
  ENV,
  NEXT_PUBLIC_API_VERSION,
  NEXT_PUBLIC_BACKEND_URL,
  NEXT_PUBLIC_CRAWL_MOVIES_URL,
} from "../../constants/env.contant";

const BASE_URL = `${NEXT_PUBLIC_CRAWL_MOVIES_URL}/api/${NEXT_PUBLIC_API_VERSION}/playlists`;

/**
 *
 * @param userId: string - id of the user
 * @param accessToken: string - access token of the user
 * @returns { status: boolean; message: string; result: any; }
 */

export const getPlaylists = async (accessToken: string): Promise<any> => {
  try {
    const response = await fetch(BASE_URL, {
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
      console.log("Error fetching playlists:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: {
        playlists: [],
      },
    };
  }
};

/**
 *
 * @param userId: string - id of the user
 * @param playlistName: string - name of the playlist
 * @param accessToken: string - access token of the user
 * @returns { status: boolean; message: string; result: any; }
 */

export const createNewPlaylist = async ({
  playlistName,
  accessToken,
}: CreateNewPlaylist): Promise<any> => {
  try {
    const url = `${BASE_URL}/new-playlist`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: playlistName,
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
      console.log("Error creating playlist:", error);
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
 * @param playlistName: string - name of the playlist
 * @param accessToken: string - access token of the user
 * @returns { status: boolean; message: string; result: any; }
 */

export const updatePlaylist = async ({
  playlistId,
  playlistName,
  accessToken,
}: UpdatePlaylist): Promise<any> => {
  try {
    const url = `${BASE_URL}/${playlistId}`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: playlistName,
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
      console.log("Error updating playlist:", error);
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
 * @param accessToken: string - access token of the user
 * @returns { status: boolean; message: string; result: any; }
 */

export const deletePlaylist = async ({
  playlistId,
  accessToken,
}: DeletePlaylist): Promise<any> => {
  try {
    const url = `${BASE_URL}/${playlistId}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        id: playlistId,
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
      console.log("Error deleting playlist:", error);
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
 * @param accessToken: string - access token of the user
 * @returns { status: boolean; message: string; result: any; }
 */

export const getPlaylistsContainingMovie = async ({
  userId,
  movieSlug,
  accessToken,
}: GetPlaylistsContainingMovie): Promise<any> => {
  try {
    const params = new URLSearchParams({
      userId,
      movieSlug,
    });

    const url = `${BASE_URL}/playlists/listByMovie?${params.toString()}`;

    const response = await fetch(url, {
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
      console.log("Error fetching playlists containing movie:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: {
        playlistIds: [],
      },
    };
  }
};

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
