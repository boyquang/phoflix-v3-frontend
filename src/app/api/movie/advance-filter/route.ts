import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface MovieAdvanceFilterParams {
  keyword: string;
  page: number;
  limit: number;
  sortLanguage?: "long-tieng" | "thuyet-minh" | "vietsub";
  category?: Categories | "";
  country?: Countries | "";
  year?: number | "";
  sortType?: "asc" | "desc";
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<MovieAdvanceFilterParams> }
) {
  try {
    const search = req.nextUrl.searchParams;
    const page = search.get("page") || "1";
    const limit = search.get("limit") || "24";
    const keyword = search.get("keyword") || "";
    const sortLanguage = search.get("sort_lang");
    const category = search.get("category");
    const country = search.get("country");
    const year = search.get("year");
    const sortType = search.get("sort_type");

    const response = await fetch(
      `${API_URL}/v1/api/tim-kiem?keyword=${keyword}&page=${page}&limit=${limit}&sort_lang=${
        sortLanguage || ""
      }&category=${category || ""}&country=${country || ""}&year=${
        year || ""
      }&sort_type=${sortType || "desc"}`
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
