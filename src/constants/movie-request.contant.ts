export const status = {
  pending: {
    className: "bg-yellow-500 text-white",
    label: "Đang chờ",
  },
  approved: {
    className: "bg-green-500 text-white",
    label: "Hoàn thành",
  },
  rejected: {
    className: "bg-red-500 text-white",
    label: "Bị hủy",
  },
  all: {
    className: "bg-gray-500 text-white",
    label: "Tất cả",
  },
};

export const tabs = [
  { name: "Tất cả", value: "all" },
  { name: "Đang chờ", value: "pending" },
  { name: "Hoàn thành", value: "approved" },
  { name: "Bị hủy", value: "rejected" },
];

export const statusShowAdminResponse = ["approved", "rejected"];
