"use client";

import { IconButton } from "@chakra-ui/react";
import { LiaSyncSolid } from "react-icons/lia";
import { LuCheck, LuX } from "react-icons/lu";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";

interface IconButtonActionProps {
  action: "create" | "edit" | "delete" | "check" | "cancel" | "async";
  size?: "xs" | "sm" | "md" | "lg";
  loading?: boolean;
  onClick?: () => void;
}

const IconButtonAction = ({
  action,
  size = "xs",
  loading = false,
  onClick,
}: IconButtonActionProps) => {
  const icons = {
    create: <MdAdd />,
    edit: <MdEdit />,
    delete: <MdDelete />,
    check: <LuCheck />,
    cancel: <LuX />,
    async: <LiaSyncSolid />,
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
    async:
      "border border-[#ffffff10] text-white bg-transparent rounded-full hover:border-blue-500 hover:text-blue-500 transition",
  };

  const actionsMapping = {
    create: "Tạo mới",
    edit: "Chỉnh sửa",
    delete: "Xóa",
    check: "Xác nhận",
    cancel: "Hủy bỏ",
    async: "Đồng bộ dữ liệu",
  };

  return (
    <IconButton
      title={actionsMapping[action] ? actionsMapping[action] : "Hành động"}
      className={classNames[action]}
      aria-label={action}
      size={size}
      onClick={onClick ?? undefined}
      loading={loading}
    >
      {icons[action]}
    </IconButton>
  );
};

export default IconButtonAction;
