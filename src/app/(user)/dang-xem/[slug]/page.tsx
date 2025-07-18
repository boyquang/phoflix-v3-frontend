import Loading from "@/app/loading";
import { PageProps } from "@/app/page";
import EmptyData from "@/components/shared/EmptyData";
import ClientWrapper from "@/components/watch-movie/ClientWrapper";
import { fetchMovieInfo } from "@/lib/actions/movieActionServer";
import { NEXT_PUBLIC_SITE_URL } from "@/lib/env";
import { Metadata } from "next";
import { Suspense } from "react";
import { FaPhotoFilm } from "react-icons/fa6";

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
      title: `Đang xem ${name} | PHOFLIX-V3`,
      description: content,
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
        description: content,
        url: `${NEXT_PUBLIC_SITE_URL}/dang-xem/${slug}`,
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
        description: content,
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

const Page = async ({ params, searchParams }: PageProps) => {
  const { slug } = await params;

  const { movie, episodes, status } = await fetchMovieInfo(slug as string);

  if (!status || Object.keys(movie).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center max-w-2xl mx-auto px-4">
        <EmptyData
          className="bg-[#0003] rounded-2xl"
          icon={<FaPhotoFilm />}
          title="Không tìm thấy dữ liệu"
          description="Bộ phim này không tồn tại hoặc có thể đã bị xóa."
        />
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading type="text" />}>
      <ClientWrapper movie={movie} episodes={episodes} />
    </Suspense>
  );
};

export default Page;
