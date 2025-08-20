"use client";

import { toaster } from "@/components/ui/toaster";
import { createNotification } from "@/lib/actions/notification-client-action";
import { playAudioNotification } from "@/store/slices/system.slice";
import { AppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface NotificationData {
  receiverId: string;
  content: string;
  type: "individual" | "community";
  image: string | undefined;
  isAnonymous: boolean;
}

interface NotificationAlert {
  title: string;
  description: string;
  type?: "info" | "success" | "warning" | "error";
  duration?: number;
}

const useNotification = () => {
  const { data: session } = useSession();
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
      toast.info("Bạn vừa nhận được thông báo mới");
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
        senderId: session?.user?.id as string,
        accessToken: session?.user?.accessToken as string,
      });
    }
  };

  return { createNotificationFunc, showNotification, notificationAlert };
};

export default useNotification;
