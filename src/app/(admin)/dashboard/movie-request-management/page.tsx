import Loading from "@/app/loading";
import { NEXT_PUBLIC_SITE_URL } from "@/constants/env.contant";
import { Suspense } from "react";
import ClientWrapper from "@/components/admin/dashboard/movie-request-management/ClientWrapper";
import AnimateWrapper from "@/components/shared/AnimateWrapper";

export const generateMetadata = async () => {
  return {
    title: "Quản lý yêu cầu phim - PHOFLIX-V3",
    description:
      "Trang quản lý yêu cầu phim từ người dùng trong hệ thống PHOFLIX-V3. Dễ dàng theo dõi, xét duyệt và phản hồi các đề xuất phim nhằm cải thiện trải nghiệm người dùng.",
    keywords: [
      "yêu cầu phim",
      "quản lý yêu cầu",
      "PHOFLIX",
      "đề xuất phim",
      "xét duyệt phim",
      "trải nghiệm người dùng",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Quản lý yêu cầu phim - PHOFLIX-V3",
      description:
        "Theo dõi và xử lý yêu cầu phim từ người dùng hiệu quả với PHOFLIX-V3.",
      url: `${NEXT_PUBLIC_SITE_URL}/dashboard/movie-request-management`,
      siteName: "PHOFLIX-V3",
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Quản lý yêu cầu phim - PHOFLIX-V3",
      description:
        "Trang xử lý các yêu cầu phim từ người dùng trên PHOFLIX-V3.",
    },
  };
};

const Page = async ({ searchParams }: PageProps) => {
  return (
    <Suspense fallback={<Loading type="bars" height="h-96" />}>
      <AnimateWrapper>
        <ClientWrapper />
      </AnimateWrapper>
    </Suspense>
  );
};

export default Page;
