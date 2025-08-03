import Loading from "@/app/loading";
import { PageProps } from "@/app/page";
import { auth } from "@/auth";
import TableNotifications from "@/components/admin/dashboard/notification-management/TableNotifications";
import AddNewButton from "@/components/shared/AddNewButton";
import PaginationCustom from "@/components/shared/PaginationCustom";
import NotificationDialog from "@/components/user/notification/NotificationDialog";
import { getNotifications } from "@/lib/actions/admin-server.action";
import { NEXT_PUBLIC_SITE_URL } from "@/constants/env.contant";
import { Box } from "@chakra-ui/react";
import { Suspense } from "react";

export const generateMetadata = async () => {
  return {
    title: "Quản lý thông báo - PHOFLIX-V3",
    description:
      "Trang quản lý thông báo hệ thống trên PHOFLIX-V3. Tạo, chỉnh sửa và theo dõi các thông báo gửi tới người dùng.",
    keywords: [
      "thông báo",
      "quản lý thông báo",
      "PHOFLIX",
      "notification",
      "hệ thống",
      "user notification",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Quản lý thông báo - PHOFLIX-V3",
      description:
        "Tạo và theo dõi thông báo gửi tới người dùng một cách hiệu quả với PHOFLIX-V3.",
      url: `${NEXT_PUBLIC_SITE_URL}/dashboard/notification-management`,
      siteName: "PHOFLIX-V3",
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Quản lý thông báo - PHOFLIX-V3",
      description:
        "Trang quản lý thông báo hệ thống trên PHOFLIX-V3, gửi tin nhanh chóng tới người dùng.",
    },
  };
};

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const page = params.page ? Number(params.page) : 1;
  const session = await auth();
  const limit = 20;

  const response = await getNotifications({
    page: page,
    limit,
    accessToken: session?.user?.accessToken as string,
  });

  const items = response?.result?.notifications || [];
  const totalItems = response?.result?.totalItems || 0;
  const errorType = response?.errorType;
  const message = response?.message || "Lỗi hệ thống. Vui lòng thử lại sau!";

  return (
    <Suspense fallback={<Loading type="bars" />}>
      <Box className="text-gray-50">
        <div className="flex items-center justify-between">
          <h1 className="lg:text-3xl text-xl font-semibold">
            Quản lý thông báo
          </h1>
          {!errorType && (
            <NotificationDialog
              trigger={
                <AddNewButton size="sm" label="Tạo thông báo" rounded="full" />
              }
            />
          )}
        </div>

        {errorType === "InvalidToken" || errorType === "ServerError" ? (
          <p className="text-red-500 text-base mt-4">
            {errorType === "InvalidToken"
              ? "Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại."
              : message}
          </p>
        ) : (
          <>
            <TableNotifications offset={(page - 1) * limit} items={items} />
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
      </Box>
    </Suspense>
  );
};

export default Page;
