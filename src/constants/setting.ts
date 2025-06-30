export const TIME_SLEEP = {
  start: 23,
  end: 6,
  // interval: 15 * 1000, // test 15 giây
  interval: 60 * 1000,
};

type WarnUserAction = "dismiss" | "accept" | null;
type WarnUserMode = "sleep-time";

export interface WarnUser {
  repose: {
    status: boolean;
    mode: WarnUserMode;
    title: Record<WarnUserMode, string>;
    message: Record<WarnUserMode, string>;
    action: WarnUserAction;
    showAnimation: boolean;
    openAlert: boolean;
  };
}

export const actions = ["dismiss", "accept"] as const;

export const WARN_USER: WarnUser = {
  repose: {
    status: false,
    mode: "sleep-time",
    title: {
      "sleep-time": "🌙 Đã đến giờ nghỉ ngơi",
    },
    message: {
      "sleep-time": `
        Để đảm bảo sức khỏe và tinh thần luôn ở trạng thái tốt nhất, bạn nên cân nhắc dừng việc xem phim và dành thời gian cho giấc ngủ.
        Nếu bạn vẫn muốn tiếp tục, hãy cố gắng không thức quá khuya để cơ thể được nghỉ ngơi đầy đủ.
        PHOFLIX-V3 sẽ luôn ở đây chờ bạn quay lại.
      `,
    },
    action: null,
    showAnimation: false,
    openAlert: false,
  },
};
