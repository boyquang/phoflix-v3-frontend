import Loading from "@/app/loading";
import MainPage from "@/features/watch-together/MainPage";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = () => {
  return (
    <Suspense fallback={<Loading type="text" />}>
      <MainPage />
    </Suspense>
  );
};

export default Page;
