"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface ToggleButtonProps {
  label: string;
  value?: boolean;
  callback?: (value: boolean) => void;
}

export default function ToggleButton({
  label,
  value,
  callback,
}: ToggleButtonProps) {
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    if (value !== undefined) {
      setToggled(value);
    }
  }, [value]);

  const handleToggle = () => {
    const newValue = !toggled;
    setToggled(newValue);
    if (callback) callback(newValue);
  };

  return (
    <Box
      onClick={handleToggle}
      className="p-2 select-none sm:min-w-16 cursor-pointer rounded-lg flex justify-center items-center gap-2 transition-all hover:bg-[#ffffff05]"
    >
      <span className="text-xs whitespace-nowrap text-gray-50">{label}</span>
      <span
        className={`text-[10px] px-1 h-5 flex items-center justify-center rounded-sm border bg-transparent whitespace-nowrap
        ${
          toggled
            ? "border-primary text-primary"
            : "border-gray-100 text-gray-100"
        }
        `}
      >
        {toggled ? "ON" : "OFF"}
      </span>
    </Box>
  );
}
