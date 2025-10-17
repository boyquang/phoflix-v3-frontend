"use client";

import { FaVideoSlash, FaTrash } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import {
  createRoom,
  deleteRoom,
  endRoom,
  getRoomData,
  joinRoom,
  kickUser,
  startLive,
} from "@/store/async-thunks/watch-together-v2.thunk";
import { AppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setEpisode } from "@/store/slices/episode.slice";

const useWatchTogetherV2 = () => {
  const { data: session } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleGetRoomData = async (roomId: string) => {
    try {
      const response = await dispatch(
        getRoomData({
          roomId,
          accessToken: session?.user.accessToken || "",
        })
      ).unwrap();

      if (response?.status) {
        dispatch(
          setEpisode({
            episodes: response?.result?.room?.movie?.episodes || [],
            movie: response?.result?.room?.movie as Movie,
          })
        );
      } else {
        toast.error(
          response?.message || "Đã có lỗi xảy ra! Vui lòng thử lại sau."
        );
      }
    } catch (error) {
      console.error("Error fetching room data:", error);
      toast.error("Đã có lỗi xảy ra! Vui lòng thử lại sau.");
    }
  };

  const handleCreateRoom = async (data: FormNewRoom) => {
    if (!session) {
      toast.error("Vui lòng đăng nhập để sử dụng chức năng này.");
      return;
    }

    try {
      const response = await dispatch(
        createRoom({
          data,
          accessToken: session?.user.accessToken || "",
        })
      ).unwrap();

      if (response?.status) {
        const roomId = response?.result?.room?._id;
        toast.success(response?.message || "Tạo phòng thành công!");
        router.push(`/xem-chung/phong/${roomId}`);
        dispatch(
          setEpisode({
            episodes: response?.result?.room?.movie?.episodes || [],
            movie: response?.result?.room?.movie as Movie,
          })
        );
      } else {
        toast.error(
          response?.message || "Đã có lỗi xảy ra! Vui lòng thử lại sau."
        );
      }
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error("Đã có lỗi xảy ra! Vui lòng thử lại sau.");
    }
  };

  const handleJoinRoom = async (roomId: string) => {
    if (!session) {
      toast.error("Vui lòng đăng nhập để sử dụng chức năng này.");
      return;
    }

    try {
      const response = await dispatch(
        joinRoom({
          roomId,
          accessToken: session?.user.accessToken || "",
        })
      ).unwrap();

      if (response?.status) {
        toast.success(response?.message || "Tham gia phòng thành công!");
        router.push(`/xem-chung/phong/${roomId}`);
        dispatch(
          setEpisode({
            episodes: response?.result?.room?.movie?.episodes || [],
            movie: response?.result?.room?.movie as Movie,
          })
        );
      } else {
        toast.error(
          response?.message || "Đã có lỗi xảy ra! Vui lòng thử lại sau."
        );
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra! Vui lòng thử lại sau.");
    }
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

  const handleStartLive = async (roomId: string) => {
    if (!session) {
      toast.error("Vui lòng đăng nhập để sử dụng chức năng này.");
      return;
    }

    const confirmStart = window.confirm(
      "Bạn có chắc chắn muốn bắt đầu live không?"
    );

    if (!confirmStart) return;

    try {
      // dispatch start live
      const response = await dispatch(
        startLive({
          accessToken: session?.user.accessToken || "",
          roomId,
        })
      ).unwrap();

      if (response?.status) {
        toast.success(
          response?.message || "Bắt đầu phát trực tiếp thành công!"
        );

        if (pathname === "/xem-chung/quan-ly") {
          router.replace(`/xem-chung/phong/${roomId}`);
        }
      } else {
        toast.error(
          response?.message || "Đã có lỗi xảy ra! Vui lòng thử lại sau."
        );
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra! Vui lòng thử lại sau.");
    }
  };

  const handleEndLive = async (roomId: string) => {
    if (!session) {
      toast.error("Vui lòng đăng nhập để sử dụng chức năng này.");
      return;
    }

    const confirmStart = window.confirm(
      "Bạn có chắc chắn muốn kết thúc live không?"
    );

    if (!confirmStart) return;

    try {
      const response = await dispatch(
        endRoom({
          accessToken: session?.user.accessToken || "",
          roomId,
        })
      ).unwrap();

      if (response?.status) {
        toast.success(
          response?.message || "Kết thúc buổi xem chung thành công!"
        );
      } else {
        toast.error(
          response?.message || "Đã có lỗi xảy ra! Vui lòng thử lại sau."
        );
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra! Vui lòng thử lại sau.");
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
    if (!session) {
      toast.error("Vui lòng đăng nhập để sử dụng chức năng này.");
      return;
    }

    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa phòng này không?"
    );

    if (!confirmDelete) return;

    try {
      const response = await dispatch(
        deleteRoom({
          roomId,
          accessToken: session?.user.accessToken || "",
        })
      ).unwrap();

      if (response?.status) {
        toast.success(response?.message || "Xóa phòng thành công!");
      } else {
        toast.error(
          response?.message || "Đã có lỗi xảy ra! Vui lòng thử lại sau."
        );
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra! Vui lòng thử lại sau.");
    }
  };

  const handleKickViewer = async (roomId: string, userId: string) => {
    if (!session) {
      toast.error("Vui lòng đăng nhập để sử dụng chức năng này.");
      return;
    }

    const confirmKick = window.confirm(
      "Bạn có chắc chắn muốn kick người xem này không?"
    );

    if (!confirmKick) return;

    try {
      const response = await dispatch(
        kickUser({
          roomId,
          userId,
          accessToken: session?.user.accessToken || "",
        })
      ).unwrap();

      if (response?.status) {
        toast.success(response?.message || "Đã kick người xem thành công!");
      } else {
        toast.error(
          response?.message || "Đã có lỗi xảy ra! Vui lòng thử lại sau."
        );
      }
    } catch (error) {
      console.error("Error kicking viewer:", error);
      toast.error("Đã có lỗi xảy ra! Vui lòng thử lại sau.");
    }
  };

  return {
    handleCreateRoom,
    handleJoinRoom,
    generateOptionsRoomByStatus,
    handleStartLive,
    handleEndLive,
    handleDeleteRoom,
    handleKickViewer,
    handleGetRoomData,
  };
};

export default useWatchTogetherV2;
