"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { leaveRoomWatchingTogether } from "@/lib/actions/watching-together.action";
import { handleShowToaster } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useSendSocketWatchingTogether from "./useSendSocketWatchingTogether";

interface UseLeaveRoomOnRouteChangeProps {
  roomId: string;
  roomOwnerId: string;
  userId: string;
}

const useLeaveRoomOnRouteChange = ({
  roomId,
  roomOwnerId,
  userId,
}: UseLeaveRoomOnRouteChangeProps) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const prevPathname = useRef<string | null>(null);
  const { hasLeftRoom } = useSelector(
    (state: RootState) => state.watchingTogether
  );
  const hasLeftRoomRef = useRef(hasLeftRoom);
  const { sendSocketCloseRoom, sendSocketLeaveRoom } =
    useSendSocketWatchingTogether();

  // Cập nhật giá trị hasLeftRoomRef mỗi khi hasLeftRoom thay đổi
  useEffect(() => {
    hasLeftRoomRef.current = hasLeftRoom;
  }, [hasLeftRoom]);

  /**
   * Tại sao lại sử dụng useRef để lưu trữ hasLeftRoomRef?
   *
   * - Nếu sử dụng trực tiếp hasLeftRoom trong cleanup function của useEffect,
   *   thì giá trị đó là phiên bản cũ (trước khi Redux cập nhật).
   *
   * - Cleanup function trong useEffect chạy TRƯỚC khi effect mới được kích hoạt.
   *   Do đó, nó vẫn “nhìn thấy” giá trị hasLeftRoom cũ.
   *
   * → Nếu lúc đó hasLeftRoom vẫn là false, thì logic leaveRoom sẽ chạy sai,
   *    dù thực tế người dùng đã rời phòng.
   *
   * ✅ useRef giúp lưu trữ giá trị mới nhất của hasLeftRoom qua các lần render,
   *    và không bị “reset” như biến thông thường.
   */

  useEffect(() => {
    const handleLeaveRoom = async () => {
      // Nếu đã rời phòng thì không thực hiện gì cả
      if (hasLeftRoomRef.current) return;

      if (!roomId || !userId || !roomOwnerId) return;

      const response = await leaveRoomWatchingTogether({
        userId: session?.user?.id as string,
        roomId,
        accessToken: session?.user?.accessToken as string,
      });

      if (response?.status) {
        if (session?.user?.id === roomOwnerId) {
          sendSocketCloseRoom();
        } else {
          sendSocketLeaveRoom();
        }
      }

      handleShowToaster(
        "Thông báo",
        response?.message,
        response?.status ? "success" : "error"
      );
    };

    // Chạy khi componet unmount tức rời khỏi trang
    return () => {
      handleLeaveRoom();
      prevPathname.current = pathname; // Cập nhật pathname trước đó
    };
  }, [pathname, roomId, userId, roomOwnerId]);
};

export default useLeaveRoomOnRouteChange;
