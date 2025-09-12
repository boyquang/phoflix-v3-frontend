import {
  NEXT_PUBLIC_API_VERSION,
  NEXT_PUBLIC_CRAWL_MOVIES_URL,
} from "@/constants/env.contant";
import { appendParams } from "@/lib/appendParams";
import { fetcher, REVALIDATE_TIME } from "@/lib/fetcher";
import { fetchWithFallback } from "@/lib/fetchWithFallback";
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
    const query = {
      page: search.get("page") || "1",
      limit: search.get("limit") || "24",
      keyword: search.get("keyword") || "",
    };

    const primaryUrlObj = new URL(`${CRAWL_MOVIES_URL}/movies/search`);
    const fallbackUrlObj = new URL(`${API_URL}/v1/api/tim-kiem`);

    appendParams(primaryUrlObj, query);
    appendParams(fallbackUrlObj, query);

    const response = await fetchWithFallback(
      primaryUrlObj.toString(),
      fallbackUrlObj.toString(), {
        next: { revalidate: REVALIDATE_TIME },
      }
    );
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
