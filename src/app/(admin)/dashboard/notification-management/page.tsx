import Loading from "@/app/loading";
import { NEXT_PUBLIC_SITE_URL } from "@/constants/env.contant";
import { Suspense } from "react";
import ClientWrapper from "@/components/admin/dashboard/notification-management/ClientWrapper";
import AnimateWrapper from "@/components/shared/AnimateWrapper";

export const generateMetadata = async () => {
  return {
    title: "Quản lý thông báo - PHOFLIX-V3",
    description:
      "Trang quản lý thông báo hệ thống trên PHOFLIX-V3. Tạo, chỉnh sửa và theo dõi các thông báo gửi tới người dùng.",
    keywords: [
      "thông báo",
      "quản lý thông báo",
      "PHOFLIX",
      "notification",
      "hệ thống",
      "user notification",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Quản lý thông báo - PHOFLIX-V3",
      description:
        "Tạo và theo dõi thông báo gửi tới người dùng một cách hiệu quả với PHOFLIX-V3.",
      url: `${NEXT_PUBLIC_SITE_URL}/dashboard/notification-management`,
      siteName: "PHOFLIX-V3",
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Quản lý thông báo - PHOFLIX-V3",
      description:
        "Trang quản lý thông báo hệ thống trên PHOFLIX-V3, gửi tin nhanh chóng tới người dùng.",
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
