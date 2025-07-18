"use client";

import { IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { TokenType } from "./TableTokens";

interface TokenProps {
  token: TokenType;
  loading: boolean;
  callback: (token: string) => Promise<string | null>;
}

const Token = ({ token, loading, callback }: TokenProps) => {
  const [isShowToken, setIsShowToken] = useState(false);
  const [tokenData, setTokenData] = useState<string | null>("*************************");

  useEffect(() => {
    setTokenData(token.botToken);
  }, [token]);

  const handleToggle = async () => {
    if (isShowToken) {
      setIsShowToken(false);
      setTokenData(token.botToken);
      return;
    }

    const tokenValue = await callback(token.id);
    setTokenData(tokenValue ? tokenValue : token.botToken);
    setIsShowToken(true);
  };

  return (
    <div className="flex items-center gap-2 text-white" onClick={handleToggle}>
      {loading ? (
        <div className="animate-pulse bg-gray-300 h-4 w-36 rounded"></div>
      ) : (
        <span>{tokenData}</span>
      )}
      <IconButton
        disabled={loading}
        size="xs"
        className="border border-[#ffffff10] bg-transparent rounded-full hover:text-[#ffd875] hover:border-[#ffd875]"
      >
        {isShowToken ? <FaEyeSlash /> : <FaEye />}
      </IconButton>
    </div>
  );
};

export default Token;
