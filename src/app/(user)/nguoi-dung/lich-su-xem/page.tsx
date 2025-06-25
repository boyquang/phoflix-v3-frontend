import Loading from "@/app/loading";
import { auth } from "@/auth";
import { getUserMovies } from "@/lib/actions/userActionServer";
import { Suspense } from "react";
import MovieSection from "@/features/user/MovieSection";
import { Box } from "@chakra-ui/react";
import DeleteAllMovies from "@/features/user/DeleteAllMovies";
import { NEXTAUTH_URL } from "@/lib/env";
import DeleteSelectedMovies from "@/features/user/DeleteSeletedMovies";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata() {
  const title = "PHOFLIX-V3 - Lịch sử xem phim của bạn";
  const description =
    "Xem lại lịch sử các bộ phim bạn đã xem trên PHOFLIX-V3. Dễ dàng tiếp tục xem các phim yêu thích mọi lúc mọi nơi.";

  return {
    title,
    description,
    keywords: [
      "lịch sử xem phim",
      "xem lại phim",
      "phim đã xem",
      "PHOFLIX",
      "tiếp tục xem phim",
    ],
    robots: "index, follow",
    openGraph: {
      title,
      description,
      url: `${NEXTAUTH_URL}/nguoi-dung/lich-su-xem`,
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
    type: "history",
    page: currentPage,
    limit,
    accessToken: sesstion?.user?.accessToken,
  });
  const { movies, totalItems, totalItemsPerPage } = response?.result || {};

  return (
    <Suspense fallback={<Loading type="bars" height="h-96" />}>
      <Box className="flex items-center justify-between gap-2">
        <h3 className="text-lg text-gray-50">Lịch sử xem</h3>
        <Box className="flex items-center gap-2">
          {movies?.length >= 2 && <DeleteSelectedMovies type="history" />}
          {movies?.length >= 3 && <DeleteAllMovies type="history" />}
        </Box>
      </Box>
      <MovieSection
        movies={movies}
        totalItems={totalItems}
        totalItemsPerPage={totalItemsPerPage}
        currentPage={currentPage}
        limit={limit}
        sesstion={sesstion}
        type="history"
      />
    </Suspense>
  );
};

export default Page;
