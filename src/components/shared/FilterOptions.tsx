"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { Box } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { LuEllipsisVertical } from "react-icons/lu";

interface FilterOptionsProps {
  options: {
    label: string;
    value: string;
  }[];
  onChange: (value: string) => void;
}

const FilterOptions = ({ options, onChange }: FilterOptionsProps) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(
    options[0].value
  );
  const menuRef = useRef<HTMLUListElement | null>(null);

  // xử lý click ra ngoài
  useClickOutside(menuRef, () => setOpen(false));

  const handleSelectOption = (value: string) => {
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <Box ref={menuRef} className="relative">
      <Box
        onClick={() => setOpen(!open)}
        className="w-[30px] cursor-pointer h-[30px] flex items-center justify-center border rounded-full border-[#ffffff80] hover:border-white"
      >
       <LuEllipsisVertical />
      </Box>
      {open && (
        <ul className="py-2 mt-1 bg-white w-[150px] rounded-md absolute z-[123] top-full left-0">
          {options.map((option, index) => (
            <li
              key={index}
              className={`flex cursor-pointer text-black items-center px-4 text-xs py-2 ${
                selectedOption === option.value
                  ? "bg-primary"
                  : "bg-white hover:bg-[#f8f9fa] text-black"
              }`}
              onClick={() => handleSelectOption(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
};

export default FilterOptions;
