"use client";

import {
  chiristmasDay,
  chiristmasMonth,
  totalShowDays,
} from "@/constants/chirismas";
import { getTodayDate } from "@/lib/utils";
import {
  getShowSnowEffect,
  setShowSnowEffect,
} from "@/store/slices/systemSlice";
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
    dispatch(getShowSnowEffect());
  }, []);

  useEffect(() => {
    if (isChiristmas && !showSnowEffect) {
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
