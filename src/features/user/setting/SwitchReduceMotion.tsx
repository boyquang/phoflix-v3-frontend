"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SwitchCustom = dynamic(() => import("@/components/shared/SwitchCustom"), {
  ssr: false,
});

const SwitchReduceMotion = () => {
  const [isReduceMotion, setIsReduceMotion] = useState(false);

  useEffect(() => {
    const reduceMotion = JSON.parse(
      localStorage.getItem("reduceMotion") || "false"
    );

    if (reduceMotion) {
      setIsReduceMotion(true);
      document.body.classList.add("reduce-motion");
    } else {
      setIsReduceMotion(false);
      document.body.classList.remove("reduce-motion");
    }
  }, []);

  const handleReduceMotionToggle = (checked: boolean) => {
    setIsReduceMotion(checked);
    localStorage.setItem("reduceMotion", JSON.stringify(checked));

    if (checked) {
      document.body.classList.add("reduce-motion");
    } else {
      document.body.classList.remove("reduce-motion");
    }
  };

  return (
    <SwitchCustom
      defaultChecked={isReduceMotion}
      callback={(checked: boolean) => {
        handleReduceMotionToggle(checked);
      }}
    />
  );
};

export default SwitchReduceMotion;
