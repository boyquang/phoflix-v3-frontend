import Loading from "@/app/loading";
import { auth } from "@/auth";
import ClientWrapper from "@/components/admin/dashboard/telegram-bot/ClientWrapper";
import TableTokens from "@/components/admin/dashboard/telegram-bot/TableTokens";
import UpdateToken from "@/components/admin/dashboard/telegram-bot/UpdateToken";
import { getTokens } from "@/lib/actions/telegram-bot.action";
import { Box } from "@chakra-ui/react";
import { Suspense } from "react";

const Page = async () => {
  // const session = await auth();
  // const response = await getTokens(session?.user.id as string);

  // const tokens = response?.result?.tokens || [];
  // const errorType = response?.errorType;
  // const message = response?.message || "Lỗi hệ thống. Vui lòng thử lại sau!";

  return (
    <Suspense fallback={<Loading type="bars" />}>
      {/* <Box className="text-gray-50">
        <h1 className="lg:text-3xl text-xl font-semibold mb-6">Telegram Bot</h1>

        {errorType === "InvalidToken" || errorType === "ServerError" ? (
          <p className="text-red-500 text-base mt-4">
            {errorType === "InvalidToken"
              ? "Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại."
              : message}
          </p>
        ) : (
          <div className="mt-8">
            <UpdateToken />
            <div className="mt-8 overflow-x-auto">
              <h4 className="text-lg text-white mb-4">Lịch sử cập nhật</h4>

              {!tokens || tokens?.length === 0 ? (
                <p className="text-gray-400 text-base">
                  Chưa có token nào được cập nhật.
                </p>
              ) : (
                <TableTokens tokens={tokens} />
              )}
            </div>
          </div>
        )}
      </Box> */}
      <ClientWrapper />
    </Suspense>
  );
};

export default Page;
