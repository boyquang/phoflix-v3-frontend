import { fetcher } from "@/lib/fetcher";
import { NextRequest, NextResponse } from "next/server";
import { REVALIDATE_TIME } from "@/lib/fetcher";

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

    const baseUrl = `${API_URL}/v1/api/tim-kiem`;
    const url = new URL(baseUrl);

    url.searchParams.append("keyword", keyword);
    url.searchParams.append("page", page);
    url.searchParams.append("limit", limit);
    url.searchParams.append("sort_type", sortType || "desc");

    if (sortLanguage) url.searchParams.append("sort_lang", sortLanguage);
    if (category) url.searchParams.append("category", category);
    if (country) url.searchParams.append("country", country);
    if (year) url.searchParams.append("year", year);

    const response = await fetcher(url.toString(), {
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch movie search results" },
        { status: 500 }
      );
    }

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
