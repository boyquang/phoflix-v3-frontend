"use client";

import useNotification from "@/hooks/useNotification";
import { updateToken } from "@/lib/actions/telegramBotAction";
import { Button, Input, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UpdateToken = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { notificationAlert } = useNotification();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateToken = async () => {
    if (token.trim() === "") return;

    setLoading(true);
    const response = await updateToken(token, session?.user.id as string);
    setLoading(false);

    if (response.status) {
      router.refresh();
      setToken("");
    }

    notificationAlert({
      type: response.status ? "success" : "error",
      title: "Thông báo",
      description: response.message || "Vui lòng thử lại sau.",
    });
  };

  return (
    <div className="flex items-center gap-4">
      <Input
        size="sm"
        placeholder="Nhập token mới cần cập nhật"
        value={token}
        min={45}
        max={100}
        className="border rounded-lg border-[#ffffff10] focus:border-gray-50"
        onChange={(e) => setToken(e.target.value)}
      />
      <Button
        disabled={token.trim() === ""}
        onClick={handleUpdateToken}
        size="sm"
        className="bg-primary rounded-lg text-gray-900 shadow-primary"
      >
        {loading && <Spinner size="sm" />}
        Cập nhật
      </Button>
    </div>
  );
};

export default UpdateToken;
