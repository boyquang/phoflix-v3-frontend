import {
  fetchActorsByMovie,
  fetchAdvanceFilterMovies,
  fetchMovieDetail,
  fetchMovieInfo,
  fetchMoviePopular,
  fetchNewlyUpdatedMovies,
  fetchSearchMovies,
} from "@/lib/actions/movieActionServer";
import { createAsyncThunk } from "@reduxjs/toolkit";

const ENVIRONMENT = process.env.ENV;

export const fetchDataSlideShow = createAsyncThunk(
  "movie/fetchDataSlideShow",
  async () => {
    try {
      const response = await fetchNewlyUpdatedMovies();

      return response;
    } catch (error) {
      if (ENVIRONMENT === "development") {
        console.log("Error in fetchDataSlideShow:", error);
      }
      throw error;
    }
  }
);

interface FetchDataMovie {
  type:
    | "phim-le"
    | "phim-bo"
    | "tv-shows"
    | "hoat-hinh"
    | "phim-vietsub"
    | "phim-thuyet-minh"
    | "phim-long-tieng"
    | Categories
    | Countries;
  describe: "danh-sach" | "quoc-gia" | "the-loai";
  params?: {
    limit?: number;
    page?: number;
  };
}

/**
 * * @param type - The type of movie to fetch.
 * * @param describe - The description of the movie.
 * * @param params - The parameters for pagination.
 */

export const fetchDataMovie = createAsyncThunk(
  "movie/fetchDataMovie",
  async (
    {
      type,
      describe = "danh-sach",
      params = { limit: 10, page: 1 },
    }: FetchDataMovie,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchMovieDetail(
        describe,
        type,
        params.page,
        params.limit
      );

      return {
        res: response,
        type,
      };
    } catch (error: any) {
      return rejectWithValue({
        error: error.message,
        type,
      });
    }
  }
);

export type Describe = "danh-sach" | "the-loai" | "quoc-gia";
interface FetchDataMovieDetail {
  describe: Describe;
  slug: string;
  page: number;
  target?: "detail" | "suggestion";
  limit?: number;
}

/**
 * * @param describe - The description of the movie.
 * * @param slug - The slug of the movie.
 * * @param page - The page number for pagination.
 * * @param limit - The limit of movies per page.
 * * @param target - The target for the data (detail or suggestion).
 */

export const fetchDataMovieDetail = createAsyncThunk(
  "movie/fetchDataMovieDetail",
  async (
    {
      describe,
      slug,
      page = 1,
      limit = 24,
      target = "detail",
    }: FetchDataMovieDetail,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchMovieDetail(describe, slug, page, limit);

      return {
        data: response,
        target,
      };
    } catch (error: any) {
      if (ENVIRONMENT === "development") {
        console.log("Error in fetchDataMovieDetail:", error);
      }
      return rejectWithValue({
        error: error.message,
      });
    }
  }
);

interface FetchDataMoviePreview {
  keyword: string;
  limit: number;
}

/**
 * * * @param keyword - The keyword to search for movies.
 * * * @param limit - The maximum number of movies to fetch.
 */

export const fetchDataMoviePreview = createAsyncThunk(
  "movie/fetchDataMoviePreview",
  async ({ keyword, limit }: FetchDataMoviePreview, { rejectWithValue }) => {
    try {
      const response = await fetchSearchMovies(keyword, 1, limit);

      return response;
    } catch (error: any) {
      if (ENVIRONMENT === "development") {
        console.log("Error in fetchDataMoviePreview:", error);
      }
      return rejectWithValue({
        error: error.message,
      });
    }
  }
);

interface FetchDataMovieSearch {
  keyword: string;
  page: number;
  limit: number;
  sort_lang?: "long-tieng" | "thuyet-minh" | "vietsub" | "";
  category?: Categories | "";
  country?: Countries | "";
  year?: number | "";
  sort_type?: "asc" | "desc";
}

/**
 * * * @param keyword - The keyword to search for movies.
 * * * @param page - The page number for pagination.
 * * * @param limit - The maximum number of movies to fetch.
 * * * @param sort_lang - The language of the movie (long-tieng, thuyet-minh, vietsub).
 * * * @param category - The category of the movie.
 * * * @param country - The country of the movie.
 * * * @param year - The year of the movie.
 * * * @param sort_type - The sorting type (asc, desc).
 */

