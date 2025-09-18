import Loading from "@/app/loading";
import { auth } from "@/auth";
import { getUserMovies } from "@/lib/actions/user-server.action";
import { Suspense } from "react";
import MovieSection from "@/components/user/MovieSection";
import { Box } from "@chakra-ui/react";
import DeleteAllMovies from "@/components/user/DeleteAllMovies";
import { NEXT_PUBLIC_SITE_URL } from "@/constants/env.contant";
import DeleteSelectedMovies from "@/components/user/DeleteSeletedMovies";
import { PageProps } from "@/app/page";
import ClientWrapper from "@/components/user/favorite/ClientWrapper";

export async function generateMetadata() {
  const title = "PHOFLIX-V3 - Danh sách phim yêu thích của bạn";
  const description =
    "Xem lại danh sách phim yêu thích trên PHOFLIX-V3. Quản lý và theo dõi các bộ phim bạn đã đánh dấu để xem lại dễ dàng hơn.";

  return {
    title,
    description,
    keywords: [
      "phim yêu thích",
      "danh sách yêu thích",
      "quản lý phim yêu thích",
      "PHOFLIX",
      "phim đã lưu",
      "xem phim online",
    ],
    robots: "index, follow",
    openGraph: {
      title,
      description,
      url: `${NEXT_PUBLIC_SITE_URL}/nguoi-dung/yeu-thich`,
      siteName: "PHOFLIX-V3",
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const Page = async ({ searchParams }: PageProps) => {
  // const sesstion = await auth();
  // const params = await searchParams;
  // const currentPage = params?.page ? Number(params?.page) : 1;
  // const limit = 18;

  // const response = await getUserMovies({
  //   userId: sesstion?.user?.id as string,
  //   type: "favorite",
  //   page: currentPage,
  //   limit,
  //   accessToken: sesstion?.user?.accessToken as string,
  // });

  // const { movies, totalItems, totalItemsPerPage } = response?.result || {};

  return (
    <Suspense fallback={<Loading height="h-96" type="bars" />}>
      {/* <Box className="flex items-center justify-between gap-2">
        <h3 className="text-lg text-gray-50">Phim yêu thích</h3>
        <Box className="flex items-center gap-2">
          {movies?.length >= 2 && <DeleteSelectedMovies type="favorite" />}
          {movies?.length >= 3 && <DeleteAllMovies type="favorite" />}
        </Box>
      </Box>
      <MovieSection
        movies={movies}
        totalItems={totalItems}
        totalItemsPerPage={totalItemsPerPage}
        currentPage={currentPage}
        limit={limit}
        type="favorite"
      /> */}
      <ClientWrapper />
    </Suspense>
  );
};

export default Page;
