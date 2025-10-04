"use client";

import { useDispatch, useSelector } from "react-redux";
import ToggleButton from "../shared/ToggleButton";
import { AppDispatch, RootState } from "@/store/store";
import { setAutoNextEpisode } from "@/store/slices/user.slice";
import { useEffect } from "react";

const AutoNextEpisodeButton = () => {
  const dispatch: AppDispatch = useDispatch();
  const { autoNextEpisode } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const autoNextValue = JSON.parse(
      localStorage.getItem("auto_next_episode") || "null"
    );

    if (autoNextValue !== null) {
      dispatch(setAutoNextEpisode(autoNextValue === 1));
    }
  }, []);

  return (
    <ToggleButton
      value={autoNextEpisode}
      label="Chuyển tập"
      callback={(autoplayCb) => {
        dispatch(setAutoNextEpisode(autoplayCb));
      }}
    />
  );
};

export default AutoNextEpisodeButton;
