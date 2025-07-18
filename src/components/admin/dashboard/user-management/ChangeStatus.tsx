"use client";

import { Box, Spinner } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import CheckboxCustom from "@/components/shared/CheckboxCustom";

interface ChangeStatusProps {
  user: User;
  loading: boolean;
  onChangeStatusUser: (userId: string, checked: boolean) => void;
}

const ChangeStatus = ({
  user,
  loading,
  onChangeStatusUser,
}: ChangeStatusProps) => {
  if (loading) {
    return <Spinner size="sm" />;
  }

  return (
    <Tooltip
      content={`${
        user.status === "active" ? "Khóa tài khoản" : "Mở khóa tài khoản"
      }`}
      showArrow
      openDelay={0}
    >
      <Box className="whitespace-nowrap">
        <CheckboxCustom
          checked={user.status === "banned"}
          onChange={(e) => {
            onChangeStatusUser(user.id, e.target.checked);
          }}
          color="primary"
          label={user.status === "active" ? "Đang mở" : "Đang khóa"}
          size="small"
        />
      </Box>
    </Tooltip>
  );
};

export default ChangeStatus;
