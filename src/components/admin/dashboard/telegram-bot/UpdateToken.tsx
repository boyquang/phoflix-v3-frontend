"use client";

import { updateToken } from "@/lib/actions/telegram-bot.action";
import { Button, Input, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const UpdateToken = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateToken = async () => {
    if (!token.trim()) return;

    try {
      setLoading(true);
      const response = await updateToken(token, session?.user.id as string);

      if (response.status) {
        router.refresh();
        setToken("");
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
    <div className="flex items-center gap-4">
      <Input
        size="md"
        placeholder="Nhập token mới cần cập nhật"
        value={token}
        min={45}
        max={100}
        className="border rounded-lg border-[#ffffff10] focus:border-gray-50"
        onChange={(e) => setToken(e.target.value)}
      />
      <Button
        disabled={token.trim() === "" || loading}
        onClick={handleUpdateToken}
        size="md"
        className="bg-primary rounded-lg text-gray-900 shadow-primary"
      >
        Cập nhật
        {loading && <Spinner size="sm" />}
      </Button>
    </div>
  );
};

export default UpdateToken;
