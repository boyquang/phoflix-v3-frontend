import { NEXT_PUBLIC_SITE_URL } from "@/lib/env";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

export async function generateMetadata() {
  const title = "PHOFLIX-V3 - Không tìm thấy trang";
  const description =
    "Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa. Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ PHOFLIX-V3.";

  return {
    title,
    description,
    keywords: [
      "404",
      "không tìm thấy",
      "lỗi trang",
      "PHOFLIX",
      "phim không tồn tại",
      "trang lỗi",
    ],
    robots: "noindex, nofollow",
    openGraph: {
      title,
      description,
      url: `${NEXT_PUBLIC_SITE_URL}/not-found`,
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

const NotFound = () => {
  return (
    <section className="bg-transparent text-gray-50 min-h-screen flex items-center justify-center">
      <div className="py-8 px-4 mx-auto max-w-lg">
        <div className="text-center">
          <h1 className="mb-4 text-xl tracking-tight font-bold text-white md:text-3xl">
            Lỗi 404 - Không tìm thấy trang
          </h1>
          <p className="mb-4 text-md font-light text-gray-200">
            Trang bạn đang tìm kiếm không tồn tại. Vui lòng kiểm tra đường dẫn
            hoặc quay về trang chủ.
          </p>
          <Link href="/">
            <Button
              size="xl"
              className="rounded-full bg-primary linear-gradient mt-6 text-gray-900 shadow-primary"
            >
              Về trang chủ
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
