/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXTAUTH_URL,
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
      `${process.env.NEXTAUTH_URL}/sitemap.xml`,
    ],
  },
};
