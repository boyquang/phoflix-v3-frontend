import { fetcher, REVALIDATE_TIME } from "@/lib/fetcher";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_THEMOVIEDB_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_THEMOVIEDB_KEY;

interface MoviePopularParams {
  page?: number;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<MoviePopularParams> }
) {
  try {
    const search = req.nextUrl.searchParams;
    const page = parseInt(search.get("page") || "1", 10);

    const response = await fetcher(
      `${API_URL}/movie/popular?api_key=${API_KEY}&page=${page}`,
      {
        next: {
          revalidate: REVALIDATE_TIME,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch popular movies" },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch popular movies" },
      { status: 500 }
    );
  }
}
