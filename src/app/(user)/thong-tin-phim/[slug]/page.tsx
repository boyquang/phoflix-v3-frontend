import Loading from "@/app/loading";
import { PageProps } from "@/app/page";
import ClientWrapper from "@/components/movie-info/ClientWrapper";
import { fetchMovieInfo } from "@/lib/actions/movie.action";
import { NEXT_PUBLIC_SITE_URL } from "@/constants/env.contant";
import { Metadata } from "next";
import { Suspense } from "react";
import NotFound from "@/app/not-found";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { movie } = await fetchMovieInfo(slug as string);

    const {
      name = "PHOFLIX-V3 - Xem phim online miễn phí",
      origin_name = "",
      content = "Xem phim chất lượng cao, miễn phí, cập nhật nhanh nhất tại PHOFLIX-V3.",
      poster_url = "/default-poster.jpg",
    } = movie;

    return {
      title: `Phim ${name} | PHOFLIX-V3`,
      description: content ?? "",
      keywords: [
        name,
        origin_name,
        "xem phim online",
        "phim miễn phí",
        "phim chất lượng cao",
        "PHOFLIX",
      ],
      robots: "index, follow",
      openGraph: {
        title: `${name} | PHOFLIX-V3`,
        description: content ?? "",
        url: `${NEXT_PUBLIC_SITE_URL}/thong-tin-phim/${slug}`,
        siteName: "PHOFLIX-V3",
        locale: "vi_VN",
        type: "video.movie",
        images: [
          {
            url: poster_url.startsWith("http")
              ? poster_url
              : `${NEXT_PUBLIC_SITE_URL}${poster_url}`,
            width: 800,
            height: 1200,
            alt: name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${name} | PHOFLIX-V3`,
        description: content ?? "",
        images: [
          poster_url.startsWith("http")
            ? poster_url
            : `${NEXT_PUBLIC_SITE_URL}${poster_url}`,
        ],
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);
    return {
      title: "PHOFLIX-V3 - Xem phim online miễn phí",
      description:
        "Xem phim chất lượng cao, miễn phí, cập nhật nhanh nhất tại PHOFLIX-V3.",
    };
  }
}

const Page = async ({ searchParams, params }: PageProps) => {
  const { slug } = await params;
  const { updated } = await searchParams;

  const { movie, episodes, status } = await fetchMovieInfo(
    slug as string,
    updated === "true"
  );

  if (!status || Object.keys(movie).length === 0) return <NotFound />;

  return (
    <Suspense fallback={<Loading type="text" />}>
      <ClientWrapper movie={movie} episodes={episodes} />
    </Suspense>
  );
};

export default Page;
