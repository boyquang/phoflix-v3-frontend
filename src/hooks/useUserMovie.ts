"use client";

import { deleteMovie } from "@/lib/actions/user-movie.action";
import { setTriggerRefresh } from "@/store/slices/system.slice";
import { setPlaylistByKey } from "@/store/slices/user.slice";
import { AppDispatch, RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

interface UseUserMovieProps {
  items: Movie[];
}

const useUserMovie = ({ items }: UseUserMovieProps) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { selectedPlaylistId } = useSelector(
    (state: RootState) => state.user.playlist
  );
  const dispatch: AppDispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const updatePageAndRefresh = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.replace(`?${params.toString()}`);
    router.refresh();
  };

  useEffect(() => {
    const currentPage = Number(searchParams.get("page")) || 1;

    if ((!items || items.length === 0) && currentPage > 1) {
      updatePageAndRefresh(currentPage - 1);
    }
  }, [items, searchParams]);

  const handleDeleteMovie = async (
    movieId: string,
    type: "favorite" | "playlist" | "history",
    setIdDelete: (id: string | null) => void
  ) => {
    try {
      setIdDelete(movieId);
      const response = await deleteMovie({
        type,
        playlistId:
          pathname === "/nguoi-dung/danh-sach-phat" ? selectedPlaylistId : null,
        movieId,
        accessToken: session?.user?.accessToken as string,
      });

      if (response?.status) {
        if (pathname === "/nguoi-dung/danh-sach-phat") {
          // Nếu đang ở trang danh sách phát thì làm mới lại danh sách phát
          dispatch(setPlaylistByKey({ key: "refreshMovies" }));
        } else {
          dispatch(setTriggerRefresh()); // làm mới lại danh sách phim
        }

        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    } finally {
      setIdDelete(null);
    }
  };

  return { handleDeleteMovie };
};

export default useUserMovie;
