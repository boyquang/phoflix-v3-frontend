"use client";

import SwitchCustom from "@/components/shared/SwitchCustom";
import {
  chiristmasDay,
  chiristmasMonth,
  totalShowDays,
} from "@/constants/chirismas";
import { getTodayDate } from "@/lib/utils";
import { setShowSnowEffect } from "@/store/slices/systemSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

const SwitchSnowEffectWrapper = () => {
  const dispatch: AppDispatch = useDispatch();
  const { showSnowEffect } = useSelector((state: RootState) => state.system);
  const { day, month } = getTodayDate();

  // Kiểm tra xem có phải ngày Giáng sinh hay không
  const isChiristmas =
    month === chiristmasMonth &&
    day >= chiristmasDay - totalShowDays &&
    day <= chiristmasDay;

  return (
    <SwitchCustom
      disabled={!isChiristmas}
      defaultChecked={showSnowEffect}
      callback={(checked: boolean) => {
        dispatch(setShowSnowEffect(checked));
      }}
    />
  );
};

export default SwitchSnowEffectWrapper;
