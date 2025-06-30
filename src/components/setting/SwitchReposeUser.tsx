"use client";

import useNotification from "@/hooks/useNotification";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SwitchCustom = dynamic(() => import("@/components/shared/SwitchCustom"), {
  ssr: false,
});

const SwitchReposeUser = () => {
  const [sleepReminder, setSleepReminder] = useState(false);
  const { notificationAlert } = useNotification();

  useEffect(() => {
    const sleepReminderLocal = JSON.parse(
      localStorage.getItem("sleepReminder") || "false"
    );

    setSleepReminder(sleepReminderLocal);
  }, []);

  const handleReposeUserToggle = (checked: boolean) => {
    setSleepReminder(checked);
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
