"use client";

import { formatDate } from "@/lib/utils";
import Token from "./Token";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { showToken } from "@/lib/actions/telegram-bot.action";

export type TokenType = {
  id: string;
  author: {
    id: string;
    name: string;
  };
  botToken: string;
  createdAt: string;
};

interface TokenProps {
  tokens: TokenType[];
}

const TableTokens = ({ tokens }: TokenProps) => {
  const [loadingShowToken, setLoadingShowToken] = useState<string | null>(null);
  const { data: session } = useSession();

  const handleShowToken = async (tokenId: string) => {
    setLoadingShowToken(tokenId);
    const response = await showToken(session?.user.id as string, tokenId);
    setLoadingShowToken(null);

    return response?.result?.botToken || null;
  };

  return (
    <div className="border border-[#ffffff10] rounded-lg">
      <div className="w-full overflow-x-auto">
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
            {tokens?.map((token: any, index: number) => (
              <tr
                key={token.id}
                className="border-b border-[#ffffff10] last:border-b-0 hover:bg-[#ffffff05] transition"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-mono">
                  <Token
                    token={token}
                    loading={loadingShowToken === token.id}
                    callback={handleShowToken}
                  />
                </td>
                <td className="px-4 py-3">{token.author.name}</td>
                <td className="px-4 py-3">{formatDate(token.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableTokens;
