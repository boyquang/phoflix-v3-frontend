"use client";

import { Button, Dialog, Portal } from "@chakra-ui/react";
import { useEffect } from "react";
import { appConfig } from "@/configs/appConfig";
import { WARN_USER, TIME_SLEEP } from "@/constants/setting";
import { usePathname, useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenAlertRepose,
  setShowAnimationReposeUser,
  setStatusRepose,
} from "@/store/slices/systemSlice";

const { dialog } = appConfig.charka;
const motionPresetDefault = dialog.motionPresetDefault;

// Chế độ nghỉ ngơi của người dùng
const { title, message } = WARN_USER.repose;
const { start, end, interval: intervalT } = TIME_SLEEP;

const ReposeUserAlert = () => {
  const pathname = usePathname();
  const { openAlert } = useSelector(
    (state: RootState) => state.system.warnUser.repose
  );
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const checkSleepTime = () => {
      const sleepReminder = JSON.parse(
        localStorage.getItem("sleepReminder") || "false"
      );
      const sleepAction = JSON.parse(
        localStorage.getItem("sleepAction") || "null"
      );

      const now = new Date();
      const hour = now.getHours();

      const isSleepTime = hour >= start || hour < end;

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
    localStorage.setItem("sleepReminder", JSON.stringify(false));
    localStorage.setItem("sleepAction", JSON.stringify("dismiss"));
  };

  const handleAccept = () => {
    dispatch(setOpenAlertRepose(false));
    dispatch(setShowAnimationReposeUser(true));

    router.push("/");
    document.body.classList.add("repose-user");
    localStorage.setItem("sleepAction", JSON.stringify("accept"));
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
