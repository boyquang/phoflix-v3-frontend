"use client";

import EmptyData from "@/components/shared/EmptyData";
import { deleteMovie } from "@/lib/actions/user-movie.action";
import { AppDispatch, RootState } from "@/store/store";
import { SimpleGrid } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieItem from "./MovieItem";
import { useSession } from "next-auth/react";
import { RiMovieFill } from "react-icons/ri";
import { toast } from "sonner";
import { setTriggerRefresh } from "@/store/slices/system.slice";

interface MovieGridProps {
  items: MovieDB[];
  userId: string;
  type: "favorite" | "playlist" | "history";
  colums?: {
    base: number;
    md: number;
    lg: number;
    xl: number;
    "2xl": number;
  };
}

const MovieGrid = ({ items, colums, userId, type }: MovieGridProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedPlaylistId } = useSelector((state: RootState) => state.user);
  const pathname = usePathname();
  const { data: session } = useSession();
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();

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

  const handleDeleteMovie = async (slug: string, id: string) => {
    try {
      setIdDelete(id);
      const response = await deleteMovie({
        userId,
        movieSlug: slug,
        type,
        playlistId:
          pathname === "/nguoi-dung/danh-sach-phat" ? selectedPlaylistId : null,
        movieId: type === "history" ? id : null,
        accessToken: session?.user?.accessToken as string,
      });

      if (response?.status) {
        dispatch(setTriggerRefresh()); // làm mới lại danh sách phim
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

  if (!items || items?.length === 0) {
    return (
      <EmptyData
        className="bg-[#ffffff05] rounded-2xl"
        icon={<RiMovieFill />}
        title="Không có phim nào tại đây"
        description={
          type === "playlist"
            ? "Danh sách phát đang trống. Hãy tạo mới một danh sách phát và thêm phim vào nhé!"
            : type === "favorite"
            ? "Danh sách phim yêu thích trống. Hãy thêm phim yêu thích của bạn nhé!"
            : type === "history"
            ? "Lịch sử xem trống. Hãy xem phim để lưu lại lịch sử nhé!"
            : "Không có bộ phim nào trong danh sách này"
        }
      />
    );
  }

  return (
    <SimpleGrid
      columns={colums || { base: 2, md: 3, lg: 5, xl: 6, "2xl": 8 }}
      gap={{
        base: 2,
        md: 3,
        lg: 4,
      }}
    >
      {items?.map((item, index: number) => (
        <MovieItem
          key={index}
          item={item}
          callback={handleDeleteMovie}
          isLoading={idDelete === item.id}
        />
      ))}
    </SimpleGrid>
  );
};

export default MovieGrid;
