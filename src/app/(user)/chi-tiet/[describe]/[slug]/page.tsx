import Loading from "@/app/loading";
import RootLayout from "@/components/layout/RootLayout";
import EmptyData from "@/components/shared/EmptyData";
import MovieGrid from "@/components/shared/MovieGrid";
import PaginationCustom from "@/components/shared/PaginationCustom";
import TopicBackground from "@/components/shared/TopicBackground";
import { NEXTAUTH_URL } from "@/lib/env";
import { Metadata } from "next";
import { Suspense } from "react";
import { RiMovieFill } from "react-icons/ri";

interface PageProps {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, describe } = await params;

  try {
    const res = await fetch(
      `${NEXTAUTH_URL}/api/movie/detail/${describe}/${slug}?page=1&limit=1`,
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

    const ogImageFullUrls = og_image.map(
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
        url: `${NEXTAUTH_URL}/chi-tiet/${og_url || `${describe}/${slug}`}`,
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
  const { slug, describe } = await params;
  const searchParamsObj = await searchParams;
  const currentPage = Number(searchParamsObj.page) || 1;
  const limit = 24;

  const response = await fetch(
    `${NEXTAUTH_URL}/api/movie/detail/${describe}/${slug}?page=${currentPage}&limit=${limit}`,
    {
      cache: "force-cache",
    }
  );

  const data = await response.json();
  const items = data.items || [];
  const pagination = data.params.pagination || {};
  const totalItems = pagination.totalItems || 0;
  const titlePage = data.titlePage || "Danh sách phim";

  if (!items || items?.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center max-w-2xl mx-auto px-4">
        <EmptyData
          className="bg-[#0003] rounded-2xl"
          icon={<RiMovieFill />}
          title="Không có dữ liệu"
          description="Danh sách hiện tại chưa chứa bộ phim nào."
        />
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading type="text" />}>
      <div className="relative">
        <TopicBackground slug={slug as string} />
        <RootLayout>
          <div className="lg:pt-28 pt-24 relative z-10">
            <h3 className="inline-block xl:text-3xl lg:text-2xl text-xl title-text font-bold">
              {`${titlePage} - ${totalItems} bộ phim`}
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
                currentPage={currentPage}
                showToaster={false}
              />
            )}
          </div>
        </RootLayout>
      </div>
    </Suspense>
  );
};

export default Page;
