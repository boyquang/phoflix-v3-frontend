import {
  NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_API_VERSION,
  NEXT_PUBLIC_BACKEND_URL,
  NEXT_PUBLIC_CRAWL_MOVIES_URL,
} from "@/constants/env.contant";
import { fetcher, IS_SUCCESS, REVALIDATE_TIME } from "../fetcher";

const BASE_URL = `${NEXT_PUBLIC_SITE_URL}/api/movie`;
const BACKEND_URL = `${NEXT_PUBLIC_BACKEND_URL}/api/${NEXT_PUBLIC_API_VERSION}`;
const CRAWL_MOVIES_URL = `${NEXT_PUBLIC_CRAWL_MOVIES_URL}/api/${NEXT_PUBLIC_API_VERSION}`;

export async function fetchMovieInfo(slug: string, force: boolean = false) {
  try {
    const url = `${BASE_URL}/info/${slug}`;

    const response = await fetcher(url, {
      ...(force
        ? { cache: "no-store" }
        : { next: { revalidate: REVALIDATE_TIME } }),
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
    const params = new URLSearchParams({
      keyword,
      page: page.toString(),
      limit: limit.toString(),
    });

    const url = `${BASE_URL}/search?${params.toString()}`;

    const response = await fetcher(url, {
      next: { revalidate: REVALIDATE_TIME },
    });

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
  limit: number = 24,
  country?: Countries
) {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (country) {
      params.append("country", country);
    }

    const url = `${BASE_URL}/detail/${describe}/${slug}?${params.toString()}`;

    const response = await fetcher(url, {
      next: { revalidate: REVALIDATE_TIME },
    });

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
  page?: number;
  limit?: number;
  country?: string;
  category?: string;
  sort_lang?: string;
  year?: string;
  sort_type?: string;
}

export async function fetchAdvanceFilterMovies({
  page = 1,
  limit = 24,
  country = "",
  category = "",
  sort_lang = "",
  year = "",
  sort_type = "desc",
}: AdvanceFilterParams) {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sort_type,
    });

    if (country) params.append("country", country);
    if (category) params.append("category", category);
    if (sort_lang) params.append("sort_lang", sort_lang);
    if (year) params.append("year", year);

    const url = `${BASE_URL}/advance-filter?${params.toString()}`;

    const response = await fetcher(url, {
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching advanced filter movies: ${response.statusText}`
      );
    }

    const dataJson = await response.json();

    return {
      items: dataJson?.data?.items || [],
      pagination: dataJson?.data?.params?.pagination || {},
      titlePage: dataJson?.data?.titlePage || "",
      status: dataJson?.status === true || dataJson?.status === IS_SUCCESS,
    };
  } catch (error) {
    console.error("Failed to fetch advanced filter movies:", error);
    return {
      items: [],
      titlePage: "Danh sách phim",
      pagination: {},
      status: false,
    };
  }
}

export async function fetchNewlyUpdatedMovies(
  version: "v1" | "v2" | "v3" = "v3",
  limit: number = 24,
  page: number = 1
) {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const url = `${BASE_URL}/newly-updated/${version}?${params.toString()}`;

    const response = await fetcher(url, {
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching newly updated movies: ${response.statusText}`
      );
    }

    const dataJson = await response.json();

    return {
      items: dataJson?.data?.items || dataJson?.items || [],
      pagination:
        dataJson?.data?.params?.pagination ||
        dataJson?.params?.pagination ||
        {},
      status: dataJson?.status === true || dataJson?.status === IS_SUCCESS,
    };
  } catch (error) {
    console.error("Failed to fetch newly updated movies:", error);
    return {
      items: [],
      pagination: {},
      status: false,
    };
  }
}

export async function fetchMoviePopular(page: number) {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
    });

    const url = `${BASE_URL}/popular?${params.toString()}`;

    const response = await fetcher(url, {
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!response.ok) {
      throw new Error(`Error fetching popular movies: ${response.statusText}`);
    }

    const dataJson = await response.json();

    return {
      items: dataJson?.results || [],
      pagination: {
        totalPages: dataJson?.total_pages || 0,
        totalResults: dataJson?.total_results || 0,
      },
      status: true,
    };
  } catch (error) {
    console.error("Failed to fetch popular movies:", error);
    return {
      items: [],
      pagination: {},
      status: false,
    };
  }
}

