"use client";

import { formatDate } from "@/lib/utils";
import { Box } from "@chakra-ui/react";
import MarkFeedbackAsSpam from "./MarkFeedbackAsSpam";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { markFeedbackAsSpam } from "@/lib/actions/admin-client.action";
import EmptyData from "@/components/shared/EmptyData";
import { FaCommentAlt } from "react-icons/fa";
import Link from "next/link";
import { toast } from "sonner";

interface TableFeedbacksProps {
  items: FeedbackTable[];
  offset: number;
  triggerRefresh: () => void;
}

const TableFeedbacks = ({
  items,
  offset,
  triggerRefresh,
}: TableFeedbacksProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [markFeedbackAsSpamId, setMarkFeedbackAsSpamId] = useState<
    string | null
  >(null);

  const handleMarkAsSpam = async (feedbackId: string, checked: boolean) => {
    if (!session) {
      toast.info("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại");
      return;
    }

    try {
      setMarkFeedbackAsSpamId(feedbackId);

      const response = await markFeedbackAsSpam({
        feedbackId,
        spam: checked ? "1" : "0",
        adminId: session?.user?.id as string,
        accessToken: session?.user?.accessToken as string,
      });

      if (response?.status) {
        triggerRefresh();
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi! Vui lòng thử lại sau.");
    } finally {
      setMarkFeedbackAsSpamId(null);
    }
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
    <div className="mt-8 border-[#ffffff10] rounded-xl border">
      <div className="w-full overflow-x-auto">
        <table className="w-full table-auto text-sm text-gray-200 bg-transparent">
          <thead className="bg-transparent border-b border-[#ffffff10]">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap text-left">#</th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Đánh dấu spam
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Người gửi
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Người nhận
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Nội dung
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left">Loại</th>
              <th className="px-4 py-3 whitespace-nowrap text-left">Slug</th>
              <th className="px-4 py-3 whitespace-nowrap text-left">👍</th>
              <th className="px-4 py-3 whitespace-nowrap text-left">👎</th>
              <th className="px-4 py-3 whitespace-nowrap text-right">
                Thời gian tạo
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
                <td className="px-4 py-3 whitespace-nowrap">
                  <MarkFeedbackAsSpam
                    loading={markFeedbackAsSpamId === item.id}
                    feedback={item}
                    onMarkAsSpam={handleMarkAsSpam}
                  />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {item.sender_name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {item.receiver_name ?? "Không có"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{item.content}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {item.type === "comment" ? "Bình luận" : "Đánh giá"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <Link
                    className="hover:underline text-blue-400"
                    href={`/thong-tin-phim/${item.movie_slug}?cid=${item.id}`}
                  >
                    {item.movie_slug}
                  </Link>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {item.total_likes}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {item.total_dislikes}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
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

export default TableFeedbacks;
