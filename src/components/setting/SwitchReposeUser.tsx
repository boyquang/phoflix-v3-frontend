"use client";

import useNotification from "@/hooks/useNotification";
import { getFromStorage, setToStorage } from "@/lib/utils";
import { setStatusRepose } from "@/store/slices/system.slice";
import { AppDispatch, RootState } from "@/store/store";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SwitchCustom = dynamic(() => import("@/components/shared/SwitchCustom"), {
  ssr: false,
});

const SwitchReposeUser = () => {
  const { status: sleepReminder } = useSelector(
    (state: RootState) => state.system.warnUser.repose
  );
  const { notificationAlert } = useNotification();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const sleepReminderLocal = getFromStorage("sleepReminder", sleepReminder);

    dispatch(setStatusRepose(sleepReminderLocal));
  }, []);

  const handleReposeUserToggle = (checked: boolean) => {
    dispatch(setStatusRepose(checked));
    setToStorage("sleepReminder", checked);

    if (checked) {
      setToStorage("sleepAction", null);

      notificationAlert({
        title: "Chế độ nghỉ ngơi đã được bật",
        description: "Bạn sẽ nhận được thông báo khi đến giờ nghỉ ngơi.",
        type: "info",
        duration: 5000,
      });
    } else {
      notificationAlert({
        title: "Chế độ nghỉ ngơi đã được tắt",
        description: "Bạn sẽ không nhận được thông báo khi đến giờ nghỉ ngơi.",
        type: "info",
        duration: 5000,
      });
    }
  };

  return (
    <SwitchCustom
      defaultChecked={sleepReminder}
      callback={(checked: boolean) => {
        handleReposeUserToggle(checked);
      }}
    />
  );
};

export default SwitchReposeUser;
