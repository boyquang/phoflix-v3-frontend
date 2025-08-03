import Loading from "@/app/loading";
import { auth } from "@/auth";
import { getListRooms } from "@/lib/actions/watching-together-server.action";
import { Box } from "@chakra-ui/react";
import { Metadata } from "next";
import { Suspense } from "react";
import ListRooms from "@/components/watch-together/ListRooms";
import PaginationCustom from "@/components/shared/PaginationCustom";
import { NEXT_PUBLIC_SITE_URL } from "@/constants/env.contant";
import RootLayout from "@/components/layout/RootLayout";
import { PageProps } from "@/app/page";

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
  const sesstion = await auth();
  const params = await searchParams;
  const currentPage = params?.page ? Number(params?.page) : 1;
  const limit = 12;

  const response = await getListRooms({
    page: currentPage,
    limit,
    accessToken: sesstion?.user?.accessToken as string,
  });

  const { rooms, totalItems } = response?.result || {};

  return (
    <Suspense fallback={<Loading type="text" />}>
      <RootLayout>
        <Box className="lg:pt-28 pt-24">
          <h3 className="inline-block xl:text-3xl lg:text-2xl text-xl text-gradient-primary font-bold">
            Phòng xem chung
          </h3>

          <ListRooms
            rooms={rooms}
            classNameGrid="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-4"
          />

          {totalItems >= limit && (
            <PaginationCustom
              showToaster={false}
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={limit}
              isScroll={true}
            />
          )}
        </Box>
      </RootLayout>
    </Suspense>
  );
};

export default CommunityRoom;
