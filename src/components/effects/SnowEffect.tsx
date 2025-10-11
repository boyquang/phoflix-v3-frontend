"use client";

import {
  chiristmasDay,
  chiristmasMonth,
  totalShowDays,
} from "@/constants/event.contant";
import { getTodayDate } from "@/lib/utils";
import { checkEvent, setShowSnowEffect } from "@/store/slices/system.slice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snowfall from "react-snowfall";

const SnowEffect = () => {
  const { showSnowEffect } = useSelector((state: RootState) => state.system);
  const dispatch: AppDispatch = useDispatch();
  const { day, month } = getTodayDate();
  const [show, setShow] = useState(showSnowEffect);

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
    // + Bật: Nếu là ngày Giáng sinh hoặc người dùng bật hiệu ứng tuyết rơi
    // + Tắt: Nếu không phải ngày Giáng sinh và người dùng tắt hiệu ứng tuyết rơi

    if (isChiristmas || showSnowEffectLocal !== false) {
      dispatch(setShowSnowEffect(true));
    } else {
      dispatch(setShowSnowEffect(false));
    }
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Khi người dùng cuộn -> tắt tuyết ngay
      setShow(false);

      // ngừng cuộn trong 1 giây -> bật lại
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setShow(true);
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  if (!showSnowEffect || !show) return null;

  return (
    <Snowfall
      color="white"
      snowflakeCount={70}
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
