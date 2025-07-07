import Loading from "@/app/loading";
import UserProfile from "@/components/user/profile/UserProfile";
import { NEXT_PUBLIC_SITE_URL } from "@/lib/env";
import { Suspense } from "react";

export async function generateMetadata() {
  const title = "PHOFLIX-V3 - Trang cá nhân của bạn";
  const description =
    "Quản lý thông tin cá nhân, danh sách phim yêu thích và các thiết lập tài khoản trên PHOFLIX-V3.";

  return {
    title,
    description,
    keywords: [
      "trang cá nhân",
      "quản lý tài khoản",
      "phim yêu thích",
      "PHOFLIX",
      "cài đặt tài khoản",
    ],
    robots: "index, follow",
    openGraph: {
      title,
      description,
      url: `${NEXT_PUBLIC_SITE_URL}/nguoi-dung/tai-khoan`,
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

const Page = () => {
  return (
    <Suspense fallback={<Loading type="bars" height="h-1/2" />}>
      <UserProfile />
    </Suspense>
  );
};

export default Page;
