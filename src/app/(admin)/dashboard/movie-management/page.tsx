import Loading from "@/app/loading";
import CrawlStatusBox from "@/components/admin/dashboard/movie-management/CrawlStatusBox";
import LogInfo from "@/components/admin/dashboard/movie-management/LogInfo";
import { Box } from "@chakra-ui/react";
import { Suspense } from "react";

type Props = {};

const Page = () => {
  return (
    <Suspense fallback={<Loading type="bars" />}>
      <Box className="text-gray-50">
        <h1 className="lg:text-3xl text-xl">Quản lý phim</h1>
        <CrawlStatusBox />
        <LogInfo />
      </Box>
    </Suspense>
  );
};

export default Page;
