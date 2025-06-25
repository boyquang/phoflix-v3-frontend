import Loading from "@/app/loading";
import MainPage from "@/features/movie-detail/MainPage";
import { NEXTAUTH_URL } from "@/lib/env";
import { Metadata } from "next";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, describe } = await params;

  return {
    title: "Danh sách phim - PHOFLIX-V3",
    description:
      "Xem thông tin chi tiết về phim, diễn viên, trailer và đánh giá mới nhất tại PHOFLIX-V3.",
    keywords: [
      "phim chi tiết",
      "xem phim",
      "trailer phim",
      "đánh giá phim",
      "PHOFLIX",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Chi tiết phim - PHOFLIX-V3",
      description:
        "Khám phá thông tin phim đầy đủ, cập nhật mới nhất tại PHOFLIX-V3.",
      url: `${NEXTAUTH_URL}/chi-tiet/${describe}/${slug}`,
      siteName: "PHOFLIX-V3",
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Chi tiết phim - PHOFLIX-V3",
      description:
        "Thông tin chi tiết và trailer phim mới nhất trên PHOFLIX-V3.",
    },
  };
}

const Page = () => {
  return (
    <Suspense fallback={<Loading type="text" />}>
      <MainPage />
    </Suspense>
  );
};

export default Page;
