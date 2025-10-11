import Loading from "@/app/loading";
import ClientWrapper from "@/components/admin/dashboard/telegram-bot/ClientWrapper";
import AnimateWrapper from "@/components/shared/AnimateWrapper";
import { Suspense } from "react";

const Page = async () => {
  return (
    <Suspense fallback={<Loading type="bars" height="h-96" />}>
      <AnimateWrapper>
        <ClientWrapper />
      </AnimateWrapper>
    </Suspense>
  );
};

export default Page;
