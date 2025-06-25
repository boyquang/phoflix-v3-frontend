import Loading from "@/app/loading";
import MainPage from "@/features/verify-token/MainPage";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<Loading type="text"/>}>
      <MainPage />
    </Suspense>
  );
};

export default Page;
