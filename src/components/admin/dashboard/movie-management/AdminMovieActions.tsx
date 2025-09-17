"use client";

import { Box } from "@chakra-ui/react";
import MovieActionsDialog from "./MovieActionsDialog";
import IconButtonAction from "@/components/shared/IconButtonAction";
import AlertDialog from "@/components/shared/AlertDialog";
import { useState } from "react";
import { deleteMovie } from "@/lib/actions/movie.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface AdminMovieActionsProps {
  data: Movie & { episodes: Episode[] };
}

const AdminMovieActions = ({ data }: AdminMovieActionsProps) => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleDeleteMovie = async () => {
    try {
      setLoadingDelete(true);
      const response = await deleteMovie(
        data._id,
        session?.user?.accessToken as string
      );

      if (response.status) {
        toast.success("Xoá phim thành công!");
        toast.info("Dữ liệu sẽ được làm mới sau vài phút.");
        router.push("/");
      } else {
        toast.error(response.message || "Xoá phim thất bại!");
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
      toast.error("Xoá phim thất bại, vui lòng thử lại!");
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <Box className="flex flex-col gap-4 absolute top-6 right-6 z-[20]">
      <MovieActionsDialog
        action="update"
        data={{
          ...data,
          episodes: data?.episodes || [],
        }}
        trigger={
          <Box>
            <IconButtonAction action="edit" size="md" />
          </Box>
        }
      />
      <AlertDialog
        trigger={
          <Box>
            <IconButtonAction action="delete" size="md" />
          </Box>
        }
        title="Xoá phim"
        content={`Bạn có chắc chắn muốn xoá phim "${data?.name}" không?`}
        loading={loadingDelete}
        confirmCallback={handleDeleteMovie}
      />
    </Box>
  );
};

export default AdminMovieActions;
