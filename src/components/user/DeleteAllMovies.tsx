"use client";

import AlertDialog from "@/components/shared/AlertDialog";
import { deleteAllMovies } from "@/lib/actions/user-movie.action";
import { handleShowToaster } from "@/lib/utils";
import { RootState } from "@/store/store";
import { Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

interface DeleteAllMoviesProps {
  type: "favorite" | "history" | "playlist";
  playlistId?: string | null;
}

const DeleteAllMovies = ({ type, playlistId }: DeleteAllMoviesProps) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const { seletectedDeleteMode } = useSelector(
    (state: RootState) => state.user.userMovies
  );

  useEffect(() => {
    switch (type) {
      case "favorite":
        setTitle("Xóa tất cả phim yêu thích");
        setContent("Bạn có chắc chắn muốn xóa tất cả phim yêu thích không?");
        break;
      case "history":
        setTitle("Xóa tất cả lịch sử xem phim");
        setContent("Bạn có chắc chắn muốn xóa tất cả lịch sử xem phim không?");
        break;
      case "playlist":
        setTitle("Xóa tất cả danh sách phát");
        setContent("Bạn có chắc chắn muốn xóa tất cả danh sách phát không?");
        break;
      default:
        break;
    }
  }, [type]);

  const handleDeleteAllMovies = async () => {
    setLoading(true);
    const response = await deleteAllMovies({
      userId: session?.user?.id as string,
      type,
      playlistId: playlistId || null,
      accessToken: session?.user?.accessToken as string,
    });
    setLoading(false);

    if (response?.status) {
      router.refresh();
    }

    handleShowToaster(
      "Thông báo",
      response?.message,
      response?.status ? "success" : "error"
    );
  };

  // Chỉ hiện nút xóa nếu không ở chế độ xóa đã chọn
  if (seletectedDeleteMode) {
    return null;
  }

  return (
    <AlertDialog
      title={title}
      content={content}
      loading={loading}
      trigger={
        <Button
          size="xs"
          className="bg-red-500 text-gray-50 rounded-full xs:text-xs text-[10px] hover:opacity-80"
        >
          <MdDelete />
          <span>Xóa tất cả</span>
        </Button>
      }
      confirmCallback={handleDeleteAllMovies}
    />
  );
};

export default DeleteAllMovies;
