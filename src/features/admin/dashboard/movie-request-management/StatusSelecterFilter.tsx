"use client";

import { useRouter } from "next/navigation";

interface StatusSelectorFilterProps {
  status: "all" | "pending" | "approved" | "rejected";
}

const statusOptions = [
  { value: "all", label: "Tất cả" },
  { value: "pending", label: "Đang chờ" },
  { value: "approved", label: "Đã duyệt" },
  { value: "rejected", label: "Đã từ chối" },
];

const StatusSelectorFilter = ({ status }: StatusSelectorFilterProps) => {
  const router = useRouter();

  const handleChangeStatus = (newStatus: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set("status", newStatus.toString());
    router.replace(`?${searchParams.toString()}`);
  };

  return (
    <select
      value={status}
      className="border w-full lg:max-w-32 lg:text-sm text-xs max-w-28 h-8 px-3 border-[#ffffff10] text-while rounded-sm focus:border-gray-50"
      onChange={(e) => handleChangeStatus(e.target.value)}
    >
      {statusOptions.map((option) => (
        <option key={option.value} value={option.value} className="text-black">
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default StatusSelectorFilter;
