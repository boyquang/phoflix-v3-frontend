"use client";

import { appConfig } from "@/configs/app.config";
import { getFromStorage, setToStorage, splitTime } from "@/lib/utils";
import { setCustomReposeUser } from "@/store/slices/system.slice";
import { AppDispatch, RootState } from "@/store/store";
import { VscSettings } from "react-icons/vsc";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Portal,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const { dialog } = appConfig.charka;
const motionPresetDefault = dialog.motionPresetDefault;

const CustomTimeReposeUser = () => {
  const [open, setOpen] = useState(false);
  const {
    startTime: start_,
    endTime: end_,
    message,
  } = useSelector((state: RootState) => state.system.warnUser.repose);
  const [startTime, setStartTime] = useState(start_);
  const [endTime, setEndTime] = useState(end_);
  const [customPrompt, setCustomPrompt] = useState(message["sleep-time"]);
  const dispatch: AppDispatch = useDispatch();

  // Lấy dữ liệu từ localStorage
  useEffect(() => {
    setStartTime(getFromStorage("sleepStartTime", start_));
    setEndTime(getFromStorage("sleepEndTime", end_));
    setCustomPrompt(getFromStorage("sleepCustomPrompt", message["sleep-time"]));
  }, []);

  const handleApply = () => {
    const { hours: startHours, minutes: startMinutes } = splitTime(startTime);
    const { hours: endhours, minutes: endMinutes } = splitTime(endTime);

    // Kiểm tra xem thời gian bắt đầu và kết thúc có hợp lệ không
    if (startHours === endhours && startMinutes === endMinutes) {
      toast.error("Thời gian bắt đầu và kết thúc không thể giống nhau.");
      return;
    }

    const totalMinutesToday = 1440; // Tổng số phút trong một ngày (24 giờ * 60 phút)
    const diff =
      (endMinutes - startMinutes + totalMinutesToday) % totalMinutesToday;

    // Kiểm tra khoảng thời gian giữa bắt đầu và kết thúc
    if (diff < 30 && startHours === endhours) {
      toast.error("Khoảng thời gian giữa bắt đầu và kết thúc phải lớn hơn 30 phút.");
      return;
    }

    setToStorage("sleepStartTime", startTime);
    setToStorage("sleepEndTime", endTime);
    setToStorage("sleepCustomPrompt", customPrompt);

    dispatch(
      setCustomReposeUser({
        startTime,
        endTime,
        customPrompt,
      })
    );

    setOpen(false);
  };

  return (
    <Dialog.Root
      size="xs"
      open={open}
      motionPreset={motionPresetDefault}
      onOpenChange={({ open }) => setOpen(open)}
      scrollBehavior="outside"
    >
      <Dialog.Trigger asChild>
        <Box className="text-primary inline-flex items-center gap-1 hover:underline cursor-pointer">
          <VscSettings />
          Tùy chỉnh
        </Box>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner
          css={{
            zIndex: "9999 !important",
          }}
        >
          <Dialog.Content className="relative text-gray-50 bg-[#2a314e] rounded-2xl backdrop-blur max-w-md mx-4">
            <Dialog.CloseTrigger
              asChild
              className="absolute top-2 right-2 text-gray-300 hover:text-gray-100 hover:bg-transparent"
            >
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>

            <Dialog.Header>
              <Dialog.Title>Tùy chỉnh nhắc nhở</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Box className="flex flex-col gap-4">
                <Box className="flex items-center justify-between gap-4">
                  <Box className="flex items-center gap-2">
                    <label className="whitespace-nowrap xs:text-sm text-xs text-gray-200">
                      Bắt đầu:
                    </label>
                    <input
                      type="time"
                      className="bg-[#ffffff10] text-gray-50 rounded px-2 py-1 border border-gray-600 focus-within:border-gray-200 outline-none"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </Box>
                  <Box className="flex gap-2 items-center">
                    <label className="whitespace-nowrap xs:text-sm text-xs text-gray-200">
                      Kết thúc:
                    </label>
                    <input
                      type="time"
                      className="bg-[#ffffff10] text-gray-50 rounded px-2 py-1 border border-gray-600 focus-within:border-gray-200 outline-none"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </Box>
                </Box>
                <Box className="flex flex-col gap-2">
                  <label className="xs:text-sm text-xs text-gray-200">
                    Lời nhắc:
                  </label>
                  <Textarea
                    variant="outline"
                    autoresize
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    resize="none"
                    value={customPrompt}
                    maxLength={500}
                    className="border-gray-600 focus-within:border-gray-50"
                    placeholder="Tùy chỉnh lời nhắc của bạn tại đây"
                  />
                </Box>
              </Box>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  size="xs"
                  variant="solid"
                  className="bg-gray-50 text-gray-900 min-w-24"
                >
                  Đóng
                </Button>
              </Dialog.ActionTrigger>
              <Button
                onClick={handleApply}
                size="xs"
                className="min-w-24 shadow-primary bg-primary text-gray-900"
              >
                Áp dụng
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CustomTimeReposeUser;
