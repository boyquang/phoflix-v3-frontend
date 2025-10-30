import Loading from "@/app/loading";
import RootLayout from "@/components/layout/RootLayout";
import EmptyData from "@/components/shared/EmptyData";
import MovieGrid from "@/components/shared/MovieGrid";
import PaginationCustom from "@/components/shared/PaginationCustom";
import { fetchSearchMovies } from "@/lib/actions/movie.action";
import { NEXT_PUBLIC_SITE_URL } from "@/constants/env.contant";
import { Metadata } from "next";
import { Suspense } from "react";
import { BsEmojiTearFill } from "react-icons/bs";
import AnimateWrapper from "@/components/shared/AnimateWrapper";

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { keyword: searchKeyword } = await searchParams;

  try {
    const {
      seoOnPage,
      pagination: { totalItems },
    } = await fetchSearchMovies(searchKeyword as string);

    const {
      titleHead = "Danh sách phim",
      descriptionHead = "Xem thông tin chi tiết về phim mới nhất tại PHOFLIX-V3.",
      og_image = [],
      og_url = "",
      og_type = "website",
    } = seoOnPage;

    const ogImageFullUrls = og_image?.map(
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
        url: `${NEXT_PUBLIC_SITE_URL}/tim-kiem?keyword=${searchKeyword}`,
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

  const {
    status,
    movies: items,
    pagination: { totalItems },
  } = await fetchSearchMovies(keyword as string, currentPage, limit);

  if (!status || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center max-w-2xl mx-auto px-4">
        <EmptyData
          className="bg-[#0003] rounded-2xl"
          icon={<BsEmojiTearFill />}
          title="Không tìm thấy phim"
          description="Hãy thử tìm với từ khóa khác nhé."
        />
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading type="text" />}>
      <AnimateWrapper>
        <RootLayout>
          <div className="lg:pt-28 pt-24">
            <h3 className="inline-block xl:text-3xl lg:text-2xl text-xl text-gradient font-bold">
              Tìm thấy {totalItems} kết quả cho từ khóa &quot;
              {keyword}
              &quot;
            </h3>

            <div className="mt-12">
              <MovieGrid
                items={items}
                classNameGrids="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 lg:gap-x-4 gap-x-2 gap-y-6"
              />
            </div>

            {(totalItems as number) >= limit && (
              <PaginationCustom
                theme="simple"
                totalItems={totalItems as number}
                itemsPerPage={limit}
                showToaster={false}
                currentPage={currentPage}
              />
            )}
          </div>
        </RootLayout>
      </AnimateWrapper>
    </Suspense>
  );
};

export default Page;
