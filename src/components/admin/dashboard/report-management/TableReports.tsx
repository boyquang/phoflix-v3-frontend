"use client";

import EmptyData from "@/components/shared/EmptyData";
import { formatDate } from "@/lib/utils";
import { Box, Table } from "@chakra-ui/react";
import { TbMessageReportFilled } from "react-icons/tb";

interface Report {
  id: string;
  reporter: string;
  title: string;
  description: string;
  movie_name: string;
  created_at: string;
}

interface TableReportsProps {
  items: Report[];
}

const TableReports = ({ items }: TableReportsProps) => {
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
    <Table.ScrollArea>
      <Table.Root
        stickyHeader
        size="sm"
        interactive
        className="mt-8 text-gray-600 border-[#ffffff10]"
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Người báo cáo</Table.ColumnHeader>
            <Table.ColumnHeader>Tiêu đề</Table.ColumnHeader>
            <Table.ColumnHeader>Mô tả</Table.ColumnHeader>
            <Table.ColumnHeader>Phim</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">
              Thời gian báo cáo
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.reporter}</Table.Cell>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>{item.movie_name}</Table.Cell>
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

export default TableReports;
