import { NEXT_PUBLIC_SITE_URL } from "@/constants/env.contant";
import type { Metadata } from "next";
import { fetchMovieDetail, fetchMovieInfo } from "./actions/movie.action";
import {
  seoMetadataByRoom,
  seoMetadataListRooms,
} from "./actions/watch-together-v2.action";

function absUrl(path: string) {
  if (!path) return NEXT_PUBLIC_SITE_URL;
  if (path.startsWith("http")) return path;
  return `${NEXT_PUBLIC_SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function baseMetadata({
  title,
  description,
  url,
  images = [],
  keywords = [],
  type = "website",
}: {
  title: string;
  description: string;
  url: string;
  images?: string[];
  keywords?: string[];
  type?: TypeSeoMetadata;
}): Metadata {
  const fullImages = images
    .map(absUrl)
    .filter((img): img is string => Boolean(img));

  return {
    title: `${title} | PHOFLIX-V3`,
    description,
    keywords: [
      ...keywords,
      "xem phim",
      "phim mới",
      "PHOFLIX",
      "xem phim online",
    ],
    robots: "index, follow",
    openGraph: {
      title,
      description,
      url,
      siteName: "PHOFLIX-V3",
      locale: "vi_VN",
      type,
      images: fullImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export async function buildDetailMetadata(describe: string, slug: string) {
  const { seoOnPage } = await fetchMovieDetail(describe, slug);

  const {
    titleHead = "Danh sách phim",
    descriptionHead = "Xem thông tin chi tiết về phim mới nhất tại PHOFLIX-V3.",
    og_image = [],
    og_url = "",
    og_type = "website",
  } = seoOnPage;

  const ogImageFullUrls = og_image.map(
    (img: string) => `${NEXT_PUBLIC_SITE_URL}${img}`
  );

  return baseMetadata({
    title: titleHead,
    description: descriptionHead,
    url: `${NEXT_PUBLIC_SITE_URL}/chi-tiet/${og_url || `${describe}/${slug}`}`,
    images: ogImageFullUrls,
    keywords: [
      titleHead,
      "danh sách phim",
      "phim mới",
      "xem phim online",
      "PHOFLIX",
    ],
    type: og_type,
  });
}

type MovieInfo = {
  name?: string;
  origin_name?: string;
  content?: string;
  poster_url?: string;
};

export async function buildMovieInfoMetadata(slug: string) {
  const { movie } = await fetchMovieInfo(slug);

  const {
    name = "PHOFLIX-V3 - Xem phim online miễn phí",
    origin_name = "",
    content = "Xem phim chất lượng cao, miễn phí, cập nhật nhanh nhất tại PHOFLIX-V3.",
    poster_url = "/default-poster.jpg",
  } = movie as MovieInfo;

  return baseMetadata({
    title: `Phim ${name} | PHOFLIX-V3`,
    description: content ?? "",
    keywords: [name, origin_name, "PHOFLIX-V3", "xem phim online", "phim mới"],
    url: `${NEXT_PUBLIC_SITE_URL}/thong-tin-phim/${slug}`,
    images: [
      poster_url.startsWith("http")
        ? poster_url
        : `${NEXT_PUBLIC_SITE_URL}${poster_url}`,
    ],
    type: "video.movie",
  });
}

export async function buildWatchMovieMetadata(slug: string) {
  const { movie } = await fetchMovieInfo(slug);

  const {
    name = "PHOFLIX-V3 - Xem phim online miễn phí",
    origin_name = "",
    content = "Xem phim chất lượng cao, miễn phí, cập nhật nhanh nhất tại PHOFLIX-V3.",
    poster_url = "/default-poster.jpg",
  } = movie as MovieInfo;

  return baseMetadata({
    title: `Đang xem ${name} | PHOFLIX-V3`,
    description: content || "",
    keywords: [
      name,
      origin_name,
      "xem phim online",
      "phim miễn phí",
      "phim chất lượng cao",
      "PHOFLIX",
    ],
    url: `${NEXT_PUBLIC_SITE_URL}/dang-xem/${slug}`,
    images: [
      poster_url.startsWith("http")
        ? poster_url
        : `${NEXT_PUBLIC_SITE_URL}${poster_url}`,
    ],
    type: "video.movie",
  });
}

export async function buildWatchTogetherMetadataByRoomId(roomId: string) {
  const response = await seoMetadataByRoom(roomId);
  const seoMetadata = response.result?.seoMetadata;

  return baseMetadata({
    title: seoMetadata?.title || "Xem Phim Cùng Bạn Bè - Watch Together",
    description:
      seoMetadata?.description ||
      "Tham gia các phòng xem phim cùng bạn bè một cách dễ dàng và thú vị với tính năng Watch Together.",
    keywords: seoMetadata?.keywords || [
      "Watch Together",
      "Xem phim cùng bạn bè",
      "Phim online",
      "Phim miễn phí",
      "Xem phim HD",
      "Phim chất lượng cao",
      "Phim mới cập nhật",
      "Phim hot",
      "Phim hay",
      "Xem phim trực tuyến",
    ],
    url: `${NEXT_PUBLIC_SITE_URL}/xem-chung/phong/${roomId}`,
    images: seoMetadata?.posterUrls || [],
    type: (seoMetadata?.type as TypeSeoMetadata) || "website",
  });
}

export async function buildWatchTogetherListRoomsSEOMetadata() {
  const response = await seoMetadataListRooms();
  const seoMetadata = response.result?.seoMetadata;

  return baseMetadata({
    title: seoMetadata?.title || "Xem Phim Cùng Bạn Bè - Watch Together",
    description:
      seoMetadata?.description ||
      "Tham gia các phòng xem phim cùng bạn bè một cách dễ dàng và thú vị với tính năng Watch Together.",
    keywords: seoMetadata?.keywords || [
      "Watch Together",
      "Xem phim cùng bạn bè",
      "Phim online",
      "Phim miễn phí",
      "Xem phim HD",
      "Phim chất lượng cao",
      "Phim mới cập nhật",
      "Phim hot",
      "Phim hay",
      "Xem phim trực tuyến",
    ],
    url: `${NEXT_PUBLIC_SITE_URL}/xem-chung`,
    images: seoMetadata?.posterUrls || [],
    type: (seoMetadata?.type as TypeSeoMetadata) || "website",
  });
}
