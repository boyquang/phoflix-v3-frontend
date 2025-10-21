import { fetcher, REVALIDATE_TIME } from "@/lib/fetcher";
import { NextRequest, NextResponse } from "next/server";

const API_THEMOVIEDB_URL = process.env.NEXT_PUBLIC_API_THEMOVIEDB_URL;
const API_THEMOVIEDB_KEY = process.env.NEXT_PUBLIC_API_THEMOVIEDB_KEY;

interface MovieActorsByMovieParams {
  type: "movie" | "tv";
  id: string;
  season?: number | string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<MovieActorsByMovieParams> }
) {
  try {
    let baseUrl = "";

    const search = req.nextUrl.searchParams;
    const { id } = await params;

    const type = search.get("type") as "movie" | "tv";
    const season = search.get("season") || "";

    if (type === "tv") {
      baseUrl = `${API_THEMOVIEDB_URL}/tv/${id}/season/${season}/credits?api_key=${API_THEMOVIEDB_KEY}`;
    } else if (type === "movie") {
      baseUrl = `${API_THEMOVIEDB_URL}/movie/${id}/credits?api_key=${API_THEMOVIEDB_KEY}`;
    }

    const response = await fetcher(baseUrl, {
      next: {
        revalidate: REVALIDATE_TIME,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch actors by movie" },
        { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching actors by movie:", error);
    return NextResponse.json(
      { error: "Failed to fetch actors by movie" },
      { status: 500 }
    );
  }
}
