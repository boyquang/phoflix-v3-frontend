import {
  NEXT_PUBLIC_API_VERSION,
  NEXT_PUBLIC_CRAWL_MOVIES_URL,
} from "@/constants/env.contant";
import { fetcher, REVALIDATE_TIME } from "@/lib/fetcher";
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

    // const response = await fetcher(`${API_URL}/phim/${slug}`, {
    //   next: {
    //     revalidate: REVALIDATE_TIME,
    //   },
    // });

    const response = await fetcher(`${CRAWL_MOVIES_URL}/movies/info/${slug}`, {
      headers: {
        // Add any required headers here
        "Content-Type": "application/json",
      },
      // If you want to revalidate the cache every REVALIDATE_TIME seconds
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch movie info" },
        { status: 500 }
      );
    }

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
