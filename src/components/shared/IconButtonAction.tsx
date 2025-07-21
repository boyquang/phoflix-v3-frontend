"use client";

import { IconButton } from "@chakra-ui/react";
import { LuCheck, LuX } from "react-icons/lu";
import { MdAdd, MdCancel, MdCheck, MdDelete, MdEdit } from "react-icons/md";

interface IconButtonActionProps {
  action: "create" | "edit" | "delete" | "check" | "cancel";
  size?: "xs" | "sm" | "md" | "lg";
  onClick?: () => void;
}

const IconButtonAction = ({
  action,
  size = "xs",
  onClick,
}: IconButtonActionProps) => {
  const icons = {
    create: <MdAdd />,
    edit: <MdEdit />,
    delete: <MdDelete />,
    check: <LuCheck />,
    cancel: <LuX />,
  };

  const classNames = {
    create:
      "border border-[#ffffff10] text-white bg-transparent rounded-full hover:border-[#ffd875] hover:text-[#ffd875] transition",
    edit: "border border-[#ffffff10] text-white bg-transparent rounded-full hover:border-[#ffd875] hover:text-[#ffd875] transition",
    delete:
      "border border-[#ffffff10] text-white bg-transparent rounded-full hover:border-red-500 hover:text-red-500 transition",
    check:
      "border border-[#ffffff10] text-white bg-transparent rounded-full hover:border-green-500 hover:text-green-500 transition",
    cancel:
      "border border-[#ffffff10] text-white bg-transparent rounded-full hover:border-red-500 hover:text-red-500 transition",
  };

  return (
    <IconButton
      className={classNames[action]}
      aria-label={action}
      size={size}
      onClick={onClick ?? undefined}
    >
      {icons[action]}
    </IconButton>
  );
};

export default IconButtonAction;
