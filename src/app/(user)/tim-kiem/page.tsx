import Loading from "@/app/loading";
import MainPage from "@/features/search/MainPage";
import { NEXTAUTH_URL } from "@/lib/env";
import { Metadata } from "next";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = (await searchParams) ?? {};
  const keywordRaw = params.keyword ?? "online";
  const keyword = Array.isArray(keywordRaw) ? keywordRaw[0] : keywordRaw;
  const cleanKeyword = keyword.replace(/-/g, " ").trim();

  const title = `Xem phim ${cleanKeyword} - Thuyết minh, Vietsub mới nhất | PHOFLIX-V3`;
  const description = `Xem phim ${cleanKeyword} chất lượng cao, miễn phí và cập nhật nhanh nhất tại PHOFLIX-V3. Trải nghiệm xem phim mượt mà với nhiều thể loại hấp dẫn.`;

  const keywords = [
    cleanKeyword,
    "xem phim online",
    "phim miễn phí",
    "phim chất lượng cao",
    "PHOFLIX",
    "phim thuyết minh",
    "phim Vietsub",
    "phim mới cập nhật",
  ];

  return {
    title: title.slice(0, 60),
    description: description.slice(0, 160),
    keywords,
    robots: "index, follow",
    openGraph: {
      title: title.slice(0, 60),
      description: description.slice(0, 160),
      url: `${NEXTAUTH_URL}/tim-kiem?keyword=${encodeURIComponent(cleanKeyword)}`,
      siteName: "PHOFLIX-V3",
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title.slice(0, 60),
      description: description.slice(0, 160),
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
