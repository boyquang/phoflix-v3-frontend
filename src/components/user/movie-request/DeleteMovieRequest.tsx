"use client";

import AlertDialog from "@/components/shared/AlertDialog";
import { deleteMovieRequest } from "@/lib/actions/movie-request-server.action";
import { IconButton } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

interface DeleteMovieRequestProps {
  movieRequestId: string;
}

const DeleteMovieRequest = ({ movieRequestId }: DeleteMovieRequestProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleDeleteMovieRequest = async () => {
    try {
      setLoading(true);
      const response = await deleteMovieRequest({
        userId: session?.user?.id as string,
        requestId: movieRequestId,
      });

      if (response?.status) {
        router.refresh();
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
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
