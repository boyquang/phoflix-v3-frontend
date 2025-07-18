import Loading from "@/app/loading";
import { auth } from "@/auth";
import UpdateToken from "@/components/admin/dashboard/telegram-bot/UpdateToken";
import { getTokens } from "@/lib/actions/telegramBotAction";
import { formatDate } from "@/lib/utils";
import { Box } from "@chakra-ui/react";
import { Suspense } from "react";

const Page = async () => {
  const session = await auth();
  const resTokens = await getTokens(session?.user.id as string);

  const { status, result: tokens } = resTokens || {};

  return (
    <Suspense fallback={<Loading type="bars" />}>
      <Box className="text-gray-50">
        <h1 className="lg:text-3xl text-xl font-semibold mb-6">Telegram Bot</h1>
        <div className="mt-8">
          <UpdateToken />
          <div className="mt-8 overflow-x-auto">
            <h4 className="text-lg text-white mb-4">Lịch sử cập nhật</h4>

            {tokens && tokens.length === 0 ? (
              <p className="text-gray-400 text-base">
                Chưa có token nào được cập nhật.
              </p>
            ) : (
              <div className="border border-[#ffffff10] rounded-lg overflow-hidden">
                <table className="w-full table-auto text-sm text-gray-200 bg-transparent">
                  <thead className="bg-transparent border-b border-[#ffffff10]">
                    <tr>
                      <th className="px-4 py-3 text-left">#</th>
                      <th className="px-4 py-3 text-left">Token</th>
                      <th className="px-4 py-3 text-left">Người tạo</th>
                      <th className="px-4 py-3 text-left">Ngày tạo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens.map((token: any, index: number) => (
                      <tr
                        key={token.id}
                        className="border-b border-[#ffffff10] last:border-b-0 hover:bg-[#ffffff05] transition"
                      >
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3 font-mono">{token.botToken}</td>
                        <td className="px-4 py-3">{token.author.name}</td>
                        <td className="px-4 py-3">
                          {formatDate(token.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </Box>
    </Suspense>
  );
};

export default Page;
