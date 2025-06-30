import Loading from "@/app/loading";
import RootLayout from "@/components/layout/RootLayout";
import PaginationCustom from "@/components/shared/PaginationCustom";
import ActorsList from "@/components/actor/ActorsList";
import { getActorList } from "@/lib/actions/actorActionServer";
import { NEXTAUTH_URL } from "@/lib/env";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Danh sách diễn viên nổi bật - PHOFLIX-V3",
    description:
      "Tổng hợp những diễn viên nổi bật được khán giả yêu thích và đánh giá cao trên hệ thống PHOFLIX-V3. Cập nhật thông tin, tiểu sử và các bộ phim tiêu biểu.",
    keywords: [
      "diễn viên",
      "diễn viên nổi bật",
      "phim hay",
      "ngôi sao điện ảnh",
      "PHOFLIX",
      "diễn viên được yêu thích",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Danh sách diễn viên nổi bật - PHOFLIX-V3",
      description:
        "Khám phá các diễn viên hàng đầu, tiểu sử và các vai diễn đáng nhớ trên PHOFLIX-V3.",
      url: `${NEXTAUTH_URL}/dien-vien`,
      siteName: "PHOFLIX-V3",
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Danh sách diễn viên nổi bật - PHOFLIX-V3",
      description:
        "Tổng hợp các gương mặt diễn viên xuất sắc và được yêu thích nhất hiện nay.",
    },
  };
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const currentPage = params?.page ? Number(params?.page) : 1;

  const response = await getActorList({
    page: currentPage,
  });

  const totalItemsPerPage = 20;
  const actors = response?.results || [];
  // const totalItems = response?.total_results || 0;
  const totalItems = 10000; // Giới hạn do API trả về

  return (
    <Suspense fallback={<Loading type="text" />}>
      <RootLayout>
        <div className="lg:pt-28 pt-24">
          <h3 className="inline-block xl:text-3xl lg:text-2xl text-xl title-text font-bold mb-8">
            Diễn viên nổi bật
          </h3>

          <ActorsList
            items={actors}
            loading={false}
            classNameEmpty="mt-32"
            classNameGrids="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 lg:gap-x-4 gap-x-2 gap-y-6"
            showTitle={false}
          />

          {totalItems > totalItemsPerPage && (
            <PaginationCustom
              showToaster={false}
              currentPage={currentPage}
              totalItems={10000}
              itemsPerPage={totalItemsPerPage}
              isScroll={true}
            />
          )}
        </div>
      </RootLayout>
    </Suspense>
  );
};

export default Page;
