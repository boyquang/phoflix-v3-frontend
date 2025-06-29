"use client";

import { handleShowToaster } from "@/lib/utils";
import { Box, Table } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  deleteNotification,
  updateNotification,
} from "@/lib/actions/adminActionClient";
import { useSession } from "next-auth/react";
import TableRow from "./TableRow";
import EmptyData from "@/components/shared/EmptyData";
import { IoMdNotifications } from "react-icons/io";

interface Notification {
  id: string;
  sender_name: string;
  content: string;
  href: string;
  image: string;
  created_at: string;
}

interface TableNotificationsProps {
  items: Notification[];
}

const TableNotifications = ({ items }: TableNotificationsProps) => {
  const router = useRouter();
  const { data: sesstion }: any = useSession();
  const [editingField, setEditingField] = useState<{
    id: string;
    key: string;
  } | null>(null);
  const [idDelete, setIdDelete] = useState<string | null>(null);

  const handleUpdateInfo = async (
    data: Record<string, any>,
    keyEdit: string
  ) => {
    if (!sesstion) {
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
      userId: sesstion?.user?.id,
      content: data.content,
      href: data.href,
      image: data.image,
      accessToken: sesstion?.user?.accessToken,
    });

    setEditingField(null);

    if (response?.status) {
      router.refresh();
    }

    handleShowToaster(
      "Thông báo",
      response?.message,
      response?.status ? "success" : "error"
    );
  };

  const handleDeleteNotification = async (id: string) => {
    if (!sesstion) {
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
      userId: sesstion?.user?.id,
      accessToken: sesstion?.user?.accessToken,
    });
    setIdDelete(null);

    if (response?.status) {
      router.refresh();
    }

    handleShowToaster(
      "Thông báo",
      response?.message,
      response?.status ? "success" : "error"
    );
  };

  if (!items || items.length === 0) {
    return (
      <Box className="min-h-96 flex items-center justify-center">
        <EmptyData
          title="Không có thông báo nào tại đây"
          icon={<IoMdNotifications />}
        />
      </Box>
    );
  }

  return (
    <Table.ScrollArea>
      <Table.Root
        stickyHeader
        size="sm"
        interactive
        className="mt-8 text-gray-600 border-[#ffffff10]"
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Hành động</Table.ColumnHeader>
            <Table.ColumnHeader>Người tạo</Table.ColumnHeader>
            <Table.ColumnHeader>Nội dung</Table.ColumnHeader>
            <Table.ColumnHeader>Hình ảnh</Table.ColumnHeader>
            <Table.ColumnHeader>Liên kết chuyển hướng</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">
              Thời gian tạo
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <TableRow
              key={item.id}
              item={item}
              loadingDelete={idDelete === item.id}
              editingField={editingField}
              callbackDelete={handleDeleteNotification}
              callbackUpdate={handleUpdateInfo}
            />
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default TableNotifications;
