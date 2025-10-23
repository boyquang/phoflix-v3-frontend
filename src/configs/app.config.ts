import GithubIcon from "@/components/icons/GithubIcon";
import TelegramIcon from "@/components/icons/TelegramIcon";

export type FeatureStatusType =
  (typeof FeatureStatus)[keyof typeof FeatureStatus];

interface AppConfig {
  appName: string;
  feature: {
    watchingTogether: {
      status: FeatureStatusType;
    };
  };
  pages: Record<string, any>;
  chakra: {
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
  footer: {
    links: {
      name: string;
      url: string;
      icon?: React.ElementType;
    }[];
    copyright: string;
    icon?: React.ElementType;
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
  BUILDING: "building",
} as const;

type ErrorFeatureStatus = Extract<
  FeatureStatusType,
  "maintenance" | "inactive" | "building"
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
  building: {
    status: "error",
    message: "Trang này đang được xây dựng!",
  },
};

export const appConfig: AppConfig = {
  appName: "PHOFLIX-V3",
  feature: {
    watchingTogether: {
      status: FeatureStatus.ACTIVE,
    },
  },
  chakra: {
    dialog: {
      motionPresetDefault: "scale",
    },
  },
  pages: {
    "/xem-chung/quan-ly": {
      status: FeatureStatus.ACTIVE,
    },
    "/xem-chung": {
      status: FeatureStatus.ACTIVE,
    },
    "/test": {
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
      status: FeatureStatus.ACTIVE,
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
    "/dashboard/event-management": {
      status: FeatureStatus.ACTIVE,
    },
    "/dashboard/movie-management": {
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
  footer: {
    links: [
      {
        name: "Github",
        url: "https://github.com/phohoccode",
        icon: GithubIcon,
      },
      {
        name: "Telegram",
        url: "https://t.me/phohoccode_04",
        icon: TelegramIcon,
      },
    ],
    copyright: "© 2025 - Phát triển bởi phohoccode",
  },
};
