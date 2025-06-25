"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface SwitchCustomProps {
  callback: (checked: boolean) => void;
  label?: string;
  resetSwitch?: boolean;
  defaultChecked?: boolean;
}

const SwitchCustom = ({
  callback,
  label,
  resetSwitch = false,
  defaultChecked = false,
}: SwitchCustomProps) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const nextValue = !isChecked;
    setIsChecked(nextValue);
    callback(nextValue);
  };

  useEffect(() => {
    if (resetSwitch) {
      setIsChecked(false);
      callback(false);
    }
  }, [resetSwitch]);

  return (
    <Box className="flex items-center gap-2" onClick={handleToggle}>
      <Box
        className={`border rounded-4xl w-[30px] h-5 relative cursor-pointer flex-shrink-0 transition-all duration-300 ease-in-out ${
          isChecked
            ? "border-[#ffd875] opacity-100"
            : "border-gray-50 opacity-30"
        }`}
      >
        <span
          className={`absolute top-[5px] w-2 h-2 rounded-full transition-all ${
            isChecked
              ? "left-[15px] bg-primary opacity-100"
              : "left-[5px] bg-gray-50 opacity-30"
          }`}
        ></span>
      </Box>
      <span className="text-xs text-gray-50">{label}</span>
    </Box>
  );
};

export default SwitchCustom;
