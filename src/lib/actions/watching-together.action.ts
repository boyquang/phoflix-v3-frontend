import {
  ENV,
  NEXT_PUBLIC_API_VERSION,
  NEXT_PUBLIC_BACKEND_URL,
} from "../../constants/env.contant";

const BASE_URL = `${NEXT_PUBLIC_BACKEND_URL}/api/${NEXT_PUBLIC_API_VERSION}/watchingTogether`;

/**
 * * @param userId: string - id of the user
 * * @param movieData: any - data of the movie to be added
 * * @param accessToken: string - access token of the user
 * * * @returns { status: boolean, message: string, result: any }
 */

export const createRoomWatchingTogether = async ({
  userId,
  movieData,
  accessToken,
}: CreateRoomWatchingTogether): Promise<any> => {
  try {
    const url = `${BASE_URL}/room`;

    const response = await fetch(url, {
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
      console.error("Error creating room watching together:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

export const joinRoomWatchingTogether = async ({
  user,
  roomId,
  accessToken,
}: JoinRoomWatchingTogether): Promise<any> => {
  try {
    const url = `${BASE_URL}/joinRoom`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        user,
        roomId,
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
      console.error("Error joining room watching together:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

export const leaveRoomWatchingTogether = async ({
  userId,
  roomId,
  accessToken,
}: LeaveRoomWatchingTogether): Promise<any> => {
  try {
    const params = new URLSearchParams({
      userId,
      roomId,
    });

    const url = `${BASE_URL}/leaveRoom?${params.toString()}`;

    const response = await fetch(url, {
      method: "DELETE",
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
      console.error("Error leaving room watching together:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

export const kickUserOutOfRoomWatchingTogether = async ({
  userId,
  roomId,
  roomOwnerId,
  accessToken,
}: KickUserOutOfRoomWatchingTogether): Promise<any> => {
  try {
    const params = new URLSearchParams({
      userId,
      roomId,
      roomOwnerId,
    });

    const url = `${BASE_URL}/kickUserOutOfRoom?${params.toString()}`;

    const response = await fetch(url, {
      method: "DELETE",
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
      console.error("Error kicking user out of room watching together:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};
