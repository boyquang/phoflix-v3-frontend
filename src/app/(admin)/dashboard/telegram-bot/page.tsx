import Loading from "@/app/loading";
import { auth } from "@/auth";
import TableTokens from "@/components/admin/dashboard/telegram-bot/TableTokens";
import UpdateToken from "@/components/admin/dashboard/telegram-bot/UpdateToken";
import { getTokens } from "@/lib/actions/telegramBotAction";
import { Box } from "@chakra-ui/react";
import { Suspense } from "react";

const Page = async () => {
  const session = await auth();
  const resTokens = await getTokens(session?.user.id as string);

  const { result: tokens } = resTokens || {};

  return (
    <Suspense fallback={<Loading type="bars" />}>
      <Box className="text-gray-50">
        <h1 className="lg:text-3xl text-xl font-semibold mb-6">Telegram Bot</h1>
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
      </Box>
    </Suspense>
  );
};

export default Page;
