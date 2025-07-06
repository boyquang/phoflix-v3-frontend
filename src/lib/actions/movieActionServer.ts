import { NEXTAUTH_URL } from "@/lib/env";

const REVALIDATE_TIME = 60 * 60; // 1 hour
const IS_SUCCESS = "success";

export async function fetchMovieInfo(slug: string) {
  try {
    const response = await fetch(`${NEXTAUTH_URL}/api/movie/info/${slug}`, {
      next: {
        revalidate: REVALIDATE_TIME,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching movie info: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      movie: data?.movie || {},
      episodes: data?.episodes || [],
      status: data?.status === true || data?.status === IS_SUCCESS,
    };
  } catch (error) {
    console.error("Failed to fetch movie info:", error);
    return { status: false, movie: {}, episodes: [] };
  }
}

export async function fetchSearchMovies(
  keyword: string,
  page: number = 1,
  limit: number = 24
) {
  try {
    const response = await fetch(
      `${NEXTAUTH_URL}/api/movie/search?keyword=${keyword}&page=${page}&limit=${limit}`,
      { next: { revalidate: REVALIDATE_TIME } }
    );

    if (!response.ok) {
      throw new Error(`Error fetching search results: ${response.statusText}`);
    }

    const dataJson = await response.json();

    return {
      movies: dataJson.data?.items || [],
      pagination: dataJson.data?.params?.pagination || {},
      seoOnPage: dataJson.data?.seoOnPage || {},
      status: dataJson?.status === true || dataJson?.status === IS_SUCCESS,
    };
  } catch (error) {
    console.error("Failed to fetch search movies:", error);
    return {
      movies: [],
      seoOnPage: {},
      pagination: {},
      status: false,
    };
  }
}

export async function fetchMovieDetail(
  describe: string,
  slug: string,
  page: number = 1,
  limit: number = 24
) {
  try {
    const response = await fetch(
      `${NEXTAUTH_URL}/api/movie/detail/${describe}/${slug}?page=${page}&limit=${limit}`,
      { next: { revalidate: REVALIDATE_TIME } }
    );

    if (!response.ok) {
      throw new Error(`Error fetching movie detail: ${response.statusText}`);
    }

    const dataJson = await response.json();

    return {
      items: dataJson?.data?.items || [],
      pagination: dataJson?.data?.params.pagination || {},
      seoOnPage: dataJson?.data?.seoOnPage || {},
      titlePage: dataJson?.data?.titlePage || "",
      status: dataJson?.status === true || dataJson?.status === IS_SUCCESS,
    };
  } catch (error) {
    console.error("Failed to fetch movie detail:", error);
    return {
      items: [],
      pagination: {},
      titlePage: "Danh sách phim",
      seoOnPage: {},
      status: false,
    };
  }
}

interface AdvanceFilterParams {
  keyword: string;
  page?: number;
  limit?: number;
  country?: string;
  category?: string;
  sort_lang?: string;
  year?: string;
  sort_type?: string;
}

export async function fetchAdvanceFilterMovies({
  keyword = "a",
  page = 1,
  limit = 24,
  country = "",
  category = "",
  sort_lang = "",
  year = "",
  sort_type = "desc",
}: AdvanceFilterParams) {
  try {
    const response = await fetch(
      `${NEXTAUTH_URL}/api/movie/advance-filter?keyword=${keyword}&page=${page}&limit=${limit}&country=${country}&category=${category}&sort_lang=${sort_lang}&year=${year}&sort_type=${sort_type}`,
      { next: { revalidate: REVALIDATE_TIME } }
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching advanced filter movies: ${response.statusText}`
      );
    }

    const dataJson = await response.json();

    return {
      items: dataJson?.data?.items || [],
      pagination: dataJson?.data?.params?.pagination || {},
      status: dataJson?.status === true || dataJson?.status === IS_SUCCESS,
    };
  } catch (error) {
    console.error("Failed to fetch advanced filter movies:", error);
    return {
      items: [],
      pagination: {},
      status: false,
    };
  }
}
