"use client";

import SettingItem from "@/components/setting/SettingItem";
import SwitchReduceMotion from "@/components/setting/SwitchReduceMotion";
import SwitchReposeUser from "@/components/setting/SwitchReposeUser";
import SwitchSnowEffect from "@/components/setting/SwitchSnowEffect";
import { TIME_SLEEP } from "@/constants/setting";
import { Box, IconButton, Popover, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { IoMdSettings } from "react-icons/io";

const PopoverSetting = () => {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root
      size="xs"
      autoFocus={false}
      open={open}
      onOpenChange={({ open }) => setOpen(open)}
    >
      <Popover.Trigger asChild>
        <Box className="cursor-pointer relative">
          <IconButton
            onClick={() => setOpen(!open)}
            aria-label="Cài đặt"
            size="sm"
            variant="outline"
            className="bg-transparent text-gray-50 lg:border-[#ffffff86] lg:border border-0"
            rounded="full"
          >
            <IoMdSettings />
          </IconButton>
        </Box>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            rounded="xl"
            p={0}
            className="bg-[#0f111af2] text-gray-50 border border-[#ffffff10] max-w-sm"
          >
            <Popover.Arrow />
            <Popover.Header p={0}>
              <Box className="p-4 border-b-[0.5px] border-[#ffffff10]">
                <h3 className="text-lg font-semibold">Cài đặt</h3>
              </Box>
            </Popover.Header>
            <Popover.Body p={4}>
              <div className="flex flex-col gap-4">
                <SettingItem
                  label="Hiệu ứng tuyết rơi"
                  description="Bạn chỉ có thể tùy chỉnh vào dịp Giáng sinh"
                  control={<SwitchSnowEffect />}
                />
                <SettingItem
                  label="Chế độ tối ưu"
                  description="Giảm hiệu ứng chuyển động để cải thiện hiệu suất"
                  control={<SwitchReduceMotion />}
                />
                <SettingItem
                  label="Chế độ nghỉ ngơi"
                  description={`Tự động nhắc nhở bạn đi ngủ vào lúc ${TIME_SLEEP.start}h tối đến ${TIME_SLEEP.end}h sáng`}
                  control={<SwitchReposeUser />}
                />
              </div>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default PopoverSetting;
