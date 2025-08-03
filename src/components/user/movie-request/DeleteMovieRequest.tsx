"use client";

import AlertDialog from "@/components/shared/AlertDialog";
import useNotification from "@/hooks/useNotification";
import { deleteMovieRequest } from "@/lib/actions/movie-request-server.action";
import { IconButton } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

interface DeleteMovieRequestProps {
  movieRequestId: string;
}

const DeleteMovieRequest = ({ movieRequestId }: DeleteMovieRequestProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const { notificationAlert } = useNotification();

  const handleDeleteMovieRequest = async () => {
    setLoading(true);
    const response = await deleteMovieRequest({
      userId: session?.user?.id as string,
      requestId: movieRequestId,
    });
    setLoading(false);

    if (response?.status) {
      router.refresh();
    }

    notificationAlert({
      title: response?.status ? "Thành công" : "Lỗi",
      description:
        response?.message || "Đã xảy ra lỗi trong quá trình xóa yêu cầu",
      type: response?.status ? "success" : "error",
    });
  };

  return (
    <AlertDialog
      title="Xóa yêu cầu"
      content="Bạn có chắc chắn muốn xóa yêu cầu này không? Hành động này sẽ không thể hoàn tác."
      trigger={
        <IconButton
          size="xs"
          aria-label="Xóa"
          className="bg-transparent border border-[#ffffff10] hover:bg-[#ffffff10] rounded-full"
        >
          <MdDelete />
        </IconButton>
      }
      loading={loading}
      confirmCallback={handleDeleteMovieRequest}
    />
  );
};

export default DeleteMovieRequest;
