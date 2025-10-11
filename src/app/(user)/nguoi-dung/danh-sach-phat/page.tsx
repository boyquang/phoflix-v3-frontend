import Loading from "@/app/loading";
import { PageProps } from "@/app/page";
import { NEXT_PUBLIC_SITE_URL } from "@/constants/env.contant";
import { Suspense } from "react";
import ClientWrapper from "@/components/user/playlist/ClientWrapper";

export async function generateMetadata() {
  const title = "PHOFLIX-V3 - Danh sách phát phim yêu thích";
  const description =
    "Khám phá và quản lý các playlist phim được tạo bởi bạn và cộng đồng trên PHOFLIX-V3. Xem phim theo chủ đề và thể loại yêu thích.";

  return {
    title,
    description,
    keywords: [
      "playlist phim",
      "danh sách phát",
      "phim yêu thích",
      "PHOFLIX",
      "quản lý playlist",
    ],
    robots: "index, follow",
    openGraph: {
      title,
      description,
      url: `${NEXT_PUBLIC_SITE_URL}/nguoi-dung/danh-sach-phat`,
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
    <Suspense fallback={<Loading type="bars" height="h-96" />}>
      <ClientWrapper />
    </Suspense>
  );
};

export default Page;
