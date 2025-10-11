import Loading from "@/app/loading";
import { PageProps } from "@/app/page";
import { NEXT_PUBLIC_SITE_URL } from "@/constants/env.contant";
import { Suspense } from "react";
import ClientWrapper from "@/components/admin/dashboard/user-management/ClientWrapper";
import AnimateWrapper from "@/components/shared/AnimateWrapper";

export const generateMetadata = async () => {
  return {
    title: "Quản lý người dùng - PHOFLIX-V3",
    description:
      "Trang quản lý người dùng trong hệ thống PHOFLIX-V3. Xem danh sách, phân quyền, khóa/mở khóa tài khoản và cập nhật thông tin người dùng.",
    keywords: [
      "người dùng",
      "quản lý người dùng",
      "PHOFLIX",
      "user management",
      "tài khoản",
      "admin",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Quản lý người dùng - PHOFLIX-V3",
      description:
        "Theo dõi và quản lý tài khoản người dùng với giao diện Admin trên PHOFLIX-V3.",
      url: `${NEXT_PUBLIC_SITE_URL}/dashboard/user-management`,
      siteName: "PHOFLIX-V3",
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Quản lý người dùng - PHOFLIX-V3",
      description:
        "Trang quản lý tài khoản người dùng và phân quyền trên PHOFLIX-V3.",
    },
  };
};

const Page = ({ searchParams }: PageProps) => {
  return (
    <Suspense fallback={<Loading type="bars" height="h-96" />}>
      <AnimateWrapper>
        <ClientWrapper />
      </AnimateWrapper>
    </Suspense>
  );
};

export default Page;
