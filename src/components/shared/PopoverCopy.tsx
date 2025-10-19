"use client";

import { Box, Button, Input, Popover, Portal } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface PopoverCopyProps {
  title?: string;
  value?: string;
  trigger: React.ReactNode;
}

const PopoverCopy = ({ title, value, trigger }: PopoverCopyProps) => {
  const [isCopy, setIsCopy] = useState(false);
  const [valueCopy, setValueCopy] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setValueCopy(value || window.location.href);
    }
  }, [])

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(valueCopy)
      .then(() => {
        setIsCopy(true);
        setTimeout(() => setIsCopy(false), 2000);
      })
      .catch((error) => {
        alert("Lỗi khi sao chếp liên kết!");
      });
  };

  return (
    <Popover.Root autoFocus={false}>
      <Popover.Trigger asChild>
        <Box>{trigger}</Box>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner
          css={{
            zIndex: "123 !important",
          }}
        >
          <Popover.Content className="p-4 max-w-[240px] rounded-lg bg-white">
            {title && <p className="text-gray-900 text-xs">{title}</p>}
            <Input value={valueCopy} readOnly className="my-2 text-black" size="xs" />
            <Button
              onClick={handleCopyLink}
              size="xs"
              className="bg-[#212529] text-white"
            >
              {isCopy ? "Đã sao chép!" : "Sao chép"}
            </Button>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default PopoverCopy;
