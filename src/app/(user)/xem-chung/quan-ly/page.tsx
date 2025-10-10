import Loading from "@/app/loading";
import ClientWrapper from "@/components/watch-together/manage/ClientWrapper";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<Loading type="text" />}>
      <ClientWrapper />
    </Suspense>
  );
};

export default Page;
