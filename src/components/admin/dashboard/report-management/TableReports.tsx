"use client";

import EmptyData from "@/components/shared/EmptyData";
import { formatDate } from "@/lib/utils";
import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { TbMessageReportFilled } from "react-icons/tb";

interface Report {
  id: string;
  reporter: string;
  title: string;
  description: string;
  movie_name: string;
  created_at: string;
  movie_slug: string;
}

interface TableReportsProps {
  items: Report[];
  offset: number;
}

const TableReports = ({ items, offset }: TableReportsProps) => {
  if (!items || items.length === 0) {
    return (
      <Box className="min-h-96 flex items-center justify-center">
        <EmptyData
          title="Không có báo cáo nào tại đây"
          icon={<TbMessageReportFilled />}
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
                Người báo cáo
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left">Tiêu đề</th>
              <th className="px-4 py-3 whitespace-nowrap text-left">Mô tả</th>
              <th className="px-4 py-3 whitespace-nowrap text-left">Phim</th>
              <th className="px-4 py-3 whitespace-nowrap text-right">
                Thời gian báo cáo
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                className="whitespace-nowrap border-b border-[#ffffff10] last:border-b-0 hover:bg-[#ffffff05] transition"
                key={item.id}
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="font-medium text-white">{index + 1 + offset}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{item.reporter}</td>
                <td className="px-4 py-3 whitespace-nowrap">{item.title}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {item.description}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <Link
                    className="text-blue-500 hover:underline"
                    href={`/thong-tin-phim/${item.movie_slug}`}
                  >
                    {item.movie_name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
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

export default TableReports;
