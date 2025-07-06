import { categories, countries } from "@/constants/movie";
import { fetchMovieDetail } from "@/lib/actions/movieActionServer";
import { NextResponse } from "next/server";

const MOVIES_PER_GROUP = 64;

export async function GET(
  req: Request,
  { params }: { params: Promise<{ page: string }> }
) {
  const { page } = await params;

  const pageNumber = parseInt(page);

  const combined = [
    ...countries.map((country) => ({ ...country, type: "country" })),
    ...categories.map((category) => ({ ...category, type: "category" })),
  ];

  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > combined.length) {
    return new NextResponse("Invalid sitemap page", { status: 404 });
  }

  const group = combined[pageNumber - 1];
  const baseUrl = process.env.NEXTAUTH_URL;

  const response = await fetchMovieDetail(
    group.type === "country" ? "/quoc-gia" : "/the-loai",
    group.slug,
    1,
    MOVIES_PER_GROUP
  );

  const { items: movies } = response;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${movies
  .map(
    (movie: any) => `
  <url>
    <loc>${baseUrl}/thong-tin-phim/${movie.slug}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
