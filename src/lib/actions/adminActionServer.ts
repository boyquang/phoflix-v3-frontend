"use server";

import { ENV, NEXT_PUBLIC_BACKEND_URL } from "../env";

interface GetDataServer {
  page: number;
  limit: number;
  accessToken: string;
}

/**
 *
 * @param page: number - page number to fetch
 * @param limit: number - number of items per page
 * @param accessToken: string - access token of the user
 * @returns { status: boolean; message: string; result: any; }
 */

export const getNotifications = async ({
  page,
  limit,
  accessToken,
}: GetDataServer) => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/admin/notifications?${params.toString()}`,
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
      console.log("Error fetching notifications:", error);
    }
    return {
      status: false,
      message: "Lỗi server. Vui lòng thử lại sau!",
      result: {
        notifications: [],
        totalItems: 0,
      },
    };
  }
};

/**
 *
 * @param page: number - page number to fetch
 * @param limit: number - number of items per page
 * @param accessToken: string - access token of the user
 * @returns { status: boolean; message: string; result: any; }
 */

export const getUsers = async ({ page, limit, accessToken }: GetDataServer) => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/admin/user/list?page=${page}&limit=${limit}`,
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
      console.log("Error fetching users:", error);
    }
    return {
      status: false,
      message: "Lỗi server. Vui lòng thử lại sau!",
      result: {
        users: [],
        totalItems: 0,
      },
    };
  }
};

/**
 *
 * @param page: number - page number to fetch
 * @param limit: number - number of items per page
 * @param accessToken: string - access token of the user
 * @returns { status: boolean; message: string; result: any; }
 */

interface GetFeedbacks {
  page: number;
  limit: number;
  accessToken: string;
  slug?: string | "all";
}

export const getFeedbacks = async ({
  page,
  limit,
  accessToken,
  slug = "all",
}: GetFeedbacks) => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      slug: slug || "all",
    });

    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/admin/feedback/list?${params.toString()}`,
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
      console.log("Error fetching feedbacks:", error);
    }
    return {
      status: false,
      message: "Lỗi server. Vui lòng thử lại sau!",
      result: {
        feedbacks: [],
        totalItems: 0,
      },
    };
  }
};

/**
 *
 * @param page: number - page number to fetch
 * @param limit: number - number of items per page
 * @param accessToken: string - access token of the user
 * @returns { status: boolean; message: string; result: any; }
 */

export const getReports = async ({
  page,
  limit,
  accessToken,
}: GetDataServer) => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/admin/report/list?page=${page}&limit=${limit}`,
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
      console.log("Error fetching reports:", error);
    }
    return {
      status: false,
      message: "Lỗi server. Vui lòng thử lại sau!",
      result: {
        reports: [],
        totalItems: 0,
      },
    };
  }
};

interface GetMovieRequest {
  page: number;
  limit: number;
  accessToken: string;
  status?: "all" | "pending" | "approved" | "rejected";
}

export const getMovieRequests = async ({
  page,
  limit,
  accessToken,
  status = "all",
}: GetMovieRequest) => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      status: status,
    });

    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/admin/movie-request/list?${params.toString()}`,
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
      console.log("Error fetching movie requests:", error);
    }
    return {
      status: false,
      message: "Lỗi server. Vui lòng thử lại sau!",
      result: {
        items: [],
        totalItems: 0,
        has_more: false,
        status: "all",
      },
    };
  }
};
