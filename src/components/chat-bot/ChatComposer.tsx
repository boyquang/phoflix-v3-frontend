"use client";

import { completions } from "@/lib/actions/chatBotAction";
import { formatTimestamp } from "@/lib/utils";
import {
  setGroupedChatByDate,
  setLoadingSendQuestion,
} from "@/store/slices/chatBotSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Box, IconButton, Textarea } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { IoArrowUp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import ClearChat from "./ClearChat";
import VoiceButton from "../shared/VoiceButton";
import { delay } from "lodash";

const ChatComposer = () => {
  const { loadingSendQuestion } = useSelector(
    (state: RootState) => state.chatBot
  );
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  const dispatch: AppDispatch = useDispatch();

  const handlSendQuestion = async (prompt: string) => {
    if (!prompt.trim()) return;

    dispatch(
      setGroupedChatByDate({
        date: formatTimestamp(new Date().getTime(), "DD/MM/YYYY"),
        message: {
          role: "user",
          content: prompt,
          createdAt: new Date().getTime(),
        },
      })
    );

    dispatch(setLoadingSendQuestion(true));
    setPrompt("");
    const response = await completions({
      userId: session?.user.id as string,
      prompt: prompt.trim(),
      accessToken: session?.user?.accessToken as string,
    });
    dispatch(setLoadingSendQuestion(false));

    const { status, result } = response || {};

    if (status) {
      dispatch(
        setGroupedChatByDate({
          date: formatTimestamp(result?.message?.createdAt, "DD/MM/YYYY"),
          message: result?.message,
        })
      );
    }
  };

  const handleCallbackVoiceSearch = async (keyword: string) => {
    setPrompt(keyword);
    delay(() => handlSendQuestion(keyword), 200);
  };

  return (
    <Box className="w-full border p-4 focus-within:border-white border-[#ffffff10] rounded-2xl focus:border-gray-50">
      <Textarea
        placeholder="Bạn có câu hỏi gì cho Bot không?"
        rows={1}
        resize="none"
        autoresize
        size="sm"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handlSendQuestion(prompt);
          }
        }}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        maxLength={500}
        maxH="120px"
        rounded="none"
        className="flex-1 border-0 text-white w-full p-0 outline-0 ring-0"
      />
      <Box className="flex items-center justify-between mt-4">
        <ClearChat />
        <Box className="flex items-center gap-2">
          <VoiceButton
            callback={(keyword: string) => handleCallbackVoiceSearch(keyword)}
            size="md"
            rounded="full"
          />
          <IconButton
            size="md"
            onClick={() => handlSendQuestion(prompt)}
            disabled={!prompt.trim() || loadingSendQuestion}
            loading={loadingSendQuestion}
            aria-label="Send question"
            className="bg-primary border-0 linear-gradient hover:opacity-80 text-black"
            rounded="full"
          >
            <IoArrowUp />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatComposer;
