export const adminPaths = [
  "/dashboard/notification-management",
  "/dashboard/user-management",
  "/dashboard/feedback-management",
  "/dashboard/report-management",
  "/dashboard/movie-request-management",
  "/dashboard/telegram-bot",
  "/dashboard/event-management",
];

export const userPaths = [
  "/dien-vien",
  "/phong-xem-chung",
  "/tim-kiem",
  "/thong-tin-phim",
  "/nguoi-dung/thong-bao",
  "/chi-tiet",
  "/dang-xem",
];

export const protectedPaths = [
  "/nguoi-dung/tai-khoan",
  "/nguoi-dung/lich-su-xem",
  "/nguoi-dung/yeu-thich",
  "/nguoi-dung/danh-sach-phat",
  "/nguoi-dung/ung-ho",
  "/nguoi-dung/yeu-cau-phim",
  "/nguoi-dung/phong-cua-toi",
  "/phong-xem-chung",
  ...adminPaths,
];
