import Loading from "@/app/loading";
import { PageProps } from "@/app/page";
import FilterBox from "@/components/advance-filter/FilterBox";
import RootLayout from "@/components/layout/RootLayout";
import EmptyData from "@/components/shared/EmptyData";
import MovieGrid from "@/components/shared/MovieGrid";
import PaginationCustom from "@/components/shared/PaginationCustom";
import { fetchAdvanceFilterMovies } from "@/lib/actions/movie.action";
import { NEXT_PUBLIC_SITE_URL } from "@/constants/env.contant";
import { Metadata } from "next";
import { Suspense } from "react";
import { IoSearch } from "react-icons/io5";
import { RiMovieFill } from "react-icons/ri";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Lọc phim nâng cao - PHOFLIX-V3`,
    description:
      "Tìm kiếm và lọc phim theo thể loại, quốc gia, năm phát hành và đánh giá trên PHOFLIX-V3. Xem phim chất lượng cao, miễn phí và cập nhật nhanh nhất.",
    keywords: [
      "lọc phim",
      "tìm kiếm phim",
      "phim chất lượng cao",
      "xem phim miễn phí",
      "phim mới nhất",
      "PHOFLIX",
    ],
    robots: "index, follow",
    openGraph: {
      title: `Lọc phim nâng cao - PHOFLIX-V3`,
      description:
        "Khám phá kho phim đa dạng, lọc theo nhu cầu của bạn: thể loại, quốc gia, năm, đánh giá…",
      url: `${NEXT_PUBLIC_SITE_URL}/loc-nang-cao`,
      siteName: "PHOFLIX-V3",
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Lọc phim nâng cao - PHOFLIX-V3`,
      description:
        "Xem phim chất lượng cao, miễn phí, lọc theo sở thích cá nhân chỉ có tại PHOFLIX-V3.",
    },
  };
}

const Page = async ({ params, searchParams }: PageProps) => {
  const searchParamsObj = await searchParams;
  const keyword = searchParamsObj.keyword || "a";
  const country = searchParamsObj.country || "";
  const category = searchParamsObj.category || "";
  const sort_lang = searchParamsObj.sort_lang || "";
  const year = searchParamsObj.year || "";
  const sort_type = searchParamsObj.sort_type || "desc";
  const currentPage = Number(searchParamsObj.page) || 1;
  const limit = 24;

  const {
    items,
    pagination: { totalItems },
    status,
  } = await fetchAdvanceFilterMovies({
    keyword: keyword as string,
    page: currentPage,
    limit,
    country: country as string,
    category: category as string,
    sort_lang: sort_lang as string,
    year: year as string,
    sort_type: sort_type as string,
  });

  return (
    <Suspense fallback={<Loading type="text" />}>
      <RootLayout>
        <div className="lg:pt-28 pt-24">
          <h3 className="inline-block text-gradient-primary font-bold xl:text-3xl lg:text-2xl text-xl">
            Lọc nâng cao
          </h3>

          <FilterBox />

          <div className="filter-result" />

          <div className="flex items-center gap-2 my-4 text-gray-100 font-bold lg:text-xl text-sm">
            <IoSearch />
            <h3>Tìm thấy {totalItems} kết quả</h3>
          </div>

          <div className="mt-12">
            <>
              {items?.length > 0 ? (
                <MovieGrid
                  items={items}
                  classNameGrids="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 lg:gap-x-4 gap-x-2 gap-y-6"
                  orientation="vertical"
                />
              ) : (
                <div className="h-96 max-w-2xl mx-auto flex items-center justify-center">
                  <EmptyData
                    className="bg-[#0003] rounded-2xl"
                    icon={<RiMovieFill />}
                    title="Không tìm thấy dữ liệu"
                    description="Không có bộ phim nào trong danh sách này"
                  />
                </div>
              )}
            </>
          </div>

          {totalItems >= limit && (
            <PaginationCustom
              currentPage={Number(currentPage)}
              totalItems={totalItems}
              itemsPerPage={limit}
              isScroll={true}
              showToaster={false}
            />
          )}
        </div>
      </RootLayout>
    </Suspense>
  );
};

export default Page;
