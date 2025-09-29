"use client";

import Loading from "@/app/loading";
import { fetchChatHistory } from "@/store/async-thunks/chat-bot.thunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box, IconButton } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSendQuestion from "./LoadingSendQuestion";
import useScrollLoadTop from "@/hooks/useScrollLoadTop";
import MessageItem from "./MessageItem";
import { HiOutlineArrowDown } from "react-icons/hi2";

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
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [scrollToBottom, setScrollToBottom] = useState(true);

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

  // Hiển thị nút cuộn xuống cuối khi người dùng cuộn lên trên
  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;

      // Nếu khoảng cách từ đáy đến cuối lớn hơn 300px thì hiện nút
      if (scrollHeight - scrollTop - clientHeight > 300) {
        setShowScrollToBottom(true);
      } else {
        setShowScrollToBottom(false);
      }
    };

    container.addEventListener("scroll", handleScroll);
  }, [fetched]);

  const handleScrollToBottom = () => {
    if (scrollToBottomRef.current) {
      scrollToBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Cuộn xuống cuối cùng khi có dữ liệu mới hoặc khi lần đầu tiên tải dữ liệu
  useEffect(() => {
    if (fetched) handleScrollToBottom();
  }, [fetched, loadingSendQuestion, scrollToBottom]);

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
    <Box className="relative">
      <Box
        className="overflow-y-auto max-h-[calc(70vh-32px)] "
        ref={containerRef}
      >
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
            <MessageItem key={index} section={section} />
          ))}
          {loadingSendQuestion && <LoadingSendQuestion />}
        </Box>

        <div ref={scrollToBottomRef} className="h-0"></div>
      </Box>
      <Box
        className={`absolute z-20 bottom-0 left-1/2 -translate-x-1/2 transition-all ${
          showScrollToBottom ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <IconButton
          onClick={() => setScrollToBottom(!scrollToBottom)}
          rounded="full"
          size="sm"
          className="bg-white text-black transition-all hover:scale-125 shadow-2xl border-[#0d0d0d1a] border"
        >
          <HiOutlineArrowDown />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatHistoryBox;
