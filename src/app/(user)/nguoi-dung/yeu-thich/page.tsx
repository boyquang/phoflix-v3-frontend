import Loading from "@/app/loading";
import { auth } from "@/auth";
import { getUserMovies } from "@/lib/actions/userActionServer";
import { Suspense } from "react";
import MovieSection from "@/components/user/MovieSection";
import { Box } from "@chakra-ui/react";
import DeleteAllMovies from "@/components/user/DeleteAllMovies";
import { NEXTAUTH_URL } from "@/lib/env";
import DeleteSelectedMovies from "@/components/user/DeleteSeletedMovies";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

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
      url: `${NEXTAUTH_URL}/nguoi-dung/yeu-thich`,
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
  const sesstion: any = await auth();
  const params = await searchParams;
  const currentPage = params?.page ? Number(params?.page) : 1;
  const limit = 18;

  const response = await getUserMovies({
    userId: sesstion?.user?.id as string,
    type: "favorite",
    page: currentPage,
    limit,
    accessToken: sesstion?.user?.accessToken,
  });

  const { movies, totalItems, totalItemsPerPage } = response?.result || {};

  return (
    <Suspense fallback={<Loading height="h-96" type="bars" />}>
      <Box className="flex items-center justify-between gap-2">
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
        sesstion={sesstion}
        type="favorite"
      />
    </Suspense>
  );
};

export default Page;
