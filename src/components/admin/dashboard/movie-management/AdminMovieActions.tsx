"use client";

import { Box } from "@chakra-ui/react";
import MovieActionsDialog from "./MovieActionsDialog";
import IconButtonAction from "@/components/shared/IconButtonAction";
import AlertDialog from "@/components/shared/AlertDialog";
import { useState } from "react";
import { deleteMovie } from "@/lib/actions/movie.action";
import { syncMovieData } from "@/lib/actions/crawl-movies.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface AdminMovieActionsProps {
  data: Movie & { episodes: Episode[] };
}

const AdminMovieActions = ({ data }: AdminMovieActionsProps) => {
  const [loading, setLoading] = useState({
    delete: false,
    sync: false,
  });
  const router = useRouter();
  const { data: session } = useSession();

  const handleAsyncData = async () => {
    const response = await syncMovieData(
      data.slug,
      session?.user?.accessToken as string
    );
    return response;
  };

  const handleDeleteMovie = async () => {
    const response = await deleteMovie(
      data._id,
      session?.user?.accessToken as string
    );
    return response;
  };

  const handleAction = async (action: "delete" | "sync") => {
    try {
      setLoading((prev) => ({ ...prev, [action]: true }));

      const actionMap = {
        delete: handleDeleteMovie,
        sync: handleAsyncData,
      };

      const response = await actionMap[action]();

      if (!response?.status) {
        toast.error(response?.message || "Xử lý thất bại!");
        return;
      }

      toast.success(response.message || "Xử lý thành công!");
      toast.info("Dữ liệu sẽ được làm mới sau vài phút.");

      if (action === "delete") router.push("/?updated=true");
      if (action === "sync") {
        router.push(`/thong-tin-phim/${data.slug}?updated=true`);
      }
    } catch (error) {
      toast.error("Xử lý thất bại, vui lòng thử lại!");
      console.error(`Error during ${action} action:`, error);
    } finally {
      setLoading((prev) => ({ ...prev, [action]: false }));
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
        loading={loading.delete}
        confirmCallback={() => handleAction("delete")}
      />
      <IconButtonAction
        action="async"
        size="md"
        loading={loading.sync}
        onClick={() => handleAction("sync")}
      />
    </Box>
  );
};

export default AdminMovieActions;
