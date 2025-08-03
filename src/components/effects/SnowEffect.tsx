"use client";

import {
  chiristmasDay,
  chiristmasMonth,
  totalShowDays,
} from "@/constants/event.contant";
import { getTodayDate } from "@/lib/utils";
import { checkEvent, setShowSnowEffect } from "@/store/slices/system.slice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snowfall from "react-snowfall";

const SnowEffect = () => {
  const { showSnowEffect } = useSelector((state: RootState) => state.system);
  const dispatch: AppDispatch = useDispatch();
  const { day, month } = getTodayDate();

  const isChiristmas =
    month === chiristmasMonth &&
    day >= chiristmasDay - totalShowDays &&
    day <= chiristmasDay;

  useEffect(() => {
    dispatch(
      checkEvent({
        eventName: "chiristmas",
        status: isChiristmas,
      })
    );
  }, []);

  useEffect(() => {
    const showSnowEffectLocal = JSON.parse(
      localStorage.getItem("showSnowEffect") || "null"
    );

    // Trường hợp 1: Khi người dùng truy cập vào web đầu tiên và chưa chỉnh switch hiệu ứng tuyết rơi
    // Trường hợp 2: Khi người dùng đã chỉnh switch hiệu ứng tuyết rơi
    // + Bật: Nếu là ngày Giáng sinh, hiển thị hiệu ứng tuyết rơi
    // + Tắt: Nếu không phải ngày Giáng sinh, không hiển thị hiệu ứng tuyết rơi

    if (isChiristmas && showSnowEffectLocal !== false) {
      dispatch(setShowSnowEffect(true));
    } else {
      dispatch(setShowSnowEffect(false));
    }
  }, []);

  if (!showSnowEffect) return null;

  return (
    <Snowfall
      color="white"
      snowflakeCount={50}
      radius={[2, 4]}
      speed={[0.3, 0.7]}
      wind={[-0.5, 0.5]}
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 50,
        pointerEvents: "none",
      }}
    />
  );
};

export default SnowEffect;
