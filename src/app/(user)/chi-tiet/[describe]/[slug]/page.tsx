import Loading from "@/app/loading";
import { PageProps } from "@/app/page";
import RootLayout from "@/components/layout/RootLayout";
import EmptyData from "@/components/shared/EmptyData";
import MovieGrid from "@/components/shared/MovieGrid";
import PaginationCustom from "@/components/shared/PaginationCustom";
import TopicBackground from "@/components/shared/TopicBackground";
import { fetchMovieDetail } from "@/lib/actions/movie-server.action";
import { NEXT_PUBLIC_SITE_URL } from "@/constants/env.contant";
import { Metadata } from "next";
import { Suspense } from "react";
import { RiMovieFill } from "react-icons/ri";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, describe } = await params;

  try {
    const {
      seoOnPage,
      pagination: { totalItems },
    } = await fetchMovieDetail(describe as string, slug as string);

    const {
      titleHead = "Danh sách phim",
      descriptionHead = "Xem thông tin chi tiết về phim mới nhất tại PHOFLIX-V3.",
      og_image = [],
      og_url = "",
      og_type = "website",
    } = seoOnPage;

    const ogImageFullUrls = og_image.map(
      (img: string) => `${NEXT_PUBLIC_SITE_URL}${img}`
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
        url: `${NEXT_PUBLIC_SITE_URL}/chi-tiet/${
          og_url || `${describe}/${slug}`
        }`,
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

  const {
    items,
    pagination: { totalItems },
    titlePage,
  } = await fetchMovieDetail(
    describe as string,
    slug as string,
    currentPage,
    limit
  );

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
            <h3 className="inline-block xl:text-3xl lg:text-2xl text-xl text-gradient-primary font-bold">
              {`${titlePage} - ${totalItems} bộ phim`}
            </h3>
            <div className="mt-12">
              <MovieGrid
                items={items}
                classNameGrids="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 lg:gap-x-4 gap-x-2 gap-y-6"
              />
            </div>

            {(totalItems as number) >= limit && (
              <PaginationCustom
                totalItems={totalItems as number}
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
