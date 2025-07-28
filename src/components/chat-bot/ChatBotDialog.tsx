"use client";

import { appConfig } from "@/configs/appConfig";
import { Box, CloseButton, Dialog, IconButton, Portal } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import ChatHistoryBox from "./ChatHistoryBox";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ChatComposer from "./ChatComposer";

const { dialog } = appConfig.charka;
const motionPresetDefault = dialog.motionPresetDefault;

const ChatBotDialog = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const { groupedChatByDate } = useSelector(
    (state: RootState) => state.chatBot
  );

  return (
    <Dialog.Root
      size="xs"
      open={open}
      motionPreset={motionPresetDefault}
      onOpenChange={({ open }) => setOpen(open)}
      scrollBehavior="outside"
      placement="center"
    >
      <Dialog.Trigger asChild>
        <div>
          <IconButton
            onClick={() => setOpen(true)}
            size="sm"
            className="bg-transparent overflow-hidden relative hover:shadow-[0_5px_10px_10px_rgba(255,255,255,.15)] transition-all duration-300 w-16 h-16 rounded-[25%] shadow-[0_0_10px_0_rgba(0,0,0,0.2)] flex flex-col justify-center items-center gap-1"
          >
            <img
              src="/images/bot.jpg"
              alt="Bot"
              className="absolute inset-0 w-full h-full object-cover rounded-[25%]"
            />
          </IconButton>
        </div>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner
          css={{
            zIndex: "9999 !important",
          }}
        >
          <Dialog.Content
            className="relative min-h-[90vh] text-gray-50 
              bg-[rgba(255,255,255,0.1)] 
              backdrop-blur-lg backdrop-saturate-150 
              rounded-2xl shadow-xl 
              ring-1 ring-white/30 
              mx-4 lg:max-w-[80%] max-w-[calc(100vw-32px)]"
          >
            <Dialog.CloseTrigger
              asChild
              className="absolute top-2 right-2 text-gray-300 hover:text-gray-100 hover:bg-transparent"
            >
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>

            <Dialog.Header p={0}>
              <Box className="xs:p-4 p-2 flex md:flex-row flex-col md:gap-2 gap-0 md:items-center items-start">
                <Dialog.Title className="xs:text-lg text-base">Trợ lý ảo</Dialog.Title>
                <Dialog.Description className="flex gap-1 items-center text-green-500 text-xs">
                  <Box className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Đang hoạt động
                </Dialog.Description>
              </Box>
            </Dialog.Header>
            <div className="w-full h-[1px] bg-[#ffffff10]"></div>
            <Dialog.Body
              p={0}
              className={`${
                !session || groupedChatByDate.length === 0
                  ? "flex items-center justify-center h-full"
                  : ""
              }`}
            >
              {!session ? (
                <h4 className="text-base text-gray-400 font-semibold">
                  Bạn cần đăng nhập để trò chuyện với Bot.
                </h4>
              ) : (
                <ChatHistoryBox />
              )}
            </Dialog.Body>

            {session && (
              <>
                <div className="w-full h-[1px] bg-[#ffffff10]"></div>
                <Dialog.Footer className="w-full xs:p-4 p-2">
                  <ChatComposer />
                </Dialog.Footer>
              </>
            )}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ChatBotDialog;
