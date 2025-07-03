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
}

export interface MovieRequestProcess {
  movieRequestId: string;
  status: MovieRequestStatus | null;
  adminResponse?: string;
}

const TableMovieRequest = ({ items }: TableMovieRequestProps) => {
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
    <Table.ScrollArea>
      <Table.Root
        stickyHeader
        size="sm"
        interactive
        className="mt-8 text-gray-600 border-[#ffffff10]"
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Tên phim</Table.ColumnHeader>
            <Table.ColumnHeader>Năm phát hành</Table.ColumnHeader>
            <Table.ColumnHeader>Quốc gia</Table.ColumnHeader>
            <Table.ColumnHeader>Thể loại</Table.ColumnHeader>
            <Table.ColumnHeader>Người yêu cầu</Table.ColumnHeader>
            <Table.ColumnHeader>Trạng thái</Table.ColumnHeader>
            <Table.ColumnHeader>Ngày tạo</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Hành động</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.movie_name}</Table.Cell>
              <Table.Cell>
                {item.release_year ? item.release_year : "Chưa xác định"}
              </Table.Cell>
              <Table.Cell>
                {item.country ? item.country : "Chưa xác định"}
              </Table.Cell>
              <Table.Cell>
                {item.genre ? item.genre : "Chưa xác định"}
              </Table.Cell>
              <Table.Cell>{item.username}</Table.Cell>

              <Table.Cell>
                <Box
                  className={`inline-flex items-center justify-center rounded-full lg:h-5 h-4 lg:text-sm text-xs px-2 ${
                    status[item.status]?.className || "bg-gray-500 text-white"
                  }`}
                >
                  {status[item.status]?.label || "Không xác định"}
                </Box>
              </Table.Cell>
              <Table.Cell>{formatDate(item.created_at)}</Table.Cell>
              <Table.Cell textAlign="end">
                <PopoverMovieRequest
                  movieRequest={item}
                  loading={movieRequestId === item.id}
                  onClickSubmit={handleMovieRequestProcess}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default TableMovieRequest;
