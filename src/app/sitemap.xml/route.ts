import { categories, countries } from "@/constants/movie.contant";
import { NextResponse } from "next/server";

export async function GET() {
  let baseUrl = process.env.NEXT_PUBLIC_SITE_URL as string;
  baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

  const sitemapUrls = [...countries, ...categories].map(
    (_, i) => `${baseUrl}/sitemap/movie/${i + 1}.xml`
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[`${baseUrl}/sitemap/main.xml`, ...sitemapUrls]
  .map(
    (url) => `
  <sitemap>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  </sitemap>`
  )
  .join("")}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
