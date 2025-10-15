import Loading from "@/app/loading";
import AnimateWrapper from "@/components/shared/AnimateWrapper";
import ClientWrapper from "@/components/watch-together/manage/ClientWrapper";
import { LIMIT_ROOMS_PER_PAGE } from "@/constants/watch-together.contant";
import { Suspense } from "react";

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
