import Loading from "@/app/loading";
import AnimateWrapper from "@/components/shared/AnimateWrapper";
import ClientWrapper from "@/components/verify-token/ClientWrapper";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<Loading type="text" />}>
      <AnimateWrapper>
        <ClientWrapper />
      </AnimateWrapper>
    </Suspense>
  );
};

export default Page;
