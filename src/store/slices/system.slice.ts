import { createSlice } from "@reduxjs/toolkit";
import { getTopSearchTrending } from "../async-thunks/system.thunk";
import { chiristmasDay, chiristmasMonth } from "@/constants/event.contant";
import { WARN_USER } from "@/constants/setting.contant";

const initialState: SystemSlice = {
  isShowAuthDialog: false,
  dataTheme: "Default",
  showSnowEffect: null,
  isShowModalSearch: false,
  typeAuth: "signin",
  isOpenDrawer: false,
  windowWidth: 0,
  lastScrollY: 0,
  isVisiable: true,
  triggerRefresh: false,
  topSearchTrending: {
    items: [],
    loading: false,
    error: false,
    fetched: false,
  },
  audio: {
    playAudioNotification: false,
    srcAudioNotification: null,
  },
  events: {
    chiristmas: {
      day: chiristmasDay,
      month: chiristmasMonth,
      status: false,
    },
  },
  warnUser: WARN_USER,
  reboot: {
    status: false,
  },
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setWidth: (state, action) => {
      state.windowWidth = action.payload;
    },
    setIsShowModalSearch: (state, action) => {
      state.isShowModalSearch = action.payload;
    },
    setIsOpenDrawer: (state, action) => {
      state.isOpenDrawer = action.payload;
    },
    setLastScrollY: (state, action) => {
      state.lastScrollY = action.payload;
    },
    checkEvent: (state, action) => {
      const { eventName, status } = action.payload;

      const event = state.events[eventName];
      event.status = status;
    },
    setIsVisiable: (state, action) => {
      state.isVisiable = action.payload;
    },
    setDataTheme: (state, action) => {
      state.dataTheme = action.payload;
    },
    setShowAnimationReposeUser: (state, action) => {
      state.warnUser.repose.showAnimation = action.payload;
    },
    setIsShowAuthDialog: (state, action) => {
      state.isShowAuthDialog = action.payload;
    },
    setTypeAuth: (state, action) => {
      state.typeAuth = action.payload;
    },
    showDialogSinInWhenNotLogin: (state) => {
      state.isShowAuthDialog = true;
      state.typeAuth = "signin";
    },
    getShowSnowEffect: (state) => {
      const showSnowEffectLocal = JSON.parse(
        localStorage.getItem("showSnowEffect") || "null"
      );
      state.showSnowEffect = showSnowEffectLocal;
    },
    setSrcAudioNotification: (state, action) => {
      state.audio.srcAudioNotification = action.payload;
    },
    playAudioNotification: (state, action) => {
      state.audio.playAudioNotification = action.payload;
    },
    setShowSnowEffect: (state, action) => {
      state.showSnowEffect = action.payload;
      localStorage.setItem("showSnowEffect", JSON.stringify(action.payload));
    },
    setStatusRepose: (state, action) => {
      state.warnUser.repose.status = action.payload;
      localStorage.setItem("sleepReminder", JSON.stringify(action.payload));
    },
    setReboot: (state, action) => {
      state.reboot = action.payload;
    },
    setOpenAlertRepose: (state, action) => {
      state.warnUser.repose.openAlert = action.payload;
    },
    setCustomReposeUser: (state, action) => {
      const { startTime, endTime, customPrompt } = action.payload;

      state.warnUser.repose.startTime = startTime;
      state.warnUser.repose.endTime = endTime;
      state.warnUser.repose.message["sleep-time"] = customPrompt;

      localStorage.setItem("sleepStartTime", JSON.stringify(startTime));
      localStorage.setItem("sleepEndTime", JSON.stringify(endTime));
      localStorage.setItem("sleepCustomPrompt", JSON.stringify(customPrompt));
    },

    setTriggerRefresh: (state) => {
      state.triggerRefresh = !state.triggerRefresh;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getTopSearchTrending.pending, (state) => {
      state.topSearchTrending.loading = true;
      state.topSearchTrending.error = false;
    });

    builder.addCase(getTopSearchTrending.fulfilled, (state, action) => {
      state.topSearchTrending.loading = false;
      state.topSearchTrending.items = action.payload.result.items || [];
      state.topSearchTrending.error = false;
      state.topSearchTrending.fetched = true;
    });

    builder.addCase(getTopSearchTrending.rejected, (state) => {
      state.topSearchTrending.loading = false;
      state.topSearchTrending.error = true;
      state.topSearchTrending.items = [];
    });
  },
});

export const {
  setIsShowAuthDialog,
  setWidth,
  setShowSnowEffect,
  setIsShowModalSearch,
  setIsVisiable,
  setLastScrollY,
  setDataTheme,
  setIsOpenDrawer,
  getShowSnowEffect,
  setTypeAuth,
  checkEvent,
  playAudioNotification,
  setSrcAudioNotification,
  setShowAnimationReposeUser,
  showDialogSinInWhenNotLogin,
  setStatusRepose,
  setCustomReposeUser,
  setOpenAlertRepose,
  setReboot,
  setTriggerRefresh,
} = systemSlice.actions;
export default systemSlice.reducer;
