import Loading from "@/app/loading";
import { auth } from "@/auth";
import TableReports from "@/components/admin/dashboard/report-management/TableReports";
import PaginationCustom from "@/components/shared/PaginationCustom";
import { getReports } from "@/lib/actions/adminActionServer";
import { NEXT_PUBLIC_SITE_URL } from "@/lib/env";
import { Box } from "@chakra-ui/react";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const generateMetadata = async () => {
  return {
    title: "Quản lý báo cáo - PHOFLIX-V3",
    description:
      "Trang quản lý báo cáo sự cố và phân tích dữ liệu trên PHOFLIX-V3. Xem, lọc và xuất báo cáo chi tiết về lỗi, thống kê lượt xem, tương tác của người dùng.",
    keywords: [
      "báo cáo",
      "quản lý báo cáo",
      "PHOFLIX",
      "report",
      "thống kê",
      "analytics",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Quản lý báo cáo - PHOFLIX-V3",
      description:
        "Theo dõi báo cáo sự cố và phân tích dữ liệu người dùng trên PHOFLIX-V3.",
      url: `${NEXT_PUBLIC_SITE_URL}/dashboard/report-management`,
      siteName: "PHOFLIX-V3",
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Quản lý báo cáo - PHOFLIX-V3",
      description: "Trang báo cáo sự cố và thống kê nâng cao trên PHOFLIX-V3.",
    },
  };
};

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const page = params.page ? Number(params.page) : 1;
  const session = await auth();
  const limit = 20;

  const response = await getReports({
    page: page,
    limit,
    accessToken: session?.user?.accessToken as string,
  });

  const items = response?.result?.reports || [];
  const totalItems = response?.result?.totalItems || 0;

  return (
    <Suspense fallback={<Loading type="bars" />}>
      <Box className="text-gray-50">
        <h1 className="lg:text-3xl text-xl">Quản lý báo cáo</h1>

        <TableReports items={items} />

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
