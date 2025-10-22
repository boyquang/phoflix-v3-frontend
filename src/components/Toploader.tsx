"use client";

import {
  colorSystemDefault,
} from "@/constants/color.contant";
import useSetting from "@/hooks/useSetting";
import NextTopLoader from "nextjs-toploader";
import { useEffect, useState } from "react";

interface ToploaderProps {
  showSpinner?: boolean;
  height?: number;
}

const Toploader = ({ showSpinner = false, height = 2 }: ToploaderProps) => {
  const [color, setColor] = useState(colorSystemDefault);
  const { getColorSystem } = useSetting();

  useEffect(() => {
    const dataTheme = localStorage.getItem("dataTheme") || "";
    const colorSystem = getColorSystem(dataTheme).color;
    setColor(colorSystem || colorSystemDefault);
  }, []);

  return (
    <NextTopLoader color={color} showSpinner={showSpinner} height={height} />
  );
};

export default Toploader;
