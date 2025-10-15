"use client";

import { FaVideoSlash, FaTrash } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import {
  createRoom,
  joinRoom,
} from "@/store/async-thunks/watch-together-v2.thunk";
import { AppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useWatchTogetherV2 = () => {
  const { data: session } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleCreateRoom = async (
    data: FormNewRoom,
    setLoading?: (loading: boolean) => void
  ) => {
    toast.info("Tính năng đang được phát triển.");
    return;

    // if (!session) {
    //   toast.error("Vui lòng đăng nhập để sử dụng chức năng này.");
    //   return;
    // }

    // if (setLoading) setLoading(true);

    // try {
    //   const response: any = await dispatch(
    //     createRoom({
    //       data,
    //       accessToken: session?.user.accessToken || "",
    //     })
    //   ).unwrap();

    //   if (response?.status) {
    //     const roomId = response?.result?.room?._id;
    //     toast.success(response?.message || "Tạo phòng thành công!");
    //     router.push(`/xem-chung/${roomId}`);
    //   } else {
    //     toast.error(
    //       response?.message || "Đã có lỗi xảy ra! Vui lòng thử lại sau."
    //     );
    //   }
    // } catch (error) {
    //   console.error("Error creating room:", error);
    //   toast.error("Đã có lỗi xảy ra! Vui lòng thử lại sau.");
    // } finally {
    //   if (setLoading) setLoading(false);
    // }
  };

  const handleJoinRoom = async (
    roomId: string,
    setRoomId?: (roomId: string) => void
  ) => {
    toast.info("Tính năng đang được phát triển.");
    return;

    // if (!session) {
    //   toast.error("Vui lòng đăng nhập để sử dụng chức năng này.");
    //   return;
    // }

    // if (setRoomId) setRoomId(roomId);

    // try {
    //   const response = await dispatch(
    //     joinRoom({
    //       roomId,
    //       accessToken: session?.user.accessToken || "",
    //     })
    //   ).unwrap();

    //   if (response?.status) {
    //     toast.success(response?.message || "Tham gia phòng thành công!");
    //     router.push(`/xem-chung/${roomId}`);
    //   } else {
    //     toast.error(
    //       response?.message || "Đã có lỗi xảy ra! Vui lòng thử lại sau."
    //     );
    //   }
    // } catch (error) {
    //   toast.error("Đã có lỗi xảy ra! Vui lòng thử lại sau.");
    // } finally {
    //   if (setRoomId) setRoomId("");
    // }
  };

  const generateOptionsRoomByStatus = (
    status: StatusFilter
  ): {
    label: string;
    value: string;
    icon: React.ReactNode;
    color: TextColor;
  }[] => {
    switch (status) {
      case "active":
        return [
          {
            label: "Kết thúc",
            value: "end",
            icon: (<FaVideoSlash />) as React.ReactNode,
            color: "text-[#dc3545]",
          },
        ];
      case "ended":
        return [
          {
            label: "Xóa phòng",
            value: "delete",
            icon: (<FaTrash />) as React.ReactNode,
            color: "text-[#dc3545]",
          },
        ];
      case "pending":
        return [
          {
            label: "Bắt đầu",
            value: "start",
            icon: (<FaPlay />) as React.ReactNode,
            color: "text-black",
          },
          {
            label: "Xóa phòng",
            value: "delete",
            icon: (<FaTrash />) as React.ReactNode,
            color: "text-[#dc3545]",
          },
        ];
      default:
        return [];
    }
  };

  const handleOptionRoom = async (status: StatusFilter) => {};

  return {
    handleCreateRoom,
    handleJoinRoom,
    generateOptionsRoomByStatus,
    handleOptionRoom,
  };
};

export default useWatchTogetherV2;
