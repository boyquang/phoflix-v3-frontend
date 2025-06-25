import { ENV, NEXT_PUBLIC_BACKEND_URL } from "../env";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const ENVIRONMENT = process.env.ENV;

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
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/watchingTogether/room`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          userId,
          movieData,
        }),
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
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/watchingTogether/joinRoom`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          user,
          roomId,
        }),
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

    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/watchingTogether/leaveRoom?${params.toString()}`,
      {
        method: "DELETE",
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

    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/watchingTogether/kickUserOutOfRoom?${params.toString()}`,
      {
        method: "DELETE",
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
      console.error("Error kicking user out of room watching together:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};
