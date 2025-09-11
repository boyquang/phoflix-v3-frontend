import {
  NEXT_PUBLIC_API_VERSION,
  NEXT_PUBLIC_CRAWL_MOVIES_URL,
} from "@/constants/env.contant";
import { fetcher, REVALIDATE_TIME } from "@/lib/fetcher";
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

    // const baseUrl = `${API_URL}/danh-sach/phim-moi-cap-nhat${versionPath}`;

    const baseUrl = `${CRAWL_MOVIES_URL}/movies/latest`;
    const url = new URL(baseUrl);

    url.searchParams.append("page", page);
    url.searchParams.append("limit", limit);

    const response = await fetcher(url.toString(), {
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch newly updated movies" },
        { status: 500 }
      );
    }

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
