"use client";

import { Box, Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { AiFillPlusCircle } from "react-icons/ai";

interface GuideCreateRoomProps {
  trigger: React.ReactNode;
}

const GuideCreateRoom = ({ trigger }: GuideCreateRoomProps) => {
  const guides = [
    "Tìm phim bạn muốn xem chung",
    "Chuyển tới trang xem của tập phim đó, chọn biểu tượng xem chung trên thanh công cụ phía dưới player.",
    "Điền tiêu đề phòng và chọn tạo phòng.",
    "Hoàn thành! Chia sẻ link phòng cho bạn bè và tận hưởng thôi nào!",
  ];

  return (
    <Dialog.Root placement="center">
      <Dialog.Trigger asChild>
        <Box>{trigger}</Box>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            p={8}
            className="bg-[#282b3a] rounded-2xl border border-[#fff2] max-w-md mx-4"
          >
            <Dialog.Header
              p={0}
              className="flex flex-col gap-2 text-white mb-4"
            >
              <Dialog.Title>Tạo phòng xem chung</Dialog.Title>
              <Dialog.Description className="text-xs text-gray-400">
                Hướng dẫn nhanh cách tạo phòng xem chung
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body p={0}>
              <Box className="border-t border-[#fff1]">
                {guides.map((item, index) => (
                  <Box
                    className="flex items-center gap-5 border-b border-[#fff1] last:border-none"
                    key={index}
                  >
                    <Box className="flex-shrink-0 w-[30px] text-4xl text-primary font-normal">
                      {index + 1}
                    </Box>
                    <Box className="text-sm flex-1 text-white py-5">{item}</Box>
                  </Box>
                ))}
              </Box>
            </Dialog.Body>
            <Dialog.Footer p={0} className="mt-6">
              <Dialog.ActionTrigger asChild>
                <Button className="bg-white hover:opacity-75 text-black w-full rounded-md">
                  Đã hiểu
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton
                size="sm"
                className="bg-transparen text-white hover:bg-transparent"
              />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default GuideCreateRoom;
