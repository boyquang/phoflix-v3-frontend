"use client";

import { useState } from "react";
import AlertDialog from "../shared/AlertDialog";
import { clearHistory } from "@/lib/actions/chat-bot.action";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { resetChat } from "@/store/slices/chat-bot.slice";
import { Button } from "@chakra-ui/react";
import { toast } from "sonner";

const ClearChat = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const dispatch: AppDispatch = useDispatch();

  const handleClearChat = async () => {
    try {
      setLoading(true);
      const response = await clearHistory(
        session?.user.id as string,
        session?.user.accessToken as string
      );

      if (response?.status) {
        dispatch(resetChat());
        toast.success(
          response?.message || "Lịch sử trò chuyện đã được xóa thành công"
        );
      } else {
        toast.error(
          response?.message || "Đã có lỗi xảy ra khi xóa lịch sử trò chuyện"
        );
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
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
