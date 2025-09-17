
import Loading from "@/app/loading";
import ClientWrapper from "@/components/admin/dashboard/movie-management/ClientWrapper";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<Loading type="bars" />}>
      <ClientWrapper />
    </Suspense>
  );
};

export default Page;
