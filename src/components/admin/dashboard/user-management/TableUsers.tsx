"use client";

import { formatDate } from "@/lib/utils";
import { Avatar, Box } from "@chakra-ui/react";
import ChangeRole from "./ChangeRole";
import { useSession } from "next-auth/react";
import {
  changeRoleUser,
  changeStatusUser,
} from "@/lib/actions/admin-client.action";
import { useRouter } from "next/navigation";
import ChangeStatus from "./ChangeStatus";
import { useState } from "react";
import EmptyData from "@/components/shared/EmptyData";
import { FaUser } from "react-icons/fa6";
import { toast } from "sonner";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { setTriggerRefresh } from "@/store/slices/system.slice";

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
  offset: number;
}

const TableUsers = ({ items, offset }: TableUsersProps) => {
  const { data: session } = useSession();
  const [userId, setUserId] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();

  const handleChangeRole = async (id: string, role: "member" | "admin") => {
    if (id === session?.user?.id) {
      toast.info("Bạn không thể thay đổi vai trò của chính mình.");
      return;
    }

    try {
      const response = await changeRoleUser({
        userId: id,
        adminId: session?.user?.id as string,
        role,
        accessToken: session?.user?.accessToken as string,
      });

      if (response?.status) {
        dispatch(setTriggerRefresh());
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi! Vui lòng thử lại sau.");
    } finally {
    }
  };

  const handleChangeStatus = async (id: string, checked: boolean) => {
    if (id === session?.user?.id) {
      toast.info("Bạn không thể thay đổi trạng thái của chính mình.");
      return;
    }

    try {
      setUserId(id);
      const response = await changeStatusUser({
        userId: id,
        adminId: session?.user?.id as string,
        status: checked ? "banned" : "active",
        accessToken: session?.user?.accessToken as string,
      });

      if (response?.status) {
        dispatch(setTriggerRefresh());
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi! Vui lòng thử lại sau.");
    } finally {
      setUserId(null);
    }
  };

  if (!items || items.length === 0) {
    return (
      <Box className="min-h-96 flex items-center justify-center">
        <EmptyData title="Không có người dùng nào tại đây" icon={<FaUser />} />
      </Box>
    );
  }

  return (
    <div className="mt-8 border-[#ffffff10] rounded-xl border">
      <div className="w-full overflow-x-auto">
        <table className="w-full table-auto text-sm text-gray-200 bg-transparent">
          <thead className="bg-transparent border-b border-[#ffffff10]">
            <tr>
              <th className="px-4 py-3 text-left whitespace-nowrap">#</th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                Trạng thái
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                Tên người dùng
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">Email</th>
              <th className="px-4 py-3 text-left whitespace-nowrap">Vai trò</th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                Ảnh đại diện
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                Giới tính
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                Tình trạng
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                Loại tài khoản
              </th>
              <th className="px-4 py-3 text-right whitespace-nowrap">
                Thời gian tham gia
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-[#ffffff10] last:border-b-0 hover:bg-[#ffffff05] transition"
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="font-medium text-white">
                    {index + 1 + offset}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-normal">
                  <ChangeStatus
                    user={item}
                    loading={userId === item.id}
                    onChangeStatusUser={handleChangeStatus}
                  />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="font-medium text-white">
                    {item.username}
                  </span>
                  {item.id === session?.user?.id && (
                    <span className="text-green-500 font-semibold"> (Bạn)</span>
                  )}
                </td>
                <td className="px-4 py-3 text-white whitespace-nowrap">
                  {item.email}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <ChangeRole
                    userId={item.id}
                    role={item.role}
                    onChangeRole={handleChangeRole}
                  />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <Avatar.Root size="sm">
                    <Avatar.Fallback name={item.username} />
                    <Avatar.Image src={item.avatar} />
                  </Avatar.Root>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {item.gender === "female"
                    ? "Nữ"
                    : item.gender === "male"
                    ? "Nam"
                    : "Khác"}
                </td>
                <td
                  className={`px-4 py-3 font-medium whitespace-nowrap ${
                    item.status === "banned" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {item.status === "active" ? "Đang hoạt động" : "Đã bị khóa"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {item.type_account}
                </td>
                <td className="px-4 py-3 text-right text-white whitespace-nowrap">
                  {formatDate(item.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableUsers;
