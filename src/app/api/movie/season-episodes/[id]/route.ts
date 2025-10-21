import { fetcher, REVALIDATE_TIME } from "@/lib/fetcher";
import { NextRequest, NextResponse } from "next/server";
import {
  NEXT_PUBLIC_API_THEMOVIEDB_KEY,
  NEXT_PUBLIC_API_THEMOVIEDB_URL,
} from "@/constants/env.contant";

const API_THEMOVIEDB_URL = NEXT_PUBLIC_API_THEMOVIEDB_URL;
const API_THEMOVIEDB_KEY = NEXT_PUBLIC_API_THEMOVIEDB_KEY;

interface GetSeasonEpisodesParams {
  id: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<GetSeasonEpisodesParams> }
) {
  try {
    const search = req.nextUrl.searchParams;
    const { id: tmdbId } = await params;

    const season = search.get("season") || "1";

    const baseUrl = `${API_THEMOVIEDB_URL}/tv/${tmdbId}/season/${season}?api_key=${API_THEMOVIEDB_KEY}`;

    const response = await fetcher(baseUrl, {
      next: {
        revalidate: REVALIDATE_TIME,
      },
    });

    if (!response.ok) {
      return NextResponse.json({
        status: false,
        message: `Failed to fetch season episodes: ${response.statusText}`,
        result: null,
      });
    }

    const data = await response.json();

    return NextResponse.json(
      {
        status: true,
        message: "Thành công",
        result: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching season episodes:", error);
    return NextResponse.json({
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    });
  }
}
