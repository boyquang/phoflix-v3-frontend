import Loading from "@/app/loading";
import { fetchMovieInfo } from "@/lib/actions/movie.action";
import { Metadata } from "next";
import { Suspense } from "react";
import NotFound from "@/app/not-found";
import AnimateWrapper from "@/components/shared/AnimateWrapper";
import { buildMovieInfoMetadata } from "@/lib/seo";
import ClientWrapper from "@/components/movie-info/ClientWrapper";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  return await buildMovieInfoMetadata(slug as string);
}

const Page = async ({ searchParams, params }: PageProps) => {
  const { slug } = await params;
  const { updated } = await searchParams;

  const { movie, episodes, status } = await fetchMovieInfo(
    slug as string,
    updated === "true"
  );

  if (!status || Object.keys(movie).length === 0) return <NotFound />;

  return (
    <Suspense fallback={<Loading type="text" />}>
      <AnimateWrapper>
        <ClientWrapper movie={movie as Movie} episodes={episodes} />
      </AnimateWrapper>
    </Suspense>
  );
};

export default Page;
