import { NEXT_PUBLIC_SITE_URL } from "@/lib/env";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

export async function generateMetadata() {
  const title = "PHOFLIX-V3 - Trang không còn hoạt động";
  const description =
    "Trang bạn đang truy cập hiện không còn hoạt động hoặc đã bị gỡ bỏ. Cảm ơn bạn đã đồng hành cùng PHOFLIX-V3.";

  return {
    title,
    description,
    keywords: [
      "trang ngừng hoạt động",
      "không còn hoạt động",
      "trang bị gỡ bỏ",
      "PHOFLIX ngừng cung cấp",
      "trang lỗi",
    ],
    robots: "noindex, nofollow",
    openGraph: {
      title,
      description,
      url: `${NEXT_PUBLIC_SITE_URL}/inactive`,
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
    <section className="bg-transparent text-gray-50 min-h-screen flex items-center justify-center">
      <div className="py-8 px-4 mx-auto max-w-lg">
        <div className="text-center">
          <h1 className="mb-4 text-xl tracking-tight font-bold text-white md:text-3xl">
            ⛔ Trang không còn hoạt động
          </h1>
          <p className="mb-4 text-md font-light text-gray-200">
            Trang này hiện không còn hoạt động hoặc đã bị gỡ bỏ. Vui lòng quay
            về trang chủ để tiếp tục khám phá nội dung khác.
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

export default Page;
