"use client";

import { appConfig } from "@/configs/app.config";
import { Box, CloseButton, Dialog, IconButton, Portal } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ChatHistoryBox from "./ChatHistoryBox";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import ChatComposer from "./ChatComposer";
import { botAvatar } from "@/constants/image.contant";
import Image from "../shared/Image";
import PopoverInfo from "./PopoverInfo";
import { setOpenDialog } from "@/store/slices/chat-bot.slice";

const { dialog } = appConfig.chakra;
const motionPresetDefault = dialog.motionPresetDefault;

const ChatBotDialog = () => {
  const { data: session } = useSession();
  const { groupedChatByDate, open } = useSelector(
    (state: RootState) => state.chatBot
  );
  const [showText, setShowText] = useState(true);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Dialog.Root
      size="full"
      open={open}
      motionPreset={motionPresetDefault}
      onOpenChange={({ open }) => dispatch(setOpenDialog(open))}
      scrollBehavior="outside"
      placement="center"
    >
      <Dialog.Trigger asChild>
        <div className="relative">
          <IconButton
            onClick={() => dispatch(setOpenDialog(true))}
            size="sm"
            className="bg-transparent overflow-hidden relative w-12 h-12 rounded-[25%] shadow-[0_0_10px_0_rgba(0,0,0,0.2)] flex flex-col justify-center items-center gap-1"
          >
            <Image src={botAvatar} alt="Trợ lý ảo" className="rounded-[25%]" />
          </IconButton>

          <Box
            className={`
              lg:block hidden absolute right-full top-0 mr-1 bg-white text-black w-40 text-xs px-2 py-1 
              transition-opacity duration-300 rounded-md shadow-lg ${
                showText ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
          >
            Nhấn vào đây để bắt đầu trò chuyện cùng trợ lý ảo!
          </Box>
        </div>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Positioner
          css={{
            zIndex: "9998 !important",
          }}
        >
          <Dialog.Content
            className="relative text-black
              bg-[#ffffff1a] 
              backdrop-blur-lg backdrop-saturate-150 
              ring-1 ring-white/30"
          >
            <Dialog.CloseTrigger
              asChild
              className="absolute top-2 right-2 text-gray-300 hover:text-gray-100 hover:bg-transparent"
            >
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>

            <Dialog.Header p={0}>
              <Box className="p-4 flex items-center gap-1">
                <Dialog.Title className="xs:text-lg text-center inline-block font-semibold text-base text-gradient">
                  Trợ lý ảo
                </Dialog.Title>
                <PopoverInfo />
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
                <h4 className="text-base text-gray-400 font-semibold p-4 text-center">
                  Bạn cần đăng nhập để trò chuyện với trợ lý ảo.
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
