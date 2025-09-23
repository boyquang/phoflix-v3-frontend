import {
  NEXT_PUBLIC_API_VERSION,
  NEXT_PUBLIC_CRAWL_MOVIES_URL,
} from "@/constants/env.contant";
import { fetcher, REVALIDATE_TIME } from "@/lib/fetcher";
import { fetchWithFallback } from "@/lib/fetchWithFallback";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CRAWL_MOVIES_URL = `${NEXT_PUBLIC_CRAWL_MOVIES_URL}/api/${NEXT_PUBLIC_API_VERSION}`;

interface MovieInfoParams {
  slug: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<MovieInfoParams> }
) {
  try {
    const { slug } = await params;
    const search = req.nextUrl.searchParams;
    const updated = search.get("updated") === "true";

    const primaryUrl = `${CRAWL_MOVIES_URL}/movies/info/${slug}`;
    const fallbackUrl = `${API_URL}/phim/${slug}`;

    const response = await fetchWithFallback(primaryUrl, fallbackUrl, {
      ...(updated
        ? { cache: "no-store" }
        : { next: { revalidate: REVALIDATE_TIME } }),
    });
    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching movie info:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie info" },
      { status: 500 }
    );
  }
}
