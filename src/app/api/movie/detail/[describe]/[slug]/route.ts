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

interface MovieDetailParams {
  describe: "quoc-gia" | "the-loai" | "danh-sach";
  slug: string;
  page: number;
  target?: "detail" | "suggestion";
  limit?: number;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<MovieDetailParams> }
) {
  try {
    const { slug, describe } = await params;
    const search = req.nextUrl.searchParams;

    const query = {
      page: search.get("page") || "1",
      limit: search.get("limit") || "24",
    };

    const primaryUrlObj = new URL(`${CRAWL_MOVIES_URL}/movies/${slug}`);
    const fallbackUrlObj = new URL(`${API_URL}/v1/api/${describe}/${slug}`);

    appendParams(primaryUrlObj, query);
    appendParams(fallbackUrlObj, query);

    const response = await fetchWithFallback(
      primaryUrlObj.toString(),
      fallbackUrlObj.toString(),
      {
        next: { revalidate: REVALIDATE_TIME },
      }
    );
    const data = await response.json();
    
    console.log("data", data);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching movie detail:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie detail" },
      { status: 500 }
    );
  }
}
