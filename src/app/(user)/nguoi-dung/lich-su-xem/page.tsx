import Loading from "@/app/loading";
import { Suspense } from "react";
import { NEXT_PUBLIC_SITE_URL } from "@/constants/env.contant";
import ClientWrapper from "@/components/user/viewing-history/ClientWrapper";

export async function generateMetadata() {
  const title = "PHOFLIX-V3 - Lịch sử xem phim của bạn";
  const description =
    "Xem lại lịch sử các bộ phim bạn đã xem trên PHOFLIX-V3. Dễ dàng tiếp tục xem các phim yêu thích mọi lúc mọi nơi.";

  return {
    title,
    description,
    keywords: [
      "lịch sử xem phim",
      "xem lại phim",
      "phim đã xem",
      "PHOFLIX",
      "tiếp tục xem phim",
    ],
    robots: "index, follow",
    openGraph: {
      title,
      description,
      url: `${NEXT_PUBLIC_SITE_URL}/nguoi-dung/lich-su-xem`,
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
