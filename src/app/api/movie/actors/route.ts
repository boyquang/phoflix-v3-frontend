import { NextRequest, NextResponse } from "next/server";
import {
  NEXT_PUBLIC_API_THEMOVIEDB_KEY,
  NEXT_PUBLIC_API_THEMOVIEDB_URL,
} from "@/constants/env.contant";
import { fetcher, REVALIDATE_TIME } from "@/lib/fetcher";

interface GetActorsParams {
  page?: number;
  language?: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<GetActorsParams> }
) {
  try {
    const search = req.nextUrl.searchParams;
    const page = search.get("page") || "1";
    const language = search.get("language") || "vi";

    const baseUrl = `${NEXT_PUBLIC_API_THEMOVIEDB_URL}/person/popular`;
    const url = new URL(baseUrl);

    url.searchParams.append(
      "api_key",
      NEXT_PUBLIC_API_THEMOVIEDB_KEY as string
    );
    url.searchParams.append("language", language);
    url.searchParams.append("page", page);

    const response = await fetcher(url.toString(), {
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch actors" },
        { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching actors:", error);
    return NextResponse.json(
      { error: "Failed to fetch actors" },
      { status: 500 }
    );
  }
}
