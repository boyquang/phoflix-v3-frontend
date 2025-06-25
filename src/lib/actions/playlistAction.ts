import { ENV, NEXT_PUBLIC_BACKEND_URL } from "../env";

/**
 *
 * @param userId: string - id of the user
 * @param accessToken: string - access token of the user
 * @returns { status: boolean; message: string; result: any; }
 */

export const getPlaylists = async ({
  userId,
  accessToken,
}: GetUserPlaylists): Promise<any> => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/user/playlists?userId=${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

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
  userId,
  playlistName,
  accessToken,
}: CreateNewPlaylist): Promise<any> => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/user/playlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        userId,
        playlistName,
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
  userId,
  playlistId,
  playlistName,
  accessToken,
}: UpdatePlaylist): Promise<any> => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/user/playlist`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        userId,
        playlistId,
        playlistName,
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
  userId,
  playlistId,
  accessToken,
}: DeletePlaylist): Promise<any> => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/user/playlist`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        userId,
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

    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/user/playlists/listByMovie?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

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
