"use client";

import { Box } from "@chakra-ui/react";
import TableTokens from "./TableTokens";
import UpdateToken from "./UpdateToken";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getTokens } from "@/lib/actions/telegram-bot.action";
import { toast } from "sonner";
import Loading from "@/app/loading";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ClientWrapper = () => {
  const { data: session, status } = useSession();
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { triggerRefresh } = useSelector((state: RootState) => state.system);

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getTokens(session?.user?.id as string);

        if (response?.status) {
          setResponse(response);
        }
      } catch (error) {
        toast.error(
          "Lỗi hệ thống. Vui lòng thử lại sau hoặc liên hệ quản trị viên!"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [status, triggerRefresh]);

  if (loading) return <Loading height="h-96" />;

  return (
    <Box className="text-gray-50">
      <h1 className="lg:text-3xl text-xl font-semibold mb-6">Telegram Bot</h1>

      {response?.errorType === "InvalidToken" ||
      response?.errorType === "ServerError" ? (
        <p className="text-red-500 text-base mt-4">
          {response?.errorType === "InvalidToken"
            ? "Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại."
            : response?.message}
        </p>
      ) : (
        <div className="mt-8">
          <UpdateToken />
          <div className="mt-8 overflow-x-auto">
            <h4 className="text-lg text-white mb-4">Lịch sử cập nhật</h4>

            {!response?.result?.tokens ||
            response?.result?.tokens?.length === 0 ? (
              <p className="text-gray-400 text-base">
                Chưa có token nào được cập nhật.
              </p>
            ) : (
              <TableTokens tokens={response?.result?.tokens} />
            )}
          </div>
        </div>
      )}
    </Box>
  );
};

export default ClientWrapper;
