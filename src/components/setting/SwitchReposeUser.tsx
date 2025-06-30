"use client";

import useNotification from "@/hooks/useNotification";
import { setStatusRepose } from "@/store/slices/systemSlice";
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
    const sleepReminderLocal = JSON.parse(
      localStorage.getItem("sleepReminder") || "false"
    );

    dispatch(setStatusRepose(sleepReminderLocal));
  }, []);

  const handleReposeUserToggle = (checked: boolean) => {
    dispatch(setStatusRepose(checked));
    localStorage.setItem("sleepReminder", JSON.stringify(checked));

    if (checked) {
      localStorage.setItem("sleepAction", JSON.stringify(null));
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
