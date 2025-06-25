import Loading from "@/app/loading";
import { auth } from "@/auth";
import CreateNotification from "@/features/admin/dashboard/notification-management/CreateNotification";
import TableNotifications from "@/features/admin/dashboard/notification-management/TableNotifications";
import PaginationCustom from "@/components/shared/PaginationCustom";
import { getNotifications } from "@/lib/actions/adminActionServer";
import { NEXTAUTH_URL } from "@/lib/env";
import { Box } from "@chakra-ui/react";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

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
      url: `${NEXTAUTH_URL}/dashboard/notification-management`,
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
  const session: any = await auth();
  const limit = 20;

  const response = await getNotifications({
    page: page,
    limit,
    accessToken: session?.user?.accessToken,
  });

  const items = response?.result?.notifications || [];
  const totalItems = response?.result?.totalItems || 0;

  return (
    <Suspense fallback={<Loading type="bars" />}>
      <Box className="text-gray-50">
        <h1 className="lg:text-3xl text-xl">Quản lý thông báo</h1>

        <TableNotifications items={items} />

        {totalItems >= limit && (
          <PaginationCustom
            currentPage={page}
            totalItems={totalItems}
            itemsPerPage={limit}
            isScroll={true}
            showToaster={false}
          />
        )}

        <CreateNotification />
      </Box>
    </Suspense>
  );
};

export default Page;
