"use server";

import {
  ENV,
  NEXT_PUBLIC_API_VERSION as API_VERSION,
  NEXT_PUBLIC_BACKEND_URL as BACKEND_URL,
} from "../../constants/env.contant";

interface GetDataServer {
  page: number;
  limit: number;
  accessToken: string;
}

interface ResponseServer {
  status: boolean;
  message: string;
  result: any;
  errorType?: "InvalidToken" | "ServerError" | null;
}

const BASE_URL = `${BACKEND_URL}/api/${API_VERSION}/admin`;

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
}: GetDataServer): Promise<ResponseServer> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const url = `${BASE_URL}/notifications?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data: ResponseServer = await response.json();

    if (!response.ok) {
      const { status, message, errorType } = data || {};

      return {
        status: status || false,
        message: message || "Lỗi server! Vui lòng thử lại sau.",
        result: null,
        errorType: errorType || "ServerError",
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
      result: null,
      errorType: "ServerError",
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

export const getUsers = async ({
  page,
  limit,
  accessToken,
}: GetDataServer): Promise<ResponseServer> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const url = `${BASE_URL}/user/list?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data: ResponseServer = await response.json();

    if (!response.ok) {
      const { status, message, errorType } = data || {};

      return {
        status: status || false,
        message: message || "Lỗi server! Vui lòng thử lại sau.",
        result: null,
        errorType: errorType || "ServerError",
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
      result: null,
      errorType: "ServerError",
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
}: GetFeedbacks): Promise<ResponseServer> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      slug: slug || "all",
    });

    const url = `${BASE_URL}/feedback/list?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data: ResponseServer = await response.json();

    if (!response.ok) {
      const { status, message, errorType } = data || {};

      return {
        status: status || false,
        message: message || "Lỗi server! Vui lòng thử lại sau.",
        result: null,
        errorType: errorType || "ServerError",
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
      result: null,
      errorType: "ServerError",
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
}: GetDataServer): Promise<ResponseServer> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const url = `${BASE_URL}/report/list?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data: ResponseServer = await response.json();

    if (!response.ok) {
      const { status, message, errorType } = data || {};

      return {
        status: status || false,
        message: message || "Lỗi server! Vui lòng thử lại sau.",
        result: null,
        errorType: errorType || "ServerError",
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
      result: null,
      errorType: "ServerError",
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
}: GetMovieRequest): Promise<ResponseServer> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      status: status,
    });

    const url = `${BASE_URL}/movie-request/list?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data: ResponseServer = await response.json();

    if (!response.ok) {
      const { status, message, errorType } = data || {};

      return {
        status: status || false,
        message: message || "Lỗi server! Vui lòng thử lại sau.",
        result: null,
        errorType: errorType || "ServerError",
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
      result: null,
      errorType: "ServerError",
    };
  }
};
