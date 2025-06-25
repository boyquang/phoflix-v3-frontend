type SystemSlice = {
  isShowAuthDialog: boolean;
  isShowModalSearch: boolean;
  typeAuth: "signin" | "signup" | "forgot-password" | "reset-password";
  isOpenDrawer: boolean;
  windowWidth: number;
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
    srcAudioNotification: string|null;
  };
};
