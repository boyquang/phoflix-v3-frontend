import Loading from "@/app/loading";
import { PageProps } from "@/app/page";
import EmptyData from "@/components/shared/EmptyData";
import ClientWrapper from "@/components/watch-movie/ClientWrapper";
import { fetchMovieInfo } from "@/lib/actions/movie.action";
import { NEXT_PUBLIC_SITE_URL } from "@/constants/env.contant";
import { Metadata } from "next";
import { Suspense } from "react";
import { FaPhotoFilm } from "react-icons/fa6";
import AnimateWrapper from "@/components/shared/AnimateWrapper";
import { buildWatchMovieMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  return await buildWatchMovieMetadata(slug as string);
}

const Page = async ({ params, searchParams }: PageProps) => {
  const { slug } = await params;
  const { updated } = await searchParams;

  const { movie, episodes, status } = await fetchMovieInfo(
    slug as string,
    updated === "true"
  );

  if (!status || Object.keys(movie).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 max-w-2xl mx-auto">
        <EmptyData
          className="bg-[#0003] rounded-2xl"
          icon={<FaPhotoFilm />}
          title="Không tìm thấy dữ liệu"
          description="Bộ phim này không tồn tại hoặc có thể đã bị xóa."
        />
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading type="text" />}>
      <AnimateWrapper>
        <ClientWrapper movie={movie} episodes={episodes} />
      </AnimateWrapper>
    </Suspense>
  );
};

export default Page;
