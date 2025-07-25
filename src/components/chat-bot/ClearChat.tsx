"use client";

import { useState } from "react";
import AlertDialog from "../shared/AlertDialog";
import { clearHistory } from "@/lib/actions/chatBotAction";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { resetChat } from "@/store/slices/chatBotSlice";
import useNotification from "@/hooks/useNotification";
import { Button } from "@chakra-ui/react";

const ClearChat = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const { notificationAlert } = useNotification();

  const handleClearChat = async () => {
    setLoading(true);
    const response = await clearHistory(
      session?.user.id as string,
      session?.user.accessToken as string
    );
    setLoading(false);

    if (response?.status) {
      dispatch(resetChat());
    }

    notificationAlert({
      title: response?.status ? "Thành công" : "Lỗi",
      description:
        response?.message || "Lịch sử trò chuyện đã được xóa thành công.",
      type: response?.status ? "success" : "error",
      duration: 3000,
    });
  };

  return (
    <AlertDialog
      title="Xóa lịch sử trò chuyện"
      content="Bạn có chắc chắn muốn xóa lịch sử trò chuyện của mình không? Hành động này không thể hoàn tác."
      loading={loading}
      confirmCallback={handleClearChat}
      trigger={
        <Button
          className="bg-red-500 text-white hover:opacity-80"
          rounded="xl"
          size="md"
        >
          Xóa lịch sử
        </Button>
      }
    />
  );
};

export default ClearChat;
