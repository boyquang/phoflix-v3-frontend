"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface SwitchCustomProps {
  callback: (checked: boolean) => void;
  label?: string;
  resetSwitch?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  labelPosition?: "left" | "right";
}

const SwitchCustom = ({
  callback,
  label,
  resetSwitch = false,
  defaultChecked = false,
  disabled = false,
  labelPosition = "right",
}: SwitchCustomProps) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(defaultChecked);
  }, [defaultChecked]);

  const handleToggle = () => {
    if (disabled) return;

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
    <Box
      className={`flex items-center gap-2 ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={handleToggle}
    >
      {label && labelPosition === "left" && (
        <span className="text-xs text-gray-50 whitespace-nowrap">{label}</span>
      )}
      <Box
        className={`border rounded-4xl w-[30px] h-5 relative flex-shrink-0 transition-all duration-300 ease-in-out ${
          isChecked ? "border-primary opacity-100" : "border-gray-50 opacity-30"
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
      {label && labelPosition === "right" && (
        <span className="text-xs text-gray-50 whitespace-nowrap">{label}</span>
      )}
    </Box>
  );
};

export default SwitchCustom;
