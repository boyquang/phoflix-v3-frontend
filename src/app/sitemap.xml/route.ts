import { categories, countries } from "@/constants/movie";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || "https://yourdomain.com";

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
