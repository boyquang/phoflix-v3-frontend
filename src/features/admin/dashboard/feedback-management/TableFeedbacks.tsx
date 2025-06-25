"use client";

import { formatDate, handleShowToaster } from "@/lib/utils";
import { Box, Table } from "@chakra-ui/react";
import MarkFeedbackAsSpam from "./MarkFeedbackAsSpam";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { markFeedbackAsSpam } from "@/lib/actions/adminActionClient";
import EmptyData from "@/components/shared/EmptyData";
import { FaCommentAlt } from "react-icons/fa";
import Link from "next/link";

interface Feedback {
  id: string;
  sender_name: string;
  receiver_name: string | null;
  content: string;
  type: "comment" | "preview";
  movie_slug: string;
  total_likes: number;
  total_dislikes: number;
  created_at: string;
}

interface TableFeedbacksProps {
  items: Feedback[];
}

const TableFeedbacks = ({ items }: TableFeedbacksProps) => {
  const router = useRouter();
  const { data: sesstion }: any = useSession();
  const [markFeedbackAsSpamId, setMarkFeedbackAsSpamId] = useState<
    string | null
  >(null);

  const handleMarkAsSpam = async (feedbackId: string, checked: boolean) => {
    if (!sesstion) {
      handleShowToaster(
        "Thông báo",
        "Token không hợp lệ hoặc đã hết hạn",
        "error"
      );
      return;
    }

    const spam = checked ? "1" : "0";

    setMarkFeedbackAsSpamId(feedbackId);

    const response = await markFeedbackAsSpam({
      feedbackId,
      spam,
      adminId: sesstion?.user?.id as string,
      accessToken: sesstion?.user?.accessToken,
    });

    setMarkFeedbackAsSpamId(null);

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
          title="Không có phản hồi nào tại đây"
          icon={<FaCommentAlt />}
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
            <Table.ColumnHeader>Đánh dấu spam</Table.ColumnHeader>
            <Table.ColumnHeader>Người gửi</Table.ColumnHeader>
            <Table.ColumnHeader>Người nhận</Table.ColumnHeader>
            <Table.ColumnHeader>Nội dung</Table.ColumnHeader>
            <Table.ColumnHeader>Loại</Table.ColumnHeader>
            <Table.ColumnHeader>Slug</Table.ColumnHeader>
            <Table.ColumnHeader>Lượt thích</Table.ColumnHeader>
            <Table.ColumnHeader>Lượt không thích</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">
              Thời gian tạo
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row className="cursor-pointer" key={item.id}>
              <Table.Cell>
                <MarkFeedbackAsSpam
                  loading={markFeedbackAsSpamId === item.id}
                  feedback={item}
                  onMarkAsSpam={handleMarkAsSpam}
                />
              </Table.Cell>
              <Table.Cell>{item.sender_name}</Table.Cell>
              <Table.Cell>{item.receiver_name ?? "Không có"}</Table.Cell>
              <Table.Cell>{item.content}</Table.Cell>
              <Table.Cell>
                {item.type === "comment" ? "Bình luận" : "Đánh giá"}
              </Table.Cell>
              <Table.Cell>
                <Link
                  className="hover:underline text-blue-500"
                  href={`/thong-tin-phim/${item?.movie_slug}?cid=${item.id}`}
                >
                  {item.movie_slug}
                </Link>
              </Table.Cell>
              <Table.Cell>{item.total_likes}</Table.Cell>
              <Table.Cell>{item.total_dislikes}</Table.Cell>
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

export default TableFeedbacks;
