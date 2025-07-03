import Loading from "@/app/loading";
import { auth } from "@/auth";
import TableUsers from "@/components/admin/dashboard/user-management/TableUsers";
import PaginationCustom from "@/components/shared/PaginationCustom";
import { getUsers } from "@/lib/actions/adminActionServer";
import { NEXTAUTH_URL } from "@/lib/env";
import { Box } from "@chakra-ui/react";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const generateMetadata = async () => {
  return {
    title: "Quản lý người dùng - PHOFLIX-V3",
    description:
      "Trang quản lý người dùng trong hệ thống PHOFLIX-V3. Xem danh sách, phân quyền, khóa/mở khóa tài khoản và cập nhật thông tin người dùng.",
    keywords: [
      "người dùng",
      "quản lý người dùng",
      "PHOFLIX",
      "user management",
      "tài khoản",
      "admin",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Quản lý người dùng - PHOFLIX-V3",
      description:
        "Theo dõi và quản lý tài khoản người dùng với giao diện Admin trên PHOFLIX-V3.",
      url: `${NEXTAUTH_URL}/dashboard/user-management`,
      siteName: "PHOFLIX-V3",
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Quản lý người dùng - PHOFLIX-V3",
      description:
        "Trang quản lý tài khoản người dùng và phân quyền trên PHOFLIX-V3.",
    },
  };
};

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const page = params.page ? Number(params.page) : 1;
  const session = await auth();
  const limit = 20;

  const response = await getUsers({
    page: page,
    limit,
    accessToken: session?.user?.accessToken as string,
  });

  const items = response?.result?.users || [];
  const totalItems = response?.result?.totalItems || 0;

  return (
    <Suspense fallback={<Loading type="bars" />}>
      <Box className="text-gray-50">
        <h1 className="lg:text-3xl text-xl">Quản lý người dùng</h1>

        <TableUsers items={items} />

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
