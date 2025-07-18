"use client";

import EmptyData from "@/components/shared/EmptyData";
import { status } from "@/constants/movie-request";
import { formatDate } from "@/lib/utils";
import { Box, Table } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SiGoogleforms } from "react-icons/si";
import PopoverMovieRequest from "./PopoverMovieRequest";
import { useState } from "react";
import { movieRequestProcess } from "@/lib/actions/adminActionClient";
import useNotification from "@/hooks/useNotification";

interface TableMovieRequestProps {
  items: MovieRequest[];
  offset: number;
}

export interface MovieRequestProcess {
  movieRequestId: string;
  status: MovieRequestStatus | null;
  adminResponse?: string;
}

const TableMovieRequest = ({ items, offset }: TableMovieRequestProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [movieRequestId, setMovieRequestId] = useState<string | null>(null);
  const { notificationAlert } = useNotification();

  const handleMovieRequestProcess = async ({
    movieRequestId,
    status,
    adminResponse = "",
  }: MovieRequestProcess) => {
    if (!status) {
      notificationAlert({
        title: "Lỗi",
        description: "Vui lòng chọn trạng thái yêu cầu",
        type: "error",
      });
      return false;
    }

    setMovieRequestId(movieRequestId);
    const response = await movieRequestProcess({
      requestId: movieRequestId,
      status,
      adminResponse,
      adminId: session?.user?.id as string,
      accessToken: session?.user?.accessToken as string,
    });
    setMovieRequestId(null);

    const isSuccess = !!response?.status;

    notificationAlert({
      title: isSuccess ? "Thành công" : "Thất bại",
      description: response?.message || "Không có phản hồi từ server",
      type: isSuccess ? "success" : "error",
    });

    if (isSuccess) router.refresh();

    return isSuccess;
  };

  if (!items || items.length === 0) {
    return (
      <Box className="min-h-96 flex items-center justify-center">
        <EmptyData
          title="Không có yêu cầu phim nào tại đây"
          icon={<SiGoogleforms />}
        />
      </Box>
    );
  }

  return (
    <div className="mt-8 border border-[#ffffff10] rounded-xl">
      <div className="w-full overflow-x-auto">
        <table className="w-full table-auto text-sm text-gray-200 bg-transparent">
          <thead className="bg-transparent border-b border-[#ffffff10]">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap text-left">#</th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Tên phim
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Năm phát hành
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Quốc gia
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Thể loại
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Người yêu cầu
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Trạng thái
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Ngày tạo
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-right">
                Hành động
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
                  <span className="font-medium text-white">{index + 1 + offset}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {item.movie_name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {item.release_year || "Chưa xác định"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {item.country || "Chưa xác định"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {item.genre || "Chưa xác định"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{item.username}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center justify-center rounded-full lg:h-5 h-4 lg:text-sm text-xs px-2 ${
                      status[item.status]?.className || "bg-gray-500 text-white"
                    }`}
                  >
                    {status[item.status]?.label || "Không xác định"}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {formatDate(item.created_at)}
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <PopoverMovieRequest
                    movieRequest={item}
                    loading={movieRequestId === item.id}
                    onClickSubmit={handleMovieRequestProcess}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableMovieRequest;
