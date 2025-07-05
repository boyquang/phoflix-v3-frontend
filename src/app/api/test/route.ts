import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "https://phimapi.com/danh-sach/phim-moi-cap-nhat-v3?page=1"
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }

  const data = await response.json();

  return NextResponse.json(data, { status: 200 });
}
