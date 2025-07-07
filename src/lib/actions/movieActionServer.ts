import {
  NEXT_PUBLIC_API_THEMOVIEDB_KEY,
  NEXT_PUBLIC_SITE_URL,
  NEXTAUTH_SECRET,
} from "@/lib/env";
import { fetcher, IS_SUCCESS, REVALIDATE_TIME } from "../fetcher";

export async function fetchMovieInfo(slug: string) {
  try {
    const response = await fetcher(
      `${NEXT_PUBLIC_SITE_URL}/api/movie/info/${slug}`,
      {
        next: {
          revalidate: REVALIDATE_TIME,
        },
      }
    );

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
    const baseUrl = `${NEXT_PUBLIC_SITE_URL}/api/movie/search`;
    const url = new URL(baseUrl);

    url.searchParams.append("keyword", keyword);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("limit", limit.toString());

    const response = await fetcher(url.toString(), {
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
    const baseUrl = `${NEXT_PUBLIC_SITE_URL}/api/movie/detail/${describe}/${slug}`;
    const url = new URL(baseUrl);

    url.searchParams.append("page", page.toString());
    url.searchParams.append("limit", limit.toString());

    if (country) url.searchParams.append("country", country);

    const response = await fetcher(url.toString(), {
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
    const baseUrl = `${NEXT_PUBLIC_SITE_URL}/api/movie/advance-filter`;
    const url = new URL(baseUrl);

    url.searchParams.append("keyword", keyword);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("sort_type", sort_type);

    if (country) url.searchParams.append("country", country);
    if (category) url.searchParams.append("category", category);
    if (sort_lang) url.searchParams.append("sort_lang", sort_lang);
    if (year) url.searchParams.append("year", year);

    const response = await fetcher(url.toString(), {
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
    const baseUrl = `${NEXT_PUBLIC_SITE_URL}/api/movie/newly-updated/${version}`;
    const url = new URL(baseUrl);

    url.searchParams.append("page", page.toString());
    url.searchParams.append("limit", limit.toString());

    const response = await fetcher(url.toString(), {
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching newly updated movies: ${response.statusText}`
      );
    }

    const dataJson = await response.json();

    return {
      items: dataJson?.items || [],
      pagination: dataJson?.pagination || {},
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
    const baseUrl = `${NEXT_PUBLIC_SITE_URL}/api/movie/popular`;
    const url = new URL(baseUrl);

    url.searchParams.append("page", page.toString());

    const response = await fetcher(url.toString(), {
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
    let baseUrl = "";

    if (type === "tv") {
      baseUrl = `${NEXT_PUBLIC_SITE_URL}/api/movie/actors-by-movie/${id}?type=${type}&season=${season}`;
    } else if (type === "movie") {
      baseUrl = `${NEXT_PUBLIC_SITE_URL}/api/movie/actors-by-movie/${id}?type=${type}`;
    }

    const response = await fetcher(baseUrl, {
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
    const baseUrl = `${NEXT_PUBLIC_SITE_URL}/api/movie/actors`;
    const url = new URL(baseUrl);

    url.searchParams.append("page", page.toString());
    url.searchParams.append("language", language);

    const response = await fetcher(url.toString(), {
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
    const baseUrl = `${NEXT_PUBLIC_SITE_URL}/api/movie/actor-detail/${id}`;
    const url = new URL(baseUrl);

    url.searchParams.append("language", language);

    const response = await fetcher(url.toString(), {
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
    const baseUrl = `${NEXT_PUBLIC_SITE_URL}/api/movie/movies-by-actor/${id}`;
    const url = new URL(baseUrl);

    url.searchParams.append("language", language);

    const response = await fetcher(url.toString(), {
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
