"use client";

import { delay } from "lodash";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "sonner";

const useCheckSessionStatus = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    // Chỉ chạy khi xác thực đã hoàn tất
    if (status === "authenticated") {
      if (!session.user?.email) {
        toast.error("Phiên đăng nhập không hợp lệ. Vui lòng thử lại sau.");
        delay(() => signOut(), 1000);
      }

      // if (session?.user?.status === "banned") {
      //   toast.error("Tài khoản của bạn đã bị khóa!");
      //   delay(() => signOut(), 500);
      // }
    }
  }, [status]);
};

export default useCheckSessionStatus;
