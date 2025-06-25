"use server";

import {
  ENV,
  NEXT_PUBLIC_API_THEMOVIEDB_KEY,
  NEXT_PUBLIC_API_THEMOVIEDB_URL,
} from "../env";

interface GetActorDetails {
  actorId: number;
  language?: string;
}

/**
 * Lấy thông tin chi tiết của diễn viên từ The Movie Database API
 * @param actorId - ID của diễn viên
 * @param language - Ngôn ngữ trả về (mặc định là "vi")
 * @return - Thông tin chi tiết của diễn viên hoặc thông báo lỗi
 */

export const getActorDetails = async ({
  actorId,
  language = "vi",
}: GetActorDetails) => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_THEMOVIEDB_URL}/person/${actorId}?api_key=${NEXT_PUBLIC_API_THEMOVIEDB_KEY}&language=${language}`,
      {
        next: { revalidate: 60 },
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
      console.log("Error fetching actor details:", error);
    }
    return null;
  }
};

interface GetMoviesByActor {
  actorId: number;
  language?: string;
}

/**
 * Lấy danh sách phim của diễn viên từ The Movie Database API
 * @param actorId - ID của diễn viên
 * @param language - Ngôn ngữ trả về (mặc định là "vi")
 * @return - Danh sách phim của diễn viên hoặc thông báo lỗi
 */

export const getMoviesByActor = async ({
  actorId,
  language = "vi",
}: GetMoviesByActor) => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_THEMOVIEDB_URL}/person/${actorId}/combined_credits?api_key=${NEXT_PUBLIC_API_THEMOVIEDB_KEY}&language=${language}`,
      {
        next: { revalidate: 60 },
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
      console.log("Error fetching movies by actor:", error);
    }
    return null;
  }
};

interface GetActorList {
  page?: number;
  language?: string;
}

/**
 * Lấy danh sách diễn viên phổ biến từ The Movie Database API
 * @param page - Số trang (mặc định là 1)
 * @param language - Ngôn ngữ trả về (mặc định là "vi")
 * @return - Danh sách diễn viên hoặc thông báo lỗi
 */

export const getActorList = async ({
  page = 1,
  language = "vi",
}: GetActorList) => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_THEMOVIEDB_URL}/person/popular?api_key=${NEXT_PUBLIC_API_THEMOVIEDB_KEY}&language=${language}&page=${page}`,
      {
        next: { revalidate: 60 },
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
      console.log("Error fetching actor list:", error);
    }
    return null;
  }
};
