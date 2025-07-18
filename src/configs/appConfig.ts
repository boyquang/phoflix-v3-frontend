export type FeatureStatusType =
  (typeof FeatureStatus)[keyof typeof FeatureStatus];

interface AppConfig {
  appName: string;
  feature: {
    watchingTogether: {
      status: FeatureStatusType;
    };
    advancedFilter: {
      status: FeatureStatusType;
    };
  };
  pages: Record<string, any>;
  charka: {
    dialog: {
      motionPresetDefault:
        | "scale"
        | "slide-in-bottom"
        | "slide-in-top"
        | "slide-in-left"
        | "slide-in-right"
        | "none"
        | undefined;
    };
  };
}

// Tạo kiểu cho trạng thái của các tính năng
export const FeatureStatus = {
  MAINTENANCE: "maintenance",
  ACTIVE: "active",
  NEW: "new",
  INACTIVE: "inactive",
  DEVELOPING: "developing",
  COMINGSOON: "coming soon",
} as const;

type ErrorFeatureStatus = Extract<
  FeatureStatusType,
  "maintenance" | "inactive"
>;

type ResponseStatusType = Record<
  ErrorFeatureStatus,
  { status: string; message: string }
>;

export const ResponseStatus: ResponseStatusType = {
  maintenance: {
    status: "error",
    message: "Trang này đang bảo trì!",
  },
  inactive: {
    status: "error",
    message: "Trang này không còn hoạt động!",
  },
};

export const appConfig: AppConfig = {
  appName: "PHOFLIX-V3",
  feature: {
    watchingTogether: {
      status: FeatureStatus.NEW,
    },
    advancedFilter: {
      status: FeatureStatus.ACTIVE,
    },
  },
  charka: {
    dialog: {
      motionPresetDefault: "slide-in-bottom",
    },
  },
  pages: {
    "/phong-xem-chung": {
      status: FeatureStatus.ACTIVE,
    },
    "/nguoi-dung/thong-bao": {
      status: FeatureStatus.ACTIVE,
    },
    "/nguoi-dung/ung-ho": {
      status: FeatureStatus.INACTIVE,
    },
    "/nguoi-dung/phong-cua-toi": {
      status: FeatureStatus.INACTIVE,
    },
    "/nguoi-dung/yeu-cau-phim": {
      status: FeatureStatus.NEW,
    },
    "/nguoi-dung/lich-su-xem": {
      status: FeatureStatus.ACTIVE,
    },
    "/nguoi-dung/yeu-thich": {
      status: FeatureStatus.ACTIVE,
    },
    "/nguoi-dung/danh-sach-phat": {
      status: FeatureStatus.ACTIVE,
    },
    "/loc-nang-cao": {
      status: FeatureStatus.ACTIVE,
    },
    "/nguoi-dung/tai-khoan": {
      status: FeatureStatus.ACTIVE,
    },
    "/dien-vien": {
      status: FeatureStatus.ACTIVE,
    },
    "/tim-kiem": {
      status: FeatureStatus.ACTIVE,
    },
    "/thong-tin-phim": {
      status: FeatureStatus.ACTIVE,
    },
    "/dang-xem": {
      status: FeatureStatus.ACTIVE,
    },
    "/chi-tiet": {
      status: FeatureStatus.ACTIVE,
    },
    "/dashboard/feedback-management": {
      status: FeatureStatus.ACTIVE,
    },
    "/dashboard/movie-request-management": {
      status: FeatureStatus.ACTIVE,
    },
    "/dashboard/report-management": {
      status: FeatureStatus.ACTIVE,
    },
    "/dashboard/telegram-bot": {
      status: FeatureStatus.ACTIVE,
    },
    "/dashboard/notification-management": {
      status: FeatureStatus.ACTIVE,
    },
    "/dashboard/user-management": {
      status: FeatureStatus.ACTIVE,
    },
  },
};
