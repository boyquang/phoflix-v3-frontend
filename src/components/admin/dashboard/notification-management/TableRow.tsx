"use client";

import { Button, Table } from "@chakra-ui/react";
import EditableInfo from "./EditableInfo";
import TableCellImage from "./TableCellImage";
import { formatDate } from "@/lib/utils";
import AlertDialog from "@/components/shared/AlertDialog";

interface TableRowProps {
  item: NotificationTable;
  editingField: {
    id: string;
    key: string;
  } | null;
  loadingDelete: boolean;
  callbackUpdate: (data: Record<string, any>, keyEdit: string) => void;
  callbackDelete: (id: string) => void;
}

const TableRow = ({
  item,
  loadingDelete,
  editingField,
  callbackDelete,
  callbackUpdate,
}: TableRowProps) => {
  return (
    <Table.Row key={item?.id}>
      <Table.Cell>
        <AlertDialog
          title="Xóa thông báo"
          content="Bạn có chắc chắn muốn xóa thông báo này không?"
          loading={loadingDelete}
          confirmCallback={() => callbackDelete(item?.id)}
          trigger={
            <Button
              size="xs"
              className="text-red-500 hover:text-red-700 bg-transparent"
            >
              Xóa
            </Button>
          }
        />
      </Table.Cell>
      <Table.Cell>{item?.sender_name}</Table.Cell>
      <Table.Cell>
        <EditableInfo
          loading={
            editingField?.id === item?.id && editingField?.key === "content"
          }
          keyEdit="content"
          defaultValue={item?.content}
          data={item}
          callback={callbackUpdate}
        >
          {item?.content}
        </EditableInfo>
      </Table.Cell>
      <Table.Cell>
        {item?.image ? (
          <TableCellImage
            loading={
              editingField?.id === item?.id && editingField?.key === "image"
            }
            image={item?.image}
            data={item}
            callback={callbackUpdate}
          />
        ) : (
          <span>Không có ảnh</span>
        )}
      </Table.Cell>
      <Table.Cell>
        <EditableInfo
          loading={
            editingField?.id === item?.id && editingField?.key === "href"
          }
          keyEdit="href"
          defaultValue={item?.href}
          data={item}
          callback={callbackUpdate}
        >
          {item?.href}
        </EditableInfo>
      </Table.Cell>
      <Table.Cell textAlign="end">{formatDate(item?.created_at)}</Table.Cell>
    </Table.Row>
  );
};

export default TableRow;
