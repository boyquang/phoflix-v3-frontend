"use client";

import { formatDate } from "@/lib/utils";
import EmptyData from "@/components/shared/EmptyData";
import { MdCelebration } from "react-icons/md";
import EventActions from "./EventActions";

interface TableEventsProps {
  items: EventData[];
  offset: number;
}

const TableEvents = ({ items, offset }: TableEventsProps) => {
  if (!items || items.length === 0) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <EmptyData
          title="Không có sự kiện nào tại đây"
          icon={<MdCelebration />}
        />
      </div>
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
                Hành động
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Tên sự kiện
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Ngày diễn ra
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Thể loại sự kiện
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Quốc gia diễn ra
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left">Mô tả</th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Loại ngày
              </th>
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
                  <EventActions item={item} />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{item.name}</td>
                <td className="px-4 py-3 whitespace-nowrap">{item.date}</td>
                <td className="px-4 py-3 whitespace-nowrap">{item.category || "N/A"}</td>
                <td className="px-4 py-3 whitespace-nowrap">{item.country || "N/A"}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {item.description && item.description.length > 100
                    ? `${item.description.slice(0, 100)}...`
                    : item.description}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {item.isLunar ? "Âm lịch" : "Dương lịch"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  {formatDate(item.createdAt as string)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableEvents;
