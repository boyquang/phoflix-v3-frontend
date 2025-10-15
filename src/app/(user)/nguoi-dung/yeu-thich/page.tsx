import Loading from "@/app/loading";
import { Suspense } from "react";
import { NEXT_PUBLIC_SITE_URL } from "@/constants/env.contant";
import ClientWrapper from "@/components/user/favorite/ClientWrapper";

export async function generateMetadata() {
  const title = "PHOFLIX-V3 - Danh sách phim yêu thích của bạn";
  const description =
    "Xem lại danh sách phim yêu thích trên PHOFLIX-V3. Quản lý và theo dõi các bộ phim bạn đã đánh dấu để xem lại dễ dàng hơn.";

  return {
    title,
    description,
    keywords: [
      "phim yêu thích",
      "danh sách yêu thích",
      "quản lý phim yêu thích",
      "PHOFLIX",
      "phim đã lưu",
      "xem phim online",
    ],
    robots: "index, follow",
    openGraph: {
      title,
      description,
      url: `${NEXT_PUBLIC_SITE_URL}/nguoi-dung/yeu-thich`,
      siteName: "PHOFLIX-V3",
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const Page = async ({ searchParams }: PageProps) => {
  return (
    <Suspense fallback={<Loading height="h-96" type="bars" />}>
      <ClientWrapper />
    </Suspense>
  );
};

export default Page;
