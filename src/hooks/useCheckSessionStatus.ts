"use client";

import { delay } from "lodash";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import useNotification from "./useNotification";

const useCheckSessionStatus = () => {
  const { data: session, status }: any = useSession();
  const { notificationAlert } = useNotification();

  useEffect(() => {
    // Chỉ chạy khi xác thực đã hoàn tất
    if (status === "authenticated") {
      if (!session.user?.email) {
        notificationAlert({
          title: "Đăng nhập thất bại!",
          description: "Phiên đăng nhập không hợp lệ. Vui lòng thử lại sau.",
          type: "error",
        });

        delay(() => signOut(), 1000);
      }

      if (session?.user?.status === "banned") {
        notificationAlert({
          title: "Đăng nhập thất bại!",
          description:
            "Tài khoản của bạn đã bị khóa! Vui lòng liên hệ với quản trị viên để biết thêm chi tiết.",
          type: "error",
        });

        delay(() => signOut(), 500);
      }
    }
  }, [status]);
};

export default useCheckSessionStatus;
