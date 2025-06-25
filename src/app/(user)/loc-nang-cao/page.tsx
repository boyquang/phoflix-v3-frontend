import Loading from "@/app/loading";
import MainPage from "@/features/advance-filter/MainPage";
import { NEXTAUTH_URL } from "@/lib/env";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Lọc phim nâng cao - PHOFLIX-V3`,
    description:
      "Tìm kiếm và lọc phim theo thể loại, quốc gia, năm phát hành và đánh giá trên PHOFLIX-V3. Xem phim chất lượng cao, miễn phí và cập nhật nhanh nhất.",
    keywords: [
      "lọc phim",
      "tìm kiếm phim",
      "phim chất lượng cao",
      "xem phim miễn phí",
      "phim mới nhất",
      "PHOFLIX",
    ],
    robots: "index, follow",
    openGraph: {
      title: `Lọc phim nâng cao - PHOFLIX-V3`,
      description:
        "Khám phá kho phim đa dạng, lọc theo nhu cầu của bạn: thể loại, quốc gia, năm, đánh giá…",
      url: `${NEXTAUTH_URL}/loc-nang-cao`,
      siteName: "PHOFLIX-V3",
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Lọc phim nâng cao - PHOFLIX-V3`,
      description:
        "Xem phim chất lượng cao, miễn phí, lọc theo sở thích cá nhân chỉ có tại PHOFLIX-V3.",
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
