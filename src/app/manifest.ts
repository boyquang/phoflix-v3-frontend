import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PHOFLIX-V3",
    short_name: "PHOFLIX-V3",
    description: "Website xem phim online - Được xây dựng bởi phohococde",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/icon/logo.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/icon/logo192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon/logo512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
