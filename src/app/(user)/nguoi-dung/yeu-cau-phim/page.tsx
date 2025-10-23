import Loading from "@/app/loading";
import ClientWrapper from "@/components/user/movie-request/ClientWrapper";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<Loading height="h-96" type="bars" />}>
      <ClientWrapper />
    </Suspense>
  );
};

export default Page;
