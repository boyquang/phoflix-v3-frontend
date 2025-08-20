"use client";

import { getFromStorage, setToStorage } from "@/lib/utils";
import { setStatusRepose } from "@/store/slices/system.slice";
import { AppDispatch, RootState } from "@/store/store";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const SwitchCustom = dynamic(() => import("@/components/shared/SwitchCustom"), {
  ssr: false,
});

const SwitchReposeUser = () => {
  const { status: sleepReminder } = useSelector(
    (state: RootState) => state.system.warnUser.repose
  );
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
    }

    toast.success(`Chế độ nghỉ ngơi đã ${checked ? "bật" : "tắt"} thành công`);
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
