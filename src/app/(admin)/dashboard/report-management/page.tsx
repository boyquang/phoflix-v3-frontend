import Loading from "@/app/loading";
import { PageProps } from "@/app/page";
import { auth } from "@/auth";
import TableReports from "@/components/admin/dashboard/report-management/TableReports";
import PaginationCustom from "@/components/shared/PaginationCustom";
import { getReports } from "@/lib/actions/admin-server.action";
import { NEXT_PUBLIC_SITE_URL } from "@/constants/env.contant";
import { Box } from "@chakra-ui/react";
import { Suspense } from "react";
import ClientWrapper from "@/components/admin/dashboard/report-management/ClientWrapper";

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
  // const params = await searchParams;
  // const page = params.page ? Number(params.page) : 1;
  // const session = await auth();
  // const limit = 20;

  // const response = await getReports({
  //   page: page,
  //   limit,
  //   accessToken: session?.user?.accessToken as string,
  // });

  // const items = response?.result?.reports || [];
  // const totalItems = response?.result?.totalItems || 0;
  // const errorType = response?.errorType;
  // const message = response?.message || "Lỗi hệ thống. Vui lòng thử lại sau!";

  return (
    <Suspense fallback={<Loading type="bars" />}>
      {/* <Box className="text-gray-50">
        <h1 className="lg:text-3xl text-xl">Quản lý báo cáo</h1>

        {errorType === "InvalidToken" || errorType === "ServerError" ? (
          <p className="text-red-500 text-base mt-4">
            {errorType === "InvalidToken"
              ? "Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại."
              : message}
          </p>
        ) : (
          <>
            <TableReports items={items} offset={(page - 1) * limit} />
            {totalItems >= limit && (
              <PaginationCustom
                currentPage={page}
                totalItems={totalItems}
                itemsPerPage={limit}
                isScroll={true}
                showToaster={false}
              />
            )}
          </>
        )}
      </Box> */}
      <ClientWrapper />
    </Suspense>
  );
};

export default Page;
