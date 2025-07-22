"use client";

import { Button } from "@chakra-ui/react";
import { IoAdd } from "react-icons/io5";

interface AddNewButtonProps {
  onClick?: () => void;
  size?: "xs" | "sm" | "md" | "lg";
  rounded?: "full" | "md" | "none";
  label?: string;
}

const AddNewButton = ({
  onClick,
  size = "xs",
  rounded = "full",
  label = "Thêm mới",
}: AddNewButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size={size}
      rounded={rounded}
      className="text-sm font-semibold text-gray-200 bg-transparent border border-gray-400 hover:bg-[#25272f] transition-all"
    >
      <IoAdd />
      {label}
    </Button>
  );
};

export default AddNewButton;
