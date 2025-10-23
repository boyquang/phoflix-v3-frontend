"use client";

import EmptyData from "@/components/shared/EmptyData";
import { SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import MovieItem from "./MovieItem";
import { RiMovieFill } from "react-icons/ri";
import useUserMovie from "@/hooks/useUserMovie";

interface MovieGridProps {
  items: Movie[];
  type: "favorite" | "playlist" | "history";
  columns?: {
    base: number;
    md: number;
    lg: number;
    xl: number;
    "2xl": number;
  };
}

const descriptionMapping: Record<string, string> = {
  favorite:
    "Danh sách phim yêu thích trống. Hãy thêm phim yêu thích của bạn nhé!",
  playlist:
    "Danh sách phát đang trống. Hãy tạo mới một danh sách phát và thêm phim vào nhé!",
  history: "Lịch sử xem trống. Hãy xem phim để lưu lại lịch sử nhé!",
  default: "Không có bộ phim nào trong danh sách này",
};

const MovieGrid = ({ items, columns, type }: MovieGridProps) => {
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const { handleDeleteMovie } = useUserMovie({ items });

  if (!items || items?.length === 0) {
    return (
      <EmptyData
        className="bg-[#ffffff05] rounded-2xl"
        icon={<RiMovieFill />}
        title="Không có phim nào tại đây"
        description={descriptionMapping[type] || descriptionMapping["default"]}
      />
    );
  }

  return (
    <SimpleGrid
      columns={columns || { base: 2, md: 3, lg: 5, xl: 6, "2xl": 8 }}
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
          callback={(movieId: string) =>
            handleDeleteMovie(movieId, type, setIdDelete)
          }
          isLoading={idDelete === item?._id}
        />
      ))}
    </SimpleGrid>
  );
};

export default MovieGrid;
