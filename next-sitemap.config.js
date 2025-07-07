/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  generateRobotsTxt: true,
  changefreq: "daily",
  outDir: "./public",
  sourceDir: ".next",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    "/sitemap.xml",
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
    ],
  },
};
