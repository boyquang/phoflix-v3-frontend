import Loading from "@/app/loading";
import MainPage from "@/features/watch-movie/MainPage";
import { NEXTAUTH_URL } from "@/lib/env";
import { Metadata } from "next";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const title = `Xem phim online miễn phí, chất lượng cao | PHOFLIX-V3`;
  const description = `Xem phim thuyết minh, Vietsub chất lượng cao, miễn phí trên PHOFLIX-V3. Cập nhật nhanh, trải nghiệm xem phim mượt mà.`;

  return {
    title,
    description,
    keywords: [
      "xem phim online",
      "phim miễn phí",
      "phim chất lượng cao",
      "phim thuyết minh",
      "phim Vietsub",
      "PHOFLIX",
    ],
    robots: "index, follow",
    openGraph: {
      title,
      description,
      url: `${NEXTAUTH_URL}/waching/${slug}`,
      siteName: "PHOFLIX-V3",
      locale: "vi_VN",
      type: "video.movie",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
