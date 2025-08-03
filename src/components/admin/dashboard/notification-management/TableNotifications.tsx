"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { IoMdNotifications } from "react-icons/io";
import EmptyData from "@/components/shared/EmptyData";
import TableRow from "./TableRow";
import {
  deleteNotification,
  updateNotification,
} from "@/lib/actions/admin-client.action";
import { handleShowToaster } from "@/lib/utils";

interface TableNotificationsProps {
  items: NotificationTable[];
  offset: number;
}

const TableNotifications = ({ items, offset }: TableNotificationsProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [editingField, setEditingField] = useState<{
    id: string;
    key: string;
  } | null>(null);
  const [idDelete, setIdDelete] = useState<string | null>(null);

  const handleUpdateInfo = async (
    data: Record<string, any>,
    keyEdit: string
  ) => {
    if (!session) {
      handleShowToaster(
        "Thông báo",
        "Token không hợp lệ hoặc đã hết hạn",
        "error"
      );
      return;
    }

    setEditingField({ id: data.id, key: keyEdit });

    const response = await updateNotification({
      notificationId: data.id,
      userId: session.user.id as string,
      content: data.content,
      href: data.href,
      image: data.image,
      accessToken: session.user.accessToken as string,
    });

    setEditingField(null);

    if (response?.status) router.refresh();

    handleShowToaster(
      "Thông báo",
      response?.message,
      response?.status ? "success" : "error"
    );
  };

  const handleDeleteNotification = async (id: string) => {
    if (!session) {
      handleShowToaster(
        "Thông báo",
        "Token không hợp lệ hoặc đã hết hạn",
        "error"
      );
      return;
    }

    setIdDelete(id);

    const response = await deleteNotification({
      notificationId: id,
      userId: session.user.id as string,
      accessToken: session.user.accessToken as string,
    });

    setIdDelete(null);

    if (response?.status) router.refresh();

    handleShowToaster(
      "Thông báo",
      response?.message,
      response?.status ? "success" : "error"
    );
  };

  if (!items || items.length === 0) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <EmptyData
          title="Không có thông báo nào tại đây"
          icon={<IoMdNotifications />}
        />
      </div>
    );
  }

  return (
    <div className="mt-8 border border-[#ffffff10] rounded-xl overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full table-auto text-sm text-gray-200 bg-transparent">
          <thead className="bg-transparent border-b border-[#ffffff10]">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap text-left">#</th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Hành động
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Người tạo
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Nội dung
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Hình ảnh
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Liên kết chuyển hướng
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-right">
                Thời gian tạo
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <TableRow
                index={offset + index}
                key={item.id}
                item={item}
                loadingDelete={idDelete === item.id}
                editingField={editingField}
                callbackDelete={handleDeleteNotification}
                callbackUpdate={handleUpdateInfo}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableNotifications;
