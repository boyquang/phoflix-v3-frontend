"use client";

import { Button, Dialog, Portal } from "@chakra-ui/react";
import { useEffect } from "react";
import { appConfig } from "@/configs/app.config";
import { WARN_USER, TIME_SLEEP } from "@/constants/setting.contant";
import { usePathname } from "next/navigation";
import { useRouter } from 'nextjs-toploader/app';
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setCustomReposeUser,
  setOpenAlertRepose,
  setShowAnimationReposeUser,
  setStatusRepose,
} from "@/store/slices/system.slice";
import { getFromStorage, setToStorage, splitTime } from "@/lib/utils";

const { dialog } = appConfig.chakra;
const motionPresetDefault = dialog.motionPresetDefault;

// Chế độ nghỉ ngơi của người dùng
const { interval: intervalT } = TIME_SLEEP;

const ReposeUserAlert = () => {
  const pathname = usePathname();
  const { openAlert, message, title, action, status, startTime, endTime } =
    useSelector((state: RootState) => state.system.warnUser.repose);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  // Gán lại dữ liệu đã tạo trước đó
  useEffect(() => {
    const { sleepCustomPrompt, sleepEndTime, sleepStartTime } = getSleepData();

    dispatch(
      setCustomReposeUser({
        startTime: sleepStartTime,
        endTime: sleepEndTime,
        customPrompt: sleepCustomPrompt,
      })
    );
  }, []);

  const isSleepTimeNow = (
    hour: number,
    minute: number,
    startHours: number,
    startMinutes: number,
    endHours: number,
    endMinutes: number
  ) => {
    const current = hour * 60 + minute;
    const start = startHours * 60 + startMinutes;
    const end = endHours * 60 + endMinutes;

    if (start < end) {
      // Trường hợp: khoảng thời gian trong cùng 1 ngày (vd: 22:00 → 23:00)
      return current >= start && current < end;
    } else {
      // Trường hợp: qua đêm (vd: 23:00 → 05:00)
      return current >= start || current < end;
    }
  };

  const getSleepData = () => {
    const sleepReminder = getFromStorage("sleepReminder", status);
    const sleepAction = getFromStorage("sleepAction", action);
    const sleepStartTime = getFromStorage("sleepStartTime", startTime);
    const sleepEndTime = getFromStorage("sleepEndTime", endTime);
    const sleepCustomPrompt = getFromStorage(
      "sleepCustomPrompt",
      message["sleep-time"]
    );

    return {
      sleepReminder,
      sleepAction,
      sleepStartTime,
      sleepEndTime,
      sleepCustomPrompt,
    };
  };

  useEffect(() => {
    const checkSleepTime = () => {
      const { sleepReminder, sleepAction, sleepStartTime, sleepEndTime } =
        getSleepData();

      const now = new Date();
      const hour = Number(now.getHours());
      const minute = Number(now.getMinutes());

      const { hours: startHours, minutes: startMinutes } =
        splitTime(sleepStartTime);
      const { hours: endHours, minutes: endMinutes } = splitTime(sleepEndTime);

      const isSleepTime = isSleepTimeNow(
        hour,
        minute,
        startHours,
        startMinutes,
        endHours,
        endMinutes
      );

      if (sleepReminder && isSleepTime && sleepAction !== "dismiss") {
        dispatch(setOpenAlertRepose(true));
      } else {
        dispatch(setOpenAlertRepose(false));
      }
    };

    checkSleepTime();

    const interval = setInterval(checkSleepTime, intervalT);

    return () => clearInterval(interval);
  }, [pathname]);

  const handleDismiss = () => {
    dispatch(setOpenAlertRepose(false));
    dispatch(setStatusRepose(false));

    document.body.classList.remove("repose-user");
    setToStorage("sleepReminder", false);
    setToStorage("sleepAction", "dismiss");
  };

  const handleAccept = () => {
    dispatch(setOpenAlertRepose(false));
    dispatch(setShowAnimationReposeUser(true));

    router.push("/");
    document.body.classList.add("repose-user");
    setToStorage("sleepAction", "accept");
  };

  return (
    <Dialog.Root
      size="xs"
      placement="center"
      open={openAlert}
      onOpenChange={({ open }) => dispatch(setOpenAlertRepose(open))}
      scrollBehavior="outside"
      closeOnEscape={false}
      closeOnInteractOutside={false}
      motionPreset={motionPresetDefault}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner
          css={{
            zIndex: "9999 !important",
          }}
        >
          <Dialog.Content className="relative text-gray-50 bg-[#2a314e] rounded-2xl backdrop-blur max-w-[420px] mx-4">
            <Dialog.Header>
              <Dialog.Title>{title["sleep-time"]}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>{message["sleep-time"]}</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  size="xs"
                  onClick={handleDismiss}
                  variant="solid"
                  className="bg-gray-50 text-gray-900 min-w-24"
                >
                  Tiếp tục xem
                </Button>
              </Dialog.ActionTrigger>
              <Button
                onClick={handleAccept}
                size="xs"
                className="min-w-24 shadow-primary bg-primary text-gray-900"
              >
                Đi ngủ
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ReposeUserAlert;
