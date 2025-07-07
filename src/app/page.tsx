import Home from "@/components/home/MainPage";
import { Suspense } from "react";
import Loading from "./loading";
import { Metadata } from "next";
import { NEXT_PUBLIC_SITE_URL } from "@/lib/env";

export const metadata: Metadata = {
  title: "PHOFLIX-V3 | Xem Phim Online Miễn Phí, Chất Lượng Cao Full HD",
  description:
    "PHOFLIX-V3 là website xem phim online miễn phí với kho phim lẻ, phim bộ, phim chiếu rạp chất lượng cao Full HD, cập nhật liên tục, không quảng cáo, xem mượt trên mọi thiết bị.",
  icons: {
    icon: "/icon/logo.ico",
  },
  keywords: [
    "xem phim online",
    "phim miễn phí",
    "phim chất lượng cao",
    "phim mới nhất",
    "xem phim không quảng cáo",
    "phim lẻ",
    "phim bộ",
    "phim chiếu rạp",
    "phim hay",
    "PHOFLIX",
  ],
  openGraph: {
    title: "PHOFLIX-V3 | Xem Phim Online Miễn Phí, Chất Lượng Cao Full HD",
    description:
      "Xem phim online miễn phí tại PHOFLIX-V3 với hàng ngàn bộ phim hay, chất lượng cao, cập nhật liên tục, hỗ trợ mọi thiết bị.",
    url: `${NEXT_PUBLIC_SITE_URL}`,
    siteName: "PHOFLIX-V3",
    type: "website",
  },
};

const Page = () => {
  return (
    <Suspense fallback={<Loading type="text" />}>
      <Home />
    </Suspense>
  );
};

export default Page;
