

import { ENV, NEXT_PUBLIC_BACKEND_URL } from "../env";

interface GetListRooms {
  accessToken: string;
  page?: number;
  limit?: number;
}

/**
 *
 * @param accessToken: string - access token of the user
 * @param page: number - page number to fetch
 * @param limit: number - number of rooms per page
 * @returns { status: boolean; message: string; result: any; }
 */

export const getListRooms = async ({
  accessToken,
  page = 1,
  limit = 10,
}: GetListRooms): Promise<any> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/watchingTogether/listRooms?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
      console.error("Error getting list rooms:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

interface GetListRoomsByUser {
  userId: string;
  accessToken: string;
  page?: number;
  limit?: number;
}

/**
 *
 * @param userId: string - id of the user
 * @param accessToken: string - access token of the user
 * @param page: number - page number to fetch
 * @param limit: number - number of rooms per page
 * @returns { status: boolean; message: string; result: any; }
 */

export const getListRoomsByUser = async ({
  userId,
  accessToken,
  page = 1,
  limit = 10,
}: GetListRoomsByUser): Promise<any> => {
  try {
    const params = new URLSearchParams({
      userId,
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/watchingTogether/listRoomsByUser?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
      console.error("Error getting list rooms:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};
