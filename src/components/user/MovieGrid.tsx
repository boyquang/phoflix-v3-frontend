"use client";

import EmptyData from "@/components/shared/EmptyData";
import { deleteMovie } from "@/lib/actions/userMovieAction";
import { RootState } from "@/store/store";
import { SimpleGrid } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovieItem from "./MovieItem";
import { useSession } from "next-auth/react";
import { handleShowToaster } from "@/lib/utils";
import { RiMovieFill } from "react-icons/ri";

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
    setIdDelete(null);

    if (response?.status) {
      router.refresh();
    }

    handleShowToaster(
      "Thông báo",
      response?.message,
      response?.status ? "success" : "error"
    );
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
