"use client";

import Loading from "@/app/loading";
import { fetchChatHistory } from "@/store/asyncThunks/chatBotAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Spinner } from "@chakra-ui/react";
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

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id && !fetched) {
      dispatch(
        fetchChatHistory({
          userId: session.user.id as string,
          limit: 10,
          before: undefined,
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

  const handleScroll = async () => {
    if (!containerRef.current || loading || !hasMore) return;

    const { scrollTop } = containerRef.current;

    // Kiểm tra nếu đã cuộn đến đầu danh sách
    if (scrollTop === 0) {
      const lastChat = chatHistory?.[0];

      if (lastChat) {
        setLoadMore(true);
        await dispatch(
          fetchChatHistory({
            userId: session?.user.id as string,
            limit: 10,
            before: lastChat.createdAt,
          })
        );
        setLoadMore(false);

        if (containerRef.current) {
          containerRef.current.scrollTo({
            top: 240, // Giữ khoảng cách 120px từ đầu
            behavior: "instant",
          });
        }
      }
    }
  };

  if (loading && !fetched) {
    return (
      <Box className="flex items-center justify-center h-full">
        <Loading type="bars" />
      </Box>
    );
  }

  if (groupedChatByDate?.length === 0 && fetched) {
    return (
      <Box className="flex items-center justify-center h-full">
        <h4 className="xs:text-lg text-base text-gray-400 font-semibold">
          Bạn chưa có cuộc trò chuyện nào với Bot.
        </h4>
      </Box>
    );
  }

  return (
    <Box
      className="overflow-y-auto max-h-[70vh]"
      ref={containerRef}
      onScroll={fetched ? handleScroll : undefined}
    >
      {loadMore && (
        <Box className="flex text-xs text-primary font-semibold items-center justify-center my-4 gap-1">
          <Spinner size="xs" />
          <span>Đang tải thêm...</span>
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
                className={`flex gap-2 mb-4 last:mb-0 items-start ${
                  chat.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {chat.role === "bot" && <AvatarBot />}
                <Box className="rounded-2xl p-2 bg-white text-black max-w-[75%]">
                  <Box className="text-sm font-semibold text-gray-600">
                    {chat.role === "user"
                      ? session?.user?.name || "Người dùng"
                      : "Bot"}
                  </Box>
                  {chat.content && (
                    <div className="text-sm text-justify">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={markdownComponents}
                      >
                        {chat.content}
                      </ReactMarkdown>
                    </div>
                  )}
                  <span className="text-xs text-gray-500">
                    {formatTimestamp(chat.createdAt, "HH:mm")}
                  </span>
                </Box>
              </Box>
            ))}
            {loadingSendQuestion && <LoadingSendQuestion />}
          </Box>
        ))}
      </Box>
      <div ref={scrollToBottomRef} className="h-0"></div>
    </Box>
  );
};

export default ChatHistoryBox;
