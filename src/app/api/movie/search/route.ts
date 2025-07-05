import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

    const response = await fetch(
      `${API_URL}/v1/api/tim-kiem?keyword=${keyword}&page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch movie search results" },
        { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json(data.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching movie search:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie search results" },
      { status: 500 }
    );
  }
}
