import Loading from "@/app/loading";
import ClientWrapper from "@/components/admin/dashboard/movie-management/ClientWrapper";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<Loading type="bars" height="h-96" />}>
      <ClientWrapper />
    </Suspense>
  );
};

export default Page;
