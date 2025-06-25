"use client";

import { toaster } from "@/components/ui/toaster";
import { createNotification } from "@/lib/actions/notificationActionClient";
import { playAudioNotification } from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";

interface NotificationData {
  receiverId: string;
  content: string;
  type: "individual" | "community";
  image: string;
  isAnonymous: boolean;
}

interface NotificationAlert {
  title: string;
  description: string;
  type?: "info" | "success" | "warning" | "error";
  duration?: number;
}

const useNotification = () => {
  const { data: session }: any = useSession();
  const pathname = usePathname();
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();

  const notificationAlert = ({
    title,
    description,
    type = "info",
    duration = 3000,
  }: NotificationAlert) => {
    toaster.create({
      title,
      description,
      type,
      duration,
    });
  };

  const showNotification = (senderId: string, receiverId: string) => {
    const userId = session?.user?.id;
    if (userId === receiverId && senderId !== userId) {
      // Hiển thị thông báo khi có phản hồi mới
      notificationAlert({
        title: "Bạn vừa nhận được thông báo mới",
        description: "Hãy kiểm tra ngay thông báo của bạn.",
      });
      dispatch(playAudioNotification(true));
    }
  };

  const createNotificationFunc = (
    notificationData: NotificationData,
    feedbackId: string
  ) => {
    const { isAnonymous, receiverId } = notificationData;

    if (!session || Number(isAnonymous) === 1) return;

    if (session?.user?.id !== receiverId) {
      const href = pathname.includes("thong-tin-phim")
        ? `/thong-tin-phim/${params.slug}?cid=${feedbackId}`
        : `/dang-xem/${params.slug}?cid=${feedbackId}`;

      createNotification({
        ...notificationData,
        href,
        userId: receiverId,
        senderId: session?.user?.id,
        accessToken: session?.user?.accessToken,
      });
    }
  };

  return { createNotificationFunc, showNotification, notificationAlert };
};

export default useNotification;
