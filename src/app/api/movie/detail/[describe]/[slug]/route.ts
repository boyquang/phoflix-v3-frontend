import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
    const search = req.nextUrl.searchParams;
    const page = search.get("page") || "1";
    const limit = search.get("limit") || "24";
    const { slug, describe } = await params;

    const response = await fetch(
      `${API_URL}/v1/api/${describe}/${slug}?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch movie detail" },
        { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching movie detail:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie detail" },
      { status: 500 }
    );
  }
}
