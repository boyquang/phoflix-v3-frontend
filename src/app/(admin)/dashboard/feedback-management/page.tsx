import Loading from "@/app/loading";
import { auth } from "@/auth";
import SlugSelectorFilter from "@/components/admin/dashboard/feedback-management/SlugSelectorFilter";
import TableFeedbacks from "@/components/admin/dashboard/feedback-management/TableFeedbacks";
import PaginationCustom from "@/components/shared/PaginationCustom";
import { getFeedbacks } from "@/lib/actions/adminActionServer";
import { NEXTAUTH_URL } from "@/lib/env";
import { Box } from "@chakra-ui/react";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const generateMetadata = async () => {
  return {
    title: "Quản lý phản hồi - PHOFLIX-V3",
    description:
      "Trang quản lý phản hồi người dùng trong hệ thống PHOFLIX-V3. Dễ dàng theo dõi, xử lý và cải thiện trải nghiệm người dùng thông qua các góp ý, đánh giá và khiếu nại.",
    keywords: [
      "phản hồi",
      "quản lý phản hồi",
      "PHOFLIX",
      "góp ý",
      "đánh giá",
      "trải nghiệm người dùng",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Quản lý phản hồi - PHOFLIX-V3",
      description:
        "Theo dõi và xử lý phản hồi người dùng hiệu quả với PHOFLIX-V3.",
      url: `${NEXTAUTH_URL}/dashboard/feedback-management`,
      siteName: "PHOFLIX-V3",
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Quản lý phản hồi - PHOFLIX-V3",
      description: "Trang xử lý phản hồi người dùng trên PHOFLIX-V3.",
    },
  };
};

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const page = params.page ? Number(params.page) : 1;
  const slug = params.slug ? params.slug.toString() : "all";
  const session: any = await auth();
  const limit = 20;

  const response = await getFeedbacks({
    page,
    limit,
    accessToken: session?.user?.accessToken,
    slug,
  });

  const items = response?.result?.feedbacks || [];
  const totalItems = response?.result?.totalItems || 0;
  const slugs = response?.result?.slugs || [];

  return (
    <Suspense fallback={<Loading type="bars" />}>
      <Box className="text-gray-50">
        <div className="flex items-center justify-between">
          <h1 className="lg:text-3xl text-xl">Quản lý phản hồi</h1>
          <SlugSelectorFilter slugs={slugs} />
        </div>
        <TableFeedbacks items={items} />
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
