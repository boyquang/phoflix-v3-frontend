"use client";

import AlertDialog from "@/components/shared/AlertDialog";
import { IconButton } from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";
import EventDialog from "./EventDialog";
import { useState } from "react";
import { deleteEvent } from "@/lib/actions/eventAction";
import { useRouter } from "next/navigation";
import useNotification from "@/hooks/useNotification";
import IconButtonAction from "@/components/shared/IconButtonAction";

interface EventActionsProps {
  item: EventData;
}

const EventActions = ({ item }: EventActionsProps) => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const router = useRouter();
  const { notificationAlert } = useNotification();

  const handleDelete = async () => {
    if (!item.id) return;

    setLoadingDelete(true);
    const response = await deleteEvent(item.id);
    setLoadingDelete(false);

    if (response?.status) router.refresh();

    notificationAlert({
      title: response?.status ? "Thành công" : "Lỗi",
      description: response?.message || "Đã xảy ra lỗi, vui lòng thử lại.",
      type: response?.status ? "success" : "error",
    });
  };

  return (
    <div className="flex items-center gap-4">
      <AlertDialog
        title="Xóa sự kiện"
        content="Bạn có chắc chắn muốn xóa sự kiện này không?"
        loading={loadingDelete}
        confirmCallback={() => handleDelete()}
        trigger={<IconButtonAction action="delete" />}
      />
      <EventDialog
        action="update"
        data={item}
        trigger={<IconButtonAction action="edit" />}
      />
    </div>
  );
};

export default EventActions;
