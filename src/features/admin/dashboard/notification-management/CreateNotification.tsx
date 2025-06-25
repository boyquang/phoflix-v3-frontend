"use client";

import NotificationDialog from "@/features/user/notification/NotificationDialog";
import { Button } from "@chakra-ui/react";
import { IoAddSharp } from "react-icons/io5";

const CreateNotification = () => {
  return (
    <NotificationDialog
      trigger={
        <Button className="fixed rounded-full bottom-6 right-6 shadow-primary bg-primary text-gray-900">
          <IoAddSharp />
          Tạo thông báo
        </Button>
      }
    />
  );
};

export default CreateNotification;
