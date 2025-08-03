import { categories, countries } from "@/constants/movie.contant";
import { NEXT_PUBLIC_SITE_URL } from "@/constants/env.contant";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = NEXT_PUBLIC_SITE_URL;

  const urls = [
    ...categories.map(
      (category) => `${baseUrl}/chi-tiet/the-loai/${category.slug}`
    ),
    ...countries.map(
      (country) => `${baseUrl}/chi-tiet/quoc-gia/${country.slug}`
    ),
    `${baseUrl}/chi-tiet/danh-sach/phim-le`,
    `${baseUrl}/chi-tiet/danh-sach/phim-bo`,
    `${baseUrl}/chi-tiet/danh-sach/phim-chieu-rap`,
    `${baseUrl}/chi-tiet/danh-sach/hoat-hinh`,
    `${baseUrl}/chi-tiet/danh-sach/tv-shows`,
    `${baseUrl}/chi-tiet/danh-sach/phim-vietsub`,
    `${baseUrl}/chi-tiet/danh-sach/phim-thuyet-minh`,
    `${baseUrl}/chi-tiet/danh-sach/phim-long-tieng`,
    `${baseUrl}/chi-tiet/danh-sach/phim-chieu-rap`,
    `${baseUrl}/chi-tiet/danh-sach/subteam`,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
        <url>
          <loc>${url}</loc>
          <changefreq>daily</changefreq>
          <priority>0.7</priority>
          <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        </url>`
    )
    .join("")}
      </urlset>
    `;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
    status: 200,
  });
}
