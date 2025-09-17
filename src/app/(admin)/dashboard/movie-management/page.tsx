import Loading from "@/app/loading";
import CrawlStatusBox from "@/components/admin/dashboard/movie-management/CrawlStatusBox";
import LogInfo from "@/components/admin/dashboard/movie-management/LogInfo";
import MovieActionsDialog from "@/components/admin/dashboard/movie-management/MovieActionsDialog";
import AddNewButton from "@/components/shared/AddNewButton";
import { Box } from "@chakra-ui/react";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<Loading type="bars" />}>
      <Box className="text-gray-50">
        <div className="flex items-center justify-between">
          <h1 className="lg:text-3xl text-xl">Quản lý phim</h1>
          <MovieActionsDialog
            action="create"
            trigger={<AddNewButton label="Thêm phim" size="sm" />}
          />
        </div>
        <CrawlStatusBox />
        <LogInfo />
      </Box>
    </Suspense>
  );
};

export default Page;
