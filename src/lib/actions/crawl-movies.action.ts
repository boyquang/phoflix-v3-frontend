import { NEXT_PUBLIC_CRAWL_MOVIES_URL } from "@/constants/env.contant";
import { fetcher } from "../fetcher";

const BASE_URL = NEXT_PUBLIC_CRAWL_MOVIES_URL;

type CrawlAction = "create" | "update";

interface CrawlMovieParams {
  action: CrawlAction;
  accessToken: string;
  limit?: number;
}

export const crawlMovies = async (params: CrawlMovieParams) => {
  const { action, accessToken, limit = 10 } = params;

  try {
    const url = `${BASE_URL}/crawl/crawlMovies?type=${action}&limit=${limit}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error starting crawl movies:", error);
    return {
      status: false,
      message: "Lỗi khi bắt đầu quá trình thu thập phim.",
    };
  }
};

export const checkIsCrawling = async (accessToken: string) => {
  try {
    const url = `${BASE_URL}/crawl/checkIsCrawling`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      return {
        status: data?.status || false,
        isCrawling: false,
        message: data?.message || "Lỗi khi kiểm tra trạng thái thu thập.",
      };
    }

    return data;
  } catch (error) {
    console.error("Error checking crawl status:", error);
    return {
      status: false,
      isCrawling: false,
      message: "Lỗi khi kiểm tra trạng thái thu thập.",
    };
  }
};

export const pauseCrawling = async (accessToken: string) => {
  try {
    const url = `${BASE_URL}/crawl/pauseCrawling`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      return {
        status: data?.status || false,
        isCrawling: true,
        message: data?.message || "Lỗi khi tạm dừng quá trình thu thập.",
      };
    }

    return data;
  } catch (error) {
    console.error("Error pausing crawl:", error);
    return {
      status: false,
      isCrawling: true,
      message: "Lỗi khi tạm dừng quá trình thu thập.",
    };
  }
};

export const fetchMovieStats = async (accessToken: string) => {
  try {
    const url = `${BASE_URL}/api/v1/movies/stats`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      return {
        status: data?.status || false,
        message: data?.message || "Lỗi khi lấy thống kê phim.",
        data: null,
      };
    }

    return data;
  } catch (error) {
    console.error("Error fetching movie stats:", error);
    return {
      status: false,
      message: "Lỗi khi lấy thống kê phim.",
      data: null,
    };
  }
};

export const resetCrawlStatus = async (accessToken: string) => {
  try {
    const url = `${BASE_URL}/crawl/resetCrawlStatus`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      return {
        status: data?.status || false,
        message: data?.message || "Lỗi khi đặt lại trạng thái cào.",
      };
    }

    return data;
  } catch (error) {
    console.error("Error resetting crawl status:", error);
    return {
      status: false,
      message: "Lỗi khi đặt lại trạng thái cào.",
    };
  }
};

export const syncMovieData = async (slug: string, accessToken: string) => {
  try {
    const url = `${BASE_URL}/crawl/syncMovieDataBySlug`;

    const response = await fetcher(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ slug }),
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
      message: "Đồng bộ dữ liệu phim thành công.",
      result: null,
    };
  } catch (error) {
    console.error("Failed to sync movie data:", error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};
