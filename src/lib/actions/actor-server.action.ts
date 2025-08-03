"use server";

import { getKeyErrorResponse } from "@/constants/error-response.contant";
import {
  ENV,
  NEXT_PUBLIC_API_THEMOVIEDB_KEY,
  NEXT_PUBLIC_API_THEMOVIEDB_URL,
} from "../../constants/env.contant";

const BASE_URL = `${NEXT_PUBLIC_API_THEMOVIEDB_URL}/person`;

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
    const params = new URLSearchParams({
      api_key: NEXT_PUBLIC_API_THEMOVIEDB_KEY as string,
      language,
    });

    const url = `${BASE_URL}/${actorId}?${params.toString()}`;

    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return getKeyErrorResponse(response.status);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (ENV === "development") {
      console.log("Error fetching actor details:", error);
    }
    return getKeyErrorResponse();
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
    const params = new URLSearchParams({
      api_key: NEXT_PUBLIC_API_THEMOVIEDB_KEY as string,
      language,
    });

    const url = `${NEXT_PUBLIC_API_THEMOVIEDB_URL}/person/${actorId}/combined_credits?${params.toString()}`;

    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return getKeyErrorResponse();
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (ENV === "development") {
      console.log("Error fetching movies by actor:", error);
    }
    return getKeyErrorResponse();
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
    const params = new URLSearchParams({
      api_key: NEXT_PUBLIC_API_THEMOVIEDB_KEY as string,
      language,
      page: page.toString(),
    });

    const url = `${NEXT_PUBLIC_API_THEMOVIEDB_URL}/person/popular?${params.toString()}`;

    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return getKeyErrorResponse(response.status);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (ENV === "development") {
      console.log("Error fetching actor list:", error);
    }
    return getKeyErrorResponse();
  }
};