export const fetchDataMovieSearch = createAsyncThunk(
  "movie/fetchDataMovieSearch",
  async (
    {
      keyword,
      page = 1,
      limit = 24,
      sort_lang = "",
      category = "",
      country = "",
      year = "",
      sort_type = "desc",
    }: FetchDataMovieSearch,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchAdvanceFilterMovies({
        keyword,
        page,
        limit,
        country,
        category,
        sort_lang,
        year: year.toString(),
        sort_type,
      });

      return response;
    } catch (error: any) {
      if (ENVIRONMENT === "development") {
        console.log("Error in fetchDataMovieSearch:", error);
      }
      return rejectWithValue({
        error: error.message,
      });
    }
  }
);

interface FetchMovieInfo {
  slug: string;
  page: "watching" | "info";
}

/**
 * * * @param slug - The slug of the movie.
 * * * @param page - The page number for pagination.
 */

export const fetchDataMovieInfo = createAsyncThunk(
  "movie/fetchMovieInfo",
  async ({ slug, page }: FetchMovieInfo, { rejectWithValue }) => {
    try {
      const response = await fetchMovieInfo(slug);

      return response;
    } catch (error: any) {
      if (ENVIRONMENT === "development") {
        console.log("Error in fetchDataMovieInfo:", error);
      }
      return rejectWithValue({
        error: error.message,
        page,
      });
    }
  }
);

interface FetchDataMovieEvent {
  slug: string;
  describe: Describe;
  country?: "viet-nam";
  limit?: number;
}

export const fetchDataMovieEvent = createAsyncThunk(
  "movie/fetchDataMovieEvent",
  async (
    { slug, describe, limit = 10, country = "viet-nam" }: FetchDataMovieEvent,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchMovieDetail(
        describe,
        slug,
        1,
        limit,
        country
      );

      if (!response.status) {
        throw new Error("Fetch failed");
      }

      return response;
    } catch (error: any) {
      if (ENVIRONMENT === "development") {
        console.log("Error in fetchDataMovieEvent:", error);
      }
      return rejectWithValue({
        error: error.message,
      });
    }
  }
);

interface FetchActorsListByMovie {
  type: "movie" | "tv";
  id: string;
  season?: number | string;
}

export const fetchActorsListByMovie = createAsyncThunk(
  "movie/fetchActorsListByMovie",
  async ({ type, season, id }: FetchActorsListByMovie, { rejectWithValue }) => {
    try {
      // let baseUrl = "";

      // if (type === "tv") {
      //   baseUrl = `${API_THEMOVIEDB_URL}/tv/${id}/season/${season}/credits?api_key=${API_THEMOVIEDB_KEY}`;
      // } else if (type === "movie") {
      //   baseUrl = `${API_THEMOVIEDB_URL}/movie/${id}/credits?api_key=${API_THEMOVIEDB_KEY}`;
      // }

      // const response = await fetch(baseUrl);

      // if (!response.ok) {
      //   throw new Error("Fetch failed");
      // }

      // const data = await response.json();

      // return data;

      const response = await fetchActorsByMovie(
        type,
        id,
        season ? season.toString() : ""
      );

      return response;
    } catch (error: any) {
      if (ENVIRONMENT === "development") {
        console.log("Error in fetchActorsListByMovie:", error);
      }
      return rejectWithValue({
        error: error.message,
      });
    }
  }
);

interface FetchMoviePopular {
  page: number;
}

export const fetchDataMoviePopular = createAsyncThunk(
  "movie/fetchDataMoviePopular",
  async ({ page = 1 }: FetchMoviePopular, { rejectWithValue }) => {
    try {
      const response = await fetchMoviePopular(page);

      if (!response.status) {
        throw new Error("Fetch failed");
      }

      return response;
    } catch (error: any) {
      if (ENVIRONMENT === "development") {
        console.log("Error in fetchDataMoviePopular:", error);
      }
      return rejectWithValue({
        error: error.message,
      });
    }
  }
);
