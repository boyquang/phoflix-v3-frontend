"use client";

import Loading from "@/app/loading";
import { fetchChatHistory } from "@/store/async-thunks/chat-bot.thunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatTimestamp } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import AvatarBot from "./AvartarBot";
import LoadingSendQuestion from "./LoadingSendQuestion";
import ChatTime from "./ChatTime";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "../shared/MarkdownComponents";
import useScrollLoadTop from "@/hooks/useScrollLoadTop";

const ChatHistoryBox = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data: session, status } = useSession();
  const {
    chatHistory,
    loading,
    fetched,
    groupedChatByDate,
    hasMore,
    loadingSendQuestion,
  } = useSelector((state: RootState) => state.chatBot);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottomRef = useRef<HTMLDivElement | null>(null);
  const [loadMore, setLoadMore] = useState(false);

  const handleLoadMore = async () => {
    const lastChat = chatHistory?.[0];

    if (lastChat) {
      setLoadMore(true);
      await dispatch(
        fetchChatHistory({
          userId: session?.user.id as string,
          limit: 10,
          before: lastChat?.createdAt || undefined,
          accessToken: session?.user?.accessToken as string,
        })
      );
      setLoadMore(false);
    }
  };

  // Sử dụng hook để tải thêm dữ liệu khi cuộn lên đầu
  useScrollLoadTop({
    containerRef,
    onLoadMore: handleLoadMore,
    enabled: fetched && hasMore,
    options: {
      restoreOffset: 240,
      debounceTime: 0,
      behavior: "instant",
    },
  });

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id && !fetched) {
      dispatch(
        fetchChatHistory({
          userId: session.user.id as string,
          limit: 10,
          before: undefined,
          accessToken: session?.user?.accessToken as string,
        })
      );
    }
  }, [status, fetched]);

  // Cuộn xuống cuối cùng khi có dữ liệu mới hoặc khi lần đầu tiên tải dữ liệu
  useEffect(() => {
    if (fetched && scrollToBottomRef.current) {
      scrollToBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [fetched, loadingSendQuestion]);

  if (loading && !fetched) {
    return (
      <Box className="flex items-center justify-center h-[calc(70vh-32px)]">
        <Loading type="bars" />
      </Box>
    );
  }

  if (groupedChatByDate?.length === 0 && fetched) {
    return (
      <Box className="flex items-center justify-center h-full p-4 text-center">
        <h4 className="text-base text-gray-400 font-semibold">
          Xin chào {session?.user.name || "bạn"}! Bạn muốn hỏi gì hôm nay?
        </h4>
      </Box>
    );
  }

  return (
    <Box className="overflow-y-auto max-h-[calc(70vh-32px)]" ref={containerRef}>
      {loadMore && (
        <Box className="flex items-center justify-center my-4">
          <Box className="flex space-x-1">
            <span className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="h-2 w-2 bg-white rounded-full animate-bounce"></span>
          </Box>
        </Box>
      )}

      <Box className="flex flex-col gap-6 h-full xs:p-4 p-2">
        {groupedChatByDate?.map((section, index) => (
          <Box key={index}>
            <Box className="flex justify-center items-center mb-4">
              <ChatTime date={section?.date} />
            </Box>
            {section?.messages?.map((chat, index) => (
              <Box
                key={index}
                className={`flex gap-2 mb-6 last:mb-0 items-start ${
                  chat?.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {chat?.role === "bot" && <AvatarBot />}
                <Box
                  className={`p-2 shadow-sm text-black min-w-12 max-w-[75%] 
                  ${
                    chat?.role === "user"
                      ? "bg-white liner-gradient rounded-tl-2xl rounded-tr-md rounded-bl-2xl rounded-br-2xl"
                      : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-tl-md rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"
                  }`}
                >
                  {chat?.role === "bot" && (
                    <Box className="text-sm font-semibold truncate text-white">
                      Trợ lý ảo
                    </Box>
                  )}
                  {chat?.content && (
                    <div className="text-sm text-justify">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={markdownComponents}
                      >
                        {chat?.content || "Nội dung trống"}
                      </ReactMarkdown>
                    </div>
                  )}
                  <span className="text-xs text-gray-700">
                    {formatTimestamp(chat?.createdAt, "HH:mm")}
                  </span>
                </Box>
              </Box>
            ))}
          </Box>
        ))}
        {loadingSendQuestion && <LoadingSendQuestion />}
      </Box>
      <div ref={scrollToBottomRef} className="h-0"></div>
    </Box>
  );
};

export default ChatHistoryBox;
