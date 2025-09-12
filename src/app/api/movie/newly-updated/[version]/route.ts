import {
  NEXT_PUBLIC_API_VERSION,
  NEXT_PUBLIC_CRAWL_MOVIES_URL,
} from "@/constants/env.contant";
import { fetcher, REVALIDATE_TIME } from "@/lib/fetcher";
import { fetchWithFallback } from "@/lib/fetchWithFallback";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CRAWL_MOVIES_URL = `${NEXT_PUBLIC_CRAWL_MOVIES_URL}/api/${NEXT_PUBLIC_API_VERSION}`;

interface NewlyUpdatedMoviesParams {
  version?: "v1" | "v2" | "v3";
  limit?: number;
  page?: number;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<NewlyUpdatedMoviesParams> }
) {
  try {
    const search = req.nextUrl.searchParams;
    const { version } = await params;

    const limit = search.get("limit") || "24";
    const page = search.get("page") || "1";
    const versionPath = version !== "v1" ? `-${version}` : "";

    const primaryUrl = `${CRAWL_MOVIES_URL}/movies/latest?page=${page}&limit=${limit}`;
    const fallbackUrl = `${API_URL}/danh-sach/phim-moi-cap-nhat${versionPath}?page=${page}&limit=${limit}`;

    const response = await fetchWithFallback(primaryUrl, fallbackUrl, {
      next: { revalidate: REVALIDATE_TIME },
    });

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Error fetching newly updated movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch newly updated movies" },
      { status: 500 }
    );
  }
}
