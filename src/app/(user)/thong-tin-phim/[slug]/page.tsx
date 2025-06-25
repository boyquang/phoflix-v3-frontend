import Loading from "@/app/loading";
import MoviePage from "@/features/movie-info/MainPage";
import { NEXTAUTH_URL } from "@/lib/env";
import { Metadata } from "next";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  searchParams,
  params,
}: PageProps): Promise<Metadata> {
  const _params = (await searchParams) ?? {};
  const { slug } = await params;

  let name = "PHOFLIX-V3 - Xem phim online miễn phí";

  if (typeof _params.name === "string") {
    name = _params.name.replace(/-/g, " ");
  } else if (Array.isArray(_params.name) && _params.name.length > 0) {
    name = _params.name[0].replace(/-/g, " ");
  }

  return {
    title: `${name} | PHOFLIX-V3`,
    description: `Xem phim ${name} chất lượng cao, miễn phí, cập nhật nhanh nhất tại PHOFLIX-V3. Trải nghiệm xem phim mượt mà với nhiều thể loại hấp dẫn.`,
    keywords: [
      name,
      "xem phim online",
      "phim miễn phí",
      "phim chất lượng cao",
      "PHOFLIX",
      "phim cập nhật nhanh",
    ],
    robots: "index, follow",
    openGraph: {
      title: `${name} | PHOFLIX-V3`,
      description: `Xem phim ${name} chất lượng cao, miễn phí tại PHOFLIX-V3.`,
      url: `${NEXTAUTH_URL}/thong-tin-phim/${slug}?name=${encodeURIComponent(
        _params.name as string
      )}`,
      siteName: "PHOFLIX-V3",
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | PHOFLIX-V3`,
      description: `Xem phim ${name} chất lượng cao, miễn phí tại PHOFLIX-V3.`,
    },
  };
}

const Page = () => {
  return (
    <Suspense fallback={<Loading type="text" />}>
      <MoviePage />
    </Suspense>
  );
};

export default Page;
