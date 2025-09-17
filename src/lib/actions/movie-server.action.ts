"use server";

import {
  NEXT_PUBLIC_API_VERSION,
  NEXT_PUBLIC_CRAWL_MOVIES_URL,
} from "@/constants/env.contant";
import { revalidatePath } from "next/cache";
import { fetcher } from "../fetcher";

const CRAWL_MOVIES_URL = `${NEXT_PUBLIC_CRAWL_MOVIES_URL}/api/${NEXT_PUBLIC_API_VERSION}`;

export const updateMovie = async (
  movieId: string,
  movieData: MovieDetail | null
) => {
  try {
    const url = `${CRAWL_MOVIES_URL}/movies/${movieId}`;

    const response = await fetcher(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: false,
        message: data?.message || "Lỗi server! Vui lòng thử lại sau.",
        result: null,
      };
    }


    return {
      status: true,
      message: "Cập nhật phim thành công.",
      result: {
        movie: data,
      },
    };
  } catch (error) {
    console.error("Failed to update movie:", error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};
