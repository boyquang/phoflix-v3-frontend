"use client";

import AlertDialog from "@/components/shared/AlertDialog";
import EventDialog from "./EventDialog";
import { useState } from "react";
import { deleteEvent } from "@/lib/actions/event.action";
import { useRouter } from "next/navigation";
import IconButtonAction from "@/components/shared/IconButtonAction";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface EventActionsProps {
  item: EventData;
}

const EventActions = ({ item }: EventActionsProps) => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleDelete = async () => {
    if (!item.id) return;

    try {
      setLoadingDelete(true);
      const response = await deleteEvent(
        item.id,
        session?.user?.accessToken as string
      );

      if (response?.status) {
        router.refresh();
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    } finally {
      setLoadingDelete(false);
    }
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