export async function fetchActorsByMovie(
  type: "movie" | "tv",
  id: string,
  season?: number | string
) {
  try {
    const params = new URLSearchParams({
      type,
    });

    if (type === "tv" && season) {
      params.append("season", season.toString());
    }

    const url = `${BASE_URL}/actors-by-movie/${id}?${params.toString()}`;

    const response = await fetcher(url, {
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!response.ok) {
      throw new Error(`Error fetching actors by movie: ${response.statusText}`);
    }

    const dataJson = await response.json();

    return {
      actor: {
        cast: dataJson?.cast || [],
        crew: dataJson?.crew || [],
      },
      status: true,
    };
  } catch (error) {
    console.error("Failed to fetch actors by movie:", error);
    return {
      actor: { cast: [], crew: [] },
      status: false,
    };
  }
}

export async function fetchActors(page: number, language: string = "vi") {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      language,
    });

    const url = `${BASE_URL}/actors?${params.toString()}`;

    const response = await fetcher(url, {
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!response.ok) {
      throw new Error(`Error fetching actors: ${response.statusText}`);
    }

    const dataJson = await response.json();

    return {
      actors: dataJson?.results || [],
      pagination: {
        totalPages: dataJson?.total_pages || 0,
        totalResults: dataJson?.total_results || 0,
      },
      status: true,
    };
  } catch (error) {
    console.error("Failed to fetch actors:", error);
    return {
      actors: [],
      pagination: {},
      status: false,
    };
  }
}

export async function fetchActorDetail(id: number, language: string = "vi") {
  try {
    const params = new URLSearchParams({
      language,
    });

    const url = `${BASE_URL}/actor-detail/${id}?${params.toString()}`;

    const response = await fetcher(url, {
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!response.ok) {
      throw new Error(`Error fetching actor detail: ${response.statusText}`);
    }

    const dataJson = await response.json();

    return {
      data: dataJson || {},
      status: true,
    };
  } catch (error) {
    console.error("Failed to fetch actor detail:", error);
    return {
      actor: {},
      status: false,
    };
  }
}

export async function fetchMoviesByActor(id: number, language: string = "vi") {
  try {
    const params = new URLSearchParams({
      language,
    });

    const url = `${BASE_URL}/movies-by-actor/${id}/?${params.toString()}`;

    const response = await fetcher(url, {
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!response.ok) {
      throw new Error(`Error fetching movies by actor: ${response.statusText}`);
    }

    const dataJson = await response.json();

    return {
      movie: {
        cast: dataJson?.cast || [],
        crew: dataJson?.crew || [],
      },
      status: true,
    };
  } catch (error) {
    console.error("Failed to fetch movies by actor:", error);
    return {
      movies: [],
      status: false,
    };
  }
}

export const getMostFavoriteRanking = async (limit: number = 20) => {
  try {
    const response = await fetcher(
      `${BACKEND_URL}/movie/mostFavoriteRanking?limit=${limit}`
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        status: false,
        message: "Lỗi server! Vui lòng thử lại sau.",
        result: null,
      };
    }

    return {
      status: true,
      message: "Lấy danh sách phim yêu thích thành công.",
      result: data,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

export const getMostPopularRanking = async (limit: number = 20) => {
  try {
    const response = await fetcher(
      `${BACKEND_URL}/movie/mostPopularRanking?limit=${limit}`
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        status: false,
        message: "Lỗi server! Vui lòng thử lại sau.",
        result: null,
      };
    }

    return {
      status: true,
      message: "Lấy danh sách phim phổ biến thành công.",
      result: data,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

export const getMovieRakingList = async (
  type: "mostPopular" | "mostFavorite",
  limit: number = 20
) => {
  try {
    let url = "";

    if (type === "mostPopular") {
      url = `${BACKEND_URL}/movie/mostPopularRanking?limit=${limit}`;
    } else if (type === "mostFavorite") {
      url = `${BACKEND_URL}/movie/mostFavoriteRanking?limit=${limit}`;
    }

    const response = await fetcher(url);

    const data = await response.json();

    if (!response.ok) {
      return {
        status: false,
        message: "Lỗi server! Vui lòng thử lại sau.",
        result: null,
      };
    }

    return data;
  } catch (error) {
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

export const createNewMovie = async (
  movieData: MovieDetail | null,
  accessToken: string
) => {
  try {
    const url = `${CRAWL_MOVIES_URL}/movies/new-movie`;

    const response = await fetcher(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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
      message: "Tạo phim mới thành công.",
      result: {
        movie: data,
      },
    };
  } catch (error) {
    console.error("Failed to create new movie:", error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

interface UpdateMovieParams {
  movieId: string;
  movieData: MovieDetail | null;
  accessToken: string;
}

export const updateMovie = async ({
  movieId,
  movieData,
  accessToken,
}: UpdateMovieParams) => {
  try {
    const url = `${CRAWL_MOVIES_URL}/movies/${movieId}`;

    const response = await fetcher(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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

export const deleteMovie = async (ids: string, accessToken: string) => {
  try {
    const url = `${CRAWL_MOVIES_URL}/movies`;

    const response = await fetcher(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ids: [ids] }),
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
      message: "Xoá phim thành công.",
      result: {
        movie: data,
      },
    };
  } catch (error) {
    console.error("Failed to delete movie:", error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};
