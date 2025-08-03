"use client";

import { setWidth } from "@/store/slices/system.slice";
import { AppDispatch } from "@/store/store";
import { debounce } from "lodash";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useResize = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = debounce(() => {
      dispatch(setWidth(window.innerWidth));
    }, 500);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
};

export default useResize;
