import Loading from "@/app/loading";
import { auth } from "@/auth";
import DeleteAllMovies from "@/components/user/DeleteAllMovies";
import DeleteSelectedMovies from "@/components/user/DeleteSeletedMovies";
import MovieSection from "@/components/user/MovieSection";
import ActionsPlaylist from "@/components/user/playlist/ActionsPlaylist";
import Playlists from "@/components/user/playlist/Playlists";
import {
  getUserMoviesFromPlaylist,
  getUserPlaylists,
} from "@/lib/actions/userActionServer";
import { NEXT_PUBLIC_SITE_URL } from "@/lib/env";
import { Box, Button } from "@chakra-ui/react";
import { Suspense } from "react";
import { FaPlus } from "react-icons/fa6";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata() {
  const title = "PHOFLIX-V3 - Danh sách phát phim yêu thích";
  const description =
    "Khám phá và quản lý các playlist phim được tạo bởi bạn và cộng đồng trên PHOFLIX-V3. Xem phim theo chủ đề và thể loại yêu thích.";

  return {
    title,
    description,
    keywords: [
      "playlist phim",
      "danh sách phát",
      "phim yêu thích",
      "PHOFLIX",
      "quản lý playlist",
    ],
    robots: "index, follow",
    openGraph: {
      title,
      description,
      url: `${NEXT_PUBLIC_SITE_URL}/nguoi-dung/danh-sach-phat`,
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
  const session = await auth();
  const userId = session?.user?.id as string;
  const params = await searchParams;
  const limit = 18;
  const currentPage = params?.page ? Number(params?.page) : 1;

  const responsePlaylist = await getUserPlaylists({
    userId,
    accessToken: session?.user?.accessToken as string,
  });

  const playlists = responsePlaylist?.result?.playlists || [];
  let responseMovies = null;
  let playlistId: string | null = null;

  // Chỉ chạy khi có playlist
  if (playlists?.length > 0) {
    // Lấy playlistId từ params hoặc lấy playlistId đầu tiên trong danh sách
    playlistId = params?.playlistId
      ? String(params?.playlistId)
      : playlists?.[0]?.id;

    // Kiểm tra playlistId có tồn tại trong danh sách playlist hay không
    const existsPlaylist = playlists?.some(
      (playlist: Playlist) => playlist?.id === playlistId
    );

    // Nếu không tồn tại thì lấy playlistId đầu tiên trong danh sách
    if (!existsPlaylist) {
      playlistId = playlists?.[0]?.id;
    }

    // Lấy danh sách phim từ playlist
    responseMovies = await getUserMoviesFromPlaylist({
      userId,
      playlistId: playlistId as string,
      page: currentPage,
      limit,
      accessToken: session?.user?.accessToken as string,
    });
  }

  const movies = responseMovies?.result?.movies || [];
  const totalItems = responseMovies?.result?.totalItems || 0;
  const totalItemsPerPage = responseMovies?.result?.totalItemsPerPage || 0;

  return (
    <>
      <Box className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h3 className="text-gray-50 text-lg">Danh sách phát</h3>

        <Box className="flex items-center gap-2">
          <ActionsPlaylist action="create">
            <Button
              size="xs"
              rounded="full"
              className="xs:text-xs text-[10px] text-gray-200 bg-transparent border border-gray-400 hover:bg-[#25272f] transition-all"
            >
              <FaPlus />
              Thêm mới
            </Button>
          </ActionsPlaylist>

          {movies?.length >= 2 && (
            <DeleteSelectedMovies type="playlist" playlistId={playlistId} />
          )}
          {movies?.length >= 3 && (
            <DeleteAllMovies type="playlist" playlistId={playlistId} />
          )}
        </Box>
      </Box>

      <Suspense fallback={<Loading type="bars" height="h-12" />}>
        <Playlists playlists={playlists} />
      </Suspense>

      <Suspense fallback={<Loading type="bars" height="h-96" />}>
        <MovieSection
          movies={movies}
          totalItems={totalItems}
          totalItemsPerPage={totalItemsPerPage}
          currentPage={currentPage}
          limit={limit}
          type="playlist"
        />
      </Suspense>
    </>
  );
};

export default Page;
