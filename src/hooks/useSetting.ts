"use client";

import { colorSystemConfig } from "@/constants/color.contant";

const useSetting = () => {
  const getColorSystem = (dataTheme: string): ColorSystemConfig => {
    const colorSystem = colorSystemConfig.find(
      (item) => item.name === dataTheme
    );

    return colorSystem || colorSystemConfig[0];
  };

  return { getColorSystem };
};

export default useSetting;
