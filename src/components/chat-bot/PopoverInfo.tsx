"use client";
import { RootState } from "@/store/store";
import { Button, IconButton, Popover, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { useSelector } from "react-redux";

const PopoverInfo = () => {
  const [open, setOpen] = useState(false);
  const { dailyChatLimit } = useSelector((state: RootState) => state.chatBot);

  return (
    <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Popover.Trigger asChild>
        <IconButton
          size="xs"
          className="bg-transparent text-white rounded-full hover:bg-[#ffffff10]"
          aria-label="Info"
        >
          <FaCircleInfo />
        </IconButton>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner
          css={{
            zIndex: "9999 !important",
          }}
        >
          <Popover.Content>
            <Popover.Body>
              <div className="max-w-xs p-4">
                <h3 className="text-sm font-semibold mb-2">Thông tin</h3>
                <p className="text-xs text-gray-600 mb-2">
                  Bạn có thể hỏi tôi về thông tin phim, đề xuất phim, hoặc bất
                  kỳ câu hỏi nào liên quan đến phim ảnh.
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  Giới hạn: {dailyChatLimit} câu hỏi mỗi ngày.
                </p>
                <p className="text-xs text-gray-600">
                  Vui lòng sử dụng dịch vụ một cách hợp lý để tránh bị giới hạn
                  tạm thời.
                </p>
              </div>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default PopoverInfo;
