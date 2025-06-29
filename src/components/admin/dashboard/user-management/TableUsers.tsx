"use client";

import { formatDate, handleShowToaster } from "@/lib/utils";
import { Avatar, Box, Table } from "@chakra-ui/react";
import ChangeRole from "./ChangeRole";
import { useSession } from "next-auth/react";
import {
  changeRoleUser,
  changeStatusUser,
} from "@/lib/actions/adminActionClient";
import { useRouter } from "next/navigation";
import ChangeStatus from "./ChangeStatus";
import { useState } from "react";
import EmptyData from "@/components/shared/EmptyData";
import { FaUser } from "react-icons/fa6";

interface Users {
  id: string;
  username: string;
  email: string;
  role: "member" | "admin";
  created_at: string;
  avatar: string;
  gender: "male" | "female" | "other";
  status: "active" | "banned";
  type_account: "credentials" | "google";
}

interface TableUsersProps {
  items: Users[];
}

const TableUsers = ({ items }: TableUsersProps) => {
  const { data: sesstion }: any = useSession();
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  const handleChangeRole = async (id: string, role: "member" | "admin") => {
    if (id === sesstion?.user?.id) {
      handleShowToaster(
        "Thông báo",
        "Bạn không thể thay đổi vai trò của chính mình.",
        "error"
      );
      return;
    }

    const response = await changeRoleUser({
      userId: id,
      adminId: sesstion?.user?.id,
      role,
      accessToken: sesstion?.user?.accessToken,
    });

    if (response?.status) {
      router.refresh();
    }

    handleShowToaster(
      "Thông báo",
      response?.message,
      response?.status ? "success" : "error"
    );
  };

  const handleChangeStatus = async (id: string, checked: boolean) => {
    if (id === sesstion?.user?.id) {
      handleShowToaster(
        "Thông báo",
        "Bạn không thể thay đổi trạng thái của chính mình.",
        "error"
      );
      return;
    }

    const status = checked ? "banned" : "active";

    setUserId(id);
    const response = await changeStatusUser({
      userId: id,
      adminId: sesstion?.user?.id,
      status,
      accessToken: sesstion?.user?.accessToken,
    });
    setUserId(null);

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
        <EmptyData title="Không có người dùng nào tại đây" icon={<FaUser />} />
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
            <Table.ColumnHeader>Trạng thái</Table.ColumnHeader>
            <Table.ColumnHeader>Tên người dùng</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Vai trò</Table.ColumnHeader>
            <Table.ColumnHeader>Ảnh đại diện</Table.ColumnHeader>
            <Table.ColumnHeader>Giới tính</Table.ColumnHeader>
            <Table.ColumnHeader>Tình trạng</Table.ColumnHeader>
            <Table.ColumnHeader>Loại tài khoản</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">
              Thời gian tham gia
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>
                <ChangeStatus
                  user={item}
                  loading={userId === item.id}
                  onChangeStatusUser={handleChangeStatus}
                />
              </Table.Cell>
              <Table.Cell>
                {item.username}
                {item.id === sesstion?.user?.id && (
                  <span className="text-green-500 font-semibold"> (Bạn)</span>
                )}
              </Table.Cell>
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>
                <ChangeRole
                  userId={item.id}
                  role={item.role}
                  onChangeRole={handleChangeRole}
                />
              </Table.Cell>
              <Table.Cell>
                <Avatar.Root size="sm">
                  <Avatar.Fallback name={item.username} />
                  <Avatar.Image src={item.avatar} />
                </Avatar.Root>
              </Table.Cell>
              <Table.Cell>
                {item.gender === "female"
                  ? "Nữ"
                  : item.gender === "male"
                  ? "Nam"
                  : "Khác"}
              </Table.Cell>
              <Table.Cell
                className={`${
                  item.status === "banned" ? "text-red-500" : "text-green-500"
                }`}
              >
                {item.status === "active" ? "Đang hoạt động" : "Đã bị khóa"}
              </Table.Cell>
              <Table.Cell>{item.type_account}</Table.Cell>
              <Table.Cell textAlign="end">
                {formatDate(item.created_at)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default TableUsers;
