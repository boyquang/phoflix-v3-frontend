import Loading from "@/app/loading";
import RootLayout from "@/components/layout/RootLayout";
import MovieGrid from "@/components/shared/MovieGrid";
import PaginationCustom from "@/components/shared/PaginationCustom";
import TopicBackground from "@/components/shared/TopicBackground";
import { fetchMovieDetail } from "@/lib/actions/movie.action";
import { Metadata } from "next";
import { Suspense } from "react";
import NotFound from "@/app/not-found";
import AnimateWrapper from "@/components/shared/AnimateWrapper";
import { buildDetailMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, describe } = await params;
  return await buildDetailMetadata(describe as string, slug as string);
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

  if (!items || items?.length === 0) return <NotFound />;

  return (
    <Suspense fallback={<Loading type="text" />}>
      <AnimateWrapper>
        <div className="relative">
          <TopicBackground slug={slug as string} />
          <RootLayout>
            <div className="lg:pt-28 pt-24 relative z-10">
              <h3 className="inline-block xl:text-3xl lg:text-2xl text-xl text-gradient font-bold">
                {titlePage || "Danh sách phim"}
              </h3>
              <div className="mt-12">
                <MovieGrid
                  items={items}
                  classNameGrids="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 lg:gap-x-4 gap-x-2 gap-y-6"
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
      </AnimateWrapper>
    </Suspense>
  );
};

export default Page;
