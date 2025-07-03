import Loading from "@/app/loading";
import { auth } from "@/auth";
import { getListRoomsByUser } from "@/lib/actions/watchingTogetherServer";
import { Box } from "@chakra-ui/react";
import { Metadata } from "next";
import { Suspense } from "react";
import ListRooms from "@/components/watch-together/ListRooms";
import { NEXTAUTH_URL } from "@/lib/env";
import PaginationCustom from "@/components/shared/PaginationCustom";

export function generateMetadata(): Metadata {
  const title = "Phòng của tôi - Nơi gặp gỡ và kết nối | PHOFLIX-V3";
  const description =
    "Tạo phòng xem video cùng bạn bè và người thân trên PHOFLIX-V3. Trải nghiệm xem phim đồng bộ và trò chuyện thời gian thực.";

  return {
    title,
    description,
    keywords: [
      "phòng của tôi",
      "xem phim nhóm",
      "phòng xem phim đồng bộ",
      "PHOFLIX",
      "kết nối bạn bè",
      "xem phim cùng nhau",
    ],
    robots: "index, follow",
    openGraph: {
      title,
      description,
      url: `${NEXTAUTH_URL}/nguoi-dung/phong-cua-toi`,
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

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const sesstion = await auth();
  const params = await searchParams;
  const currentPage = params?.page ? Number(params?.page) : 1;
  const limit = 12;

  const response = await getListRoomsByUser({
    userId: sesstion?.user?.id as string,
    page: currentPage,
    limit,
    accessToken: sesstion?.user?.accessToken as string,
  });

  const { rooms, totalItems } = response?.result || {};

  return (
    <Suspense fallback={<Loading />}>
      <Box>
        <h3 className="text-lg text-gray-50">Phòng của tôi</h3>
        <ListRooms
          rooms={rooms}
          classNameGrid="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
        />
        {totalItems >= limit && (
          <PaginationCustom
            totalItems={totalItems}
            itemsPerPage={limit}
            currentPage={currentPage}
            showToaster={false}
          />
        )}
      </Box>
    </Suspense>
  );
};

export default Page;
