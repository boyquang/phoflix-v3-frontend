import Loading from "@/app/loading";
import RootLayout from "@/components/layout/RootLayout";
import MovieGrid from "@/components/shared/MovieGrid";
import PaginationCustom from "@/components/shared/PaginationCustom";
import { NEXTAUTH_URL } from "@/lib/env";
import { Metadata } from "next";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { keyword: searchKeyword } = await searchParams;

  try {
    const res = await fetch(
      `${NEXTAUTH_URL}/api/movie/search?keyword=${searchKeyword}page=1&limit=24`,
      { cache: "force-cache" }
    );

    const data = await res.json();
    const seoOnPage = data?.seoOnPage || {};
    const totalItems = data?.totalItems || 0;

    const {
      titleHead = "Danh sách phim",
      descriptionHead = "Xem thông tin chi tiết về phim mới nhất tại PHOFLIX-V3.",
      og_image = [],
      og_url = "",
      og_type = "website",
    } = seoOnPage;

    const ogImageFullUrls = og_image?.map(
      (img: string) => `${NEXTAUTH_URL}${img}`
    );

    return {
      title: `${titleHead} | PHOFLIX-V3`,
      description: descriptionHead,
      keywords: [
        titleHead,
        "danh sách phim",
        "phim mới",
        "xem phim online",
        "PHOFLIX",
      ],
      robots: "index, follow",
      openGraph: {
        title: `${titleHead} - ${totalItems} bộ phim | PHOFLIX-V3`,
        description: `Xem ngay danh sách phim "${titleHead}" gồm ${totalItems} phim nổi bật, cập nhật liên tục tại PHOFLIX-V3.`,
        url: `${NEXTAUTH_URL}/tim-kiem?keyword=${searchKeyword}`,
        siteName: "PHOFLIX-V3",
        locale: "vi_VN",
        type: og_type,
        images: ogImageFullUrls,
      },
      twitter: {
        card: "summary_large_image",
        title: `${titleHead} - ${totalItems} bộ phim | PHOFLIX-V3`,
        description: `Danh sách phim ${titleHead}, xem online chất lượng cao tại PHOFLIX-V3.`,
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);
    return {
      title: "Danh sách phim - PHOFLIX-V3",
      description: "Xem thông tin chi tiết về phim mới nhất tại PHOFLIX-V3.",
    };
  }
}

const Page = async ({ params, searchParams }: PageProps) => {
  const searchParamsObj = await searchParams;
  const keyword = searchParamsObj.keyword;
  const currentPage = Number(searchParamsObj.page) || 1;
  const limit = 24;

  const response = await fetch(
    `${NEXTAUTH_URL}/api/movie/search?keyword=${keyword}&page=${currentPage}&limit=${limit}`,
    {
      cache: "force-cache",
    }
  );

  const data = await response.json();

  const items = data.items || [];
  const pagination = data.params.pagination || {};
  const totalItems = pagination.totalItems || 0;

  return (
    <Suspense fallback={<Loading type="text" />}>
      <RootLayout>
        <div className="lg:pt-28 pt-24">
          <h3 className="inline-block xl:text-3xl lg:text-2xl text-xl title-text font-bold">
            Tìm thấy {totalItems} kết quả cho từ khóa &quot;
            {keyword}
            &quot;
          </h3>

          <div className="mt-12">
            <MovieGrid
              items={items}
              classNameGrids="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 lg:gap-x-4 gap-x-2 gap-y-6"
            />
          </div>

          {(pagination?.totalItems as number) >= limit && (
            <PaginationCustom
              totalItems={pagination?.totalItems as number}
              itemsPerPage={limit}
              showToaster={false}
              currentPage={currentPage}
            />
          )}
        </div>
      </RootLayout>
    </Suspense>
  );
};

export default Page;
