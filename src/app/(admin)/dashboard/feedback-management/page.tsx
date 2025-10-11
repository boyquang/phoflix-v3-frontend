import Loading from "@/app/loading";
import { NEXT_PUBLIC_SITE_URL } from "@/constants/env.contant";
import { Suspense } from "react";
import ClientWrapper from "@/components/admin/dashboard/feedback-management/ClientWrapper";

export const generateMetadata = async () => {
  return {
    title: "Quản lý phản hồi - PHOFLIX-V3",
    description:
      "Trang quản lý phản hồi người dùng trong hệ thống PHOFLIX-V3. Dễ dàng theo dõi, xử lý và cải thiện trải nghiệm người dùng thông qua các góp ý, đánh giá và khiếu nại.",
    keywords: [
      "phản hồi",
      "quản lý phản hồi",
      "PHOFLIX",
      "góp ý",
      "đánh giá",
      "trải nghiệm người dùng",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Quản lý phản hồi - PHOFLIX-V3",
      description:
        "Theo dõi và xử lý phản hồi người dùng hiệu quả với PHOFLIX-V3.",
      url: `${NEXT_PUBLIC_SITE_URL}/dashboard/feedback-management`,
      siteName: "PHOFLIX-V3",
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Quản lý phản hồi - PHOFLIX-V3",
      description: "Trang xử lý phản hồi người dùng trên PHOFLIX-V3.",
    },
  };
};

const Page = () => {
  return (
    <Suspense fallback={<Loading type="bars" height="h-96" />}>
      <ClientWrapper />
    </Suspense>
  );
};

export default Page;
