
import { getBase64 } from "@/lib/getBase64";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const src = searchParams.get("src");

  if (!src) {
    return NextResponse.json({ error: "Missing src" }, { status: 400 });
  }

  try {
    const blurDataURL = await getBase64(src);
    return NextResponse.json({ blurDataURL });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
