"use client";

import AlertDialog from "@/components/shared/AlertDialog";
import useNotification from "@/hooks/useNotification";
import { deleteSelectedMovies } from "@/lib/actions/user-movie.action";
import { setSelectedDeleteMode } from "@/store/slices/user.slice";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSquareCheck } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

interface DeleteSelectedMoviesProps {
  type: "favorite" | "history" | "playlist";
  playlistId?: string | null;
}

const DeleteSelectedMovies = ({
  type,
  playlistId,
}: DeleteSelectedMoviesProps) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const { notificationAlert } = useNotification();
  const { seletectedDeleteMode, selectedMovieIds } = useSelector(
    (state: RootState) => state.user.userMovies
  );
  const [loading, setLoading] = useState(false);

  const handleDeleteSeletedMovies = async () => {
    setLoading(true);
    const response = await deleteSelectedMovies({
      userId: session?.user?.id as string,
      movieIds: selectedMovieIds || [],
      type,
      playlistId: playlistId || null,
      accessToken: session?.user?.accessToken as string,
    });
    setLoading(false);

    if (response?.status) {
      dispatch(setSelectedDeleteMode(false));
      router.refresh();
    }

    notificationAlert({
      title: response?.status ? "Xóa thành công" : "Xóa thất bại",
      description: response?.message || "Không có thông báo",
      type: response?.status ? "success" : "error",
    });
  };

  return (
    <Box className="flex items-center border border-gray-400 rounded-full">
      <Button
        onClick={() => dispatch(setSelectedDeleteMode(!seletectedDeleteMode))}
        size="xs"
        className={`text-xs text-gray-200 bg-transparent xs:text-xs text-[10px] hover:bg-[#25272f]
           ${selectedMovieIds?.length > 0 ? "rounded-l-full" : "rounded-full"} 
          `}
      >
        <FaSquareCheck />
        <span>{seletectedDeleteMode ? "Hủy chọn" : "Chọn để xóa"}</span>
      </Button>
      {selectedMovieIds?.length > 0 && (
        <AlertDialog
          loading={loading}
          title="Xóa phim đã chọn"
          content="Bạn có chắc chắn muốn xóa các phim đã chọn không?"
          trigger={
            <Button
              size="xs"
              className={`bg-transparent relative hover:bg-[#25272f] text-gray-50 xs:text-xs text-[10px] ${
                selectedMovieIds?.length > 0
                  ? "rounded-r-full before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[1px] before:bg-[#ffffff10]"
                  : ""
              }`}
            >
              <MdDelete />
              <span>Xóa</span>
            </Button>
          }
          confirmCallback={() => {
            handleDeleteSeletedMovies();
          }}
        />
      )}
    </Box>
  );
};

export default DeleteSelectedMovies;
