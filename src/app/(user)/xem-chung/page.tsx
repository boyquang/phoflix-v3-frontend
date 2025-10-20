import Loading from "@/app/loading";
import { Metadata } from "next";
import { Suspense } from "react";
import { NEXT_PUBLIC_SITE_URL } from "@/constants/env.contant";
import ClientWrapper from "@/components/watch-together/ClientWrapper";
import AnimateWrapper from "@/components/shared/AnimateWrapper";
import { LIMIT_ROOMS_PER_PAGE } from "@/constants/watch-together.contant";
import { buildWatchTogetherListRoomsSEOMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildWatchTogetherListRoomsSEOMetadata();
}

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const page = params.page ? Number(params.page) : 1;

  return (
    <Suspense fallback={<Loading type="text" />}>
      <AnimateWrapper>
        <ClientWrapper page={page} limit={LIMIT_ROOMS_PER_PAGE} />
      </AnimateWrapper>
    </Suspense>
  );
};

export default Page;
