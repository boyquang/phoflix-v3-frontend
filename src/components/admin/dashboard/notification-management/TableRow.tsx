"use client";

import AlertDialog from "@/components/shared/AlertDialog";
import EditableInfo from "./EditableInfo";
import TableCellImage from "./TableCellImage";
import { formatDate } from "@/lib/utils";

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
  editingField,
  loadingDelete,
  callbackDelete,
  callbackUpdate,
}: TableRowProps) => {
  return (
    <tr className="border-b border-[#ffffff10] last:border-b-0 hover:bg-[#ffffff05] transition">
      <td className="px-4 py-3 whitespace-nowrap">
        <AlertDialog
          title="Xóa thông báo"
          content="Bạn có chắc chắn muốn xóa thông báo này không?"
          loading={loadingDelete}
          confirmCallback={() => callbackDelete(item.id)}
          trigger={
            <button className="text-red-500 text-xs hover:underline cursor-pointer transition">
              Xóa
            </button>
          }
        />
      </td>
      <td className="px-4 py-3 whitespace-nowrap">{item.sender_name}</td>
      <td className="px-4 py-3 whitespace-nowrap">
        <EditableInfo
          loading={
            editingField?.id === item.id && editingField.key === "content"
          }
          keyEdit="content"
          defaultValue={item.content}
          data={item}
          callback={callbackUpdate}
        >
          {item.content}
        </EditableInfo>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        {item.image ? (
          <TableCellImage
            loading={
              editingField?.id === item.id && editingField.key === "image"
            }
            image={item.image}
            data={item}
            callback={callbackUpdate}
          />
        ) : (
          <span>Không có ảnh</span>
        )}
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <EditableInfo
          loading={editingField?.id === item.id && editingField.key === "href"}
          keyEdit="href"
          defaultValue={item.href}
          data={item}
          callback={callbackUpdate}
        >
          {item.href}
        </EditableInfo>
      </td>
      <td className="px-4 py-3 text-right whitespace-nowrap">
        {formatDate(item.created_at)}
      </td>
    </tr>
  );
};

export default TableRow;
