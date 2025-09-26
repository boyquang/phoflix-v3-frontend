"use client";

import { Box } from "@chakra-ui/react";
import ChatTime from "./ChatTime";
import AvatarBot from "./AvartarBot";
import { formatTimestamp } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import MessageContent from "./MessageContent";

interface MessageItemProps {
  section: {
    date: string;
    messages: Array<{
      id: string;
      role: "user" | "bot";
      content: string;
      createdAt: number;
      movies: Movie[];
    }>;
  };
}

const MessageItem = ({ section }: MessageItemProps) => {
  return (
    <Box className="">
      <Box className="flex justify-center items-center mb-4">
        <ChatTime date={section?.date} />
      </Box>
      {section?.messages?.map((chat, index) => (
        <Box
          key={chat?.id + "phohoccode" + index}
          className={`flex gap-2 mb-6 last:mb-0 items-start ${
            chat?.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {chat?.role === "bot" && <AvatarBot />}
          <Box
            className={`px-4 py-2 shadow-sm text-black min-w-12 lg:max-w-[75%] max-w-[90%]
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

            <MessageContent
              role={chat?.role}
              content={chat?.content}
              movies={chat?.movies}
            />

            <span className="text-xs text-black">
              {formatTimestamp(chat?.createdAt, "HH:mm")}
            </span>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default MessageItem;
