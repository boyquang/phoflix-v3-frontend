"use client";

import { colorSystemDefault } from "@/constants/color.contant";
import useSetting from "@/hooks/useSetting";
import { RootState } from "@/store/store";
import NextTopLoader from "nextjs-toploader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface ToploaderProps {
  showSpinner?: boolean;
  height?: number;
}

const Toploader = ({ showSpinner = false, height = 2 }: ToploaderProps) => {
  const [color, setColor] = useState(colorSystemDefault);
  const { getColorSystem } = useSetting();
  const { dataTheme } = useSelector((state: RootState) => state.system);

  useEffect(() => {
    const dataTheme = localStorage.getItem("dataTheme") || "";
    const colorSystem = getColorSystem(dataTheme).color;
    setColor(colorSystem || colorSystemDefault);
  }, []);

  useEffect(() => {
    const colorSystem = getColorSystem(dataTheme).color;
    setColor(colorSystem || colorSystemDefault);
  }, [dataTheme]);

  return (
    <NextTopLoader color={color} showSpinner={showSpinner} height={height} />
  );
};

export default Toploader;
