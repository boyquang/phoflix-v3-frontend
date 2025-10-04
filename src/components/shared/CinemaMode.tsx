"use client";

import { AppDispatch, RootState } from "@/store/store";
import ToggleButton from "./ToggleButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCinemaMode } from "@/store/slices/user.slice";

const CinemaMode = () => {
  const { cinemaMode } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const savedCinemaMode = JSON.parse(
      localStorage.getItem("cinema_mode") || "null"
    );
    if (savedCinemaMode !== null) {
      handleToggleCinemaMode(savedCinemaMode === 1);
      dispatch(setCinemaMode(savedCinemaMode === 1));
    }
  }, []);

  const handleToggleCinemaMode = (isCinemaMode: boolean) => {
    dispatch(setCinemaMode(isCinemaMode));
    if (isCinemaMode) {
      document.body.classList.add("cinema-mode");
    } else {
      document.body.classList.remove("cinema-mode");
    }
  };

  return (
    <ToggleButton
      label="Rạp phim"
      value={cinemaMode}
      callback={(isCinemaMode) => handleToggleCinemaMode(isCinemaMode)}
    />
  );
};

export default CinemaMode;
