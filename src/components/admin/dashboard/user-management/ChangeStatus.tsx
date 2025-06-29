"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Box, Spinner } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";

interface ChangeStatusProps {
  user: any;
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
      <Box>
        <Checkbox
          colorPalette="whiteAlpha"
          variant="subtle"
          className="flex items-center gap-2 cursor-pointer"
          checked={user.status === "banned"}
          onCheckedChange={(checked) => {
            onChangeStatusUser(user.id, checked.checked === true);
          }}
        >
          {user.status === "active" ? "Đang mở" : "Đang khóa"}
        </Checkbox>
      </Box>
    </Tooltip>
  );
};

export default ChangeStatus;
