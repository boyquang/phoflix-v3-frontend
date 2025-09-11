import { NEXT_PUBLIC_CRAWL_MOVIES_URL } from "@/constants/env.contant";

const BASE_URL = NEXT_PUBLIC_CRAWL_MOVIES_URL;

type CrawlAction = "create" | "update";

export const crawlMovies = async (action: CrawlAction, limit: number = 10) => {
  try {
    const url = `${BASE_URL}/crawl/crawlMovies?type=${action}&limit=${limit}`;

    const response = await fetch(url);

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

export const checkIsCrawling = async () => {
  try {
    const url = `${BASE_URL}/crawl/checkIsCrawling`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

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

export const pauseCrawling = async () => {
  try {
    const url = `${BASE_URL}/crawl/pauseCrawling`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

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

export const fetchMovieStats = async () => {
  try {
    const url = `${BASE_URL}/api/v1/movies/stats`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching movie stats:", error);
    return {
      status: false,
      message: "Lỗi khi lấy thống kê phim.",
      data: {
        totalMovies: 0,
        totalSeries: 0,
        totalSingles: 0,
        totalTVShows: 0,
        totalAnimations: 0,
        totalCinemas: 0,
      },
    };
  }
};

export const resetCrawlStatus = async () => {
  try {
    const url = `${BASE_URL}/crawl/resetCrawlStatus`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error resetting crawl status:", error);
    return {
      status: false,
      message: "Lỗi khi đặt lại trạng thái cào.",
    };
  }
};
