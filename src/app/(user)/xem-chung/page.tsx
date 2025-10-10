import Loading from "@/app/loading";
import { Metadata } from "next";
import { Suspense } from "react";
import { NEXT_PUBLIC_SITE_URL } from "@/constants/env.contant";
import { PageProps } from "@/app/page";
import ClientWrapper from "@/components/watch-together/ClientWrapper";

export function generateMetadata(): Metadata {
  return {
    title: "Phòng xem phim chung - Nơi gặp gỡ và kết nối | PHOFLIX-V3",
    description:
      "Tạo phòng xem video cùng bạn bè và người thân. Trải nghiệm tính năng xem phim đồng bộ và trò chuyện thời gian thực trên PHOFLIX-V3.",
    keywords: [
      "xem cùng bạn bè",
      "phòng cộng đồng",
      "xem phim nhóm",
      "PHOFLIX",
      "xem phim trực tuyến",
      "watch party",
      "xem phim cùng người thân",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Phòng cộng đồng - Kết nối và giải trí cùng nhau | PHOFLIX-V3",
      description:
        "Xem phim cùng bạn bè, tạo phòng riêng, trò chuyện trực tiếp khi xem phim chỉ có tại PHOFLIX-V3.",
      url: `${NEXT_PUBLIC_SITE_URL}/xem-chung`,
      siteName: "PHOFLIX-V3",
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Phòng cộng đồng - Xem phim cùng nhau | PHOFLIX-V3",
      description:
        "Tính năng xem phim đồng bộ theo nhóm và trò chuyện trực tuyến trên PHOFLIX-V3.",
    },
  };
}

const CommunityRoom = async ({ searchParams }: PageProps) => {
  return (
    <Suspense fallback={<Loading type="text" />}>
      <ClientWrapper />
    </Suspense>
  );
};

export default CommunityRoom;
