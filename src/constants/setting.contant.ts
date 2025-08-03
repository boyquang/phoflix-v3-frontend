export const TIME_SLEEP = {
  start: "23:00",
  end: "06:00",
  interval: 15 * 60 * 1000, // 15 phút
};

type WarnUserAction = "dismiss" | "accept" | null;
type WarnUserMode = "sleep-time";

export interface WarnUser {
  repose: {
    status: boolean;
    mode: WarnUserMode;
    title: Record<WarnUserMode, string>;
    action: WarnUserAction;
    showAnimation: boolean;
    openAlert: boolean;
    message: Record<WarnUserMode, string>;
    startTime: string;
    endTime: string;
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
    startTime: TIME_SLEEP.start, // Thời gian bắt đầu nghỉ ngơi
    endTime: TIME_SLEEP.end, // Thời gian kết thúc nghỉ ngơi
  },
};
