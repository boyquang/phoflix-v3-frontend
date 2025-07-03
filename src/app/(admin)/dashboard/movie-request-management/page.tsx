import Loading from "@/app/loading";
import { auth } from "@/auth";
import StatusSelectorFilter from "@/components/admin/dashboard/movie-request-management/StatusSelecterFilter";
import TableMovieRequest from "@/components/admin/dashboard/movie-request-management/TableMovieRequest";
import PaginationCustom from "@/components/shared/PaginationCustom";
import { getMovieRequests } from "@/lib/actions/adminActionServer";
import { NEXTAUTH_URL } from "@/lib/env";
import { Box, Status } from "@chakra-ui/react";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const generateMetadata = async () => {
  return {
    title: "Quản lý yêu cầu phim - PHOFLIX-V3",
    description:
      "Trang quản lý yêu cầu phim từ người dùng trong hệ thống PHOFLIX-V3. Dễ dàng theo dõi, xét duyệt và phản hồi các đề xuất phim nhằm cải thiện trải nghiệm người dùng.",
    keywords: [
      "yêu cầu phim",
      "quản lý yêu cầu",
      "PHOFLIX",
      "đề xuất phim",
      "xét duyệt phim",
      "trải nghiệm người dùng",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Quản lý yêu cầu phim - PHOFLIX-V3",
      description:
        "Theo dõi và xử lý yêu cầu phim từ người dùng hiệu quả với PHOFLIX-V3.",
      url: `${NEXTAUTH_URL}/dashboard/movie-request-management`,
      siteName: "PHOFLIX-V3",
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Quản lý yêu cầu phim - PHOFLIX-V3",
      description:
        "Trang xử lý các yêu cầu phim từ người dùng trên PHOFLIX-V3.",
    },
  };
};

type StatusType = "all" | "pending" | "approved" | "rejected";

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const page = params.page ? Number(params.page) : 1;
  const status = (params.status as StatusType) || "all";
  const session = await auth();
  const limit = 20;

  const response = await getMovieRequests({
    page,
    limit,
    accessToken: session?.user?.accessToken as string,
    status,
  });

  const items = response?.result?.items || [];
  const totalItems = response?.result?.item_count || 0;

  return (
    <Suspense fallback={<Loading type="bars" />}>
      <Box className="text-gray-50">
        <div className="flex items-center justify-between">
          <h1 className="lg:text-3xl text-xl">Quản lý yêu cầu phim</h1>
          <StatusSelectorFilter status={status || "all"} />
        </div>
        <TableMovieRequest items={items} />
        {totalItems >= limit && (
          <PaginationCustom
            currentPage={page}
            totalItems={totalItems}
            itemsPerPage={limit}
            isScroll={true}
            showToaster={false}
          />
        )}
      </Box>
    </Suspense>
  );
};

export default Page;
