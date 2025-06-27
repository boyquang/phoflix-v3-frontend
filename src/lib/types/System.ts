type Event_ = {
  day: number;
  month: number;
  status: boolean;
}

type Events = Record<string, Event_>;

type SystemSlice = {
  isShowAuthDialog: boolean;
  isShowModalSearch: boolean;
  typeAuth: "signin" | "signup" | "forgot-password" | "reset-password";
  isOpenDrawer: boolean;
  windowWidth: number;
  showSnowEffect: boolean|null;
  lastScrollY: number;
  isVisiable: boolean;
  topSearchTrending: {
    items: any[];
    loading: boolean;
    error: boolean;
    fetched: boolean;
  };
  audio: {
    playAudioNotification: boolean;
    srcAudioNotification: string | null;
  };
  events: Events;
};
