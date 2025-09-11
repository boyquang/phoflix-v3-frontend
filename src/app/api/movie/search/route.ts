import {
  NEXT_PUBLIC_API_VERSION,
  NEXT_PUBLIC_CRAWL_MOVIES_URL,
} from "@/constants/env.contant";
import { fetcher, REVALIDATE_TIME } from "@/lib/fetcher";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CRAWL_MOVIES_URL = `${NEXT_PUBLIC_CRAWL_MOVIES_URL}/api/${NEXT_PUBLIC_API_VERSION}`;

interface MovieSearchParams {
  keyword: string;
  page: number;
  limit?: number | undefined;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<MovieSearchParams> }
) {
  try {
    const search = req.nextUrl.searchParams;
    const page = search.get("page") || "1";
    const limit = search.get("limit") || "24";
    const keyword = search.get("keyword") || "";

    // const baseUrl = `${API_URL}/v1/api/tim-kiem`;
    const baseUrl = `${CRAWL_MOVIES_URL}/movies/search`;
    const url = new URL(baseUrl);

    url.searchParams.append("keyword", keyword);
    url.searchParams.append("page", page);
    url.searchParams.append("limit", limit);

    const response = await fetcher(url.toString(), {
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch movie search results" },
        { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching movie search:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie search results" },
      { status: 500 }
    );
  }
}
