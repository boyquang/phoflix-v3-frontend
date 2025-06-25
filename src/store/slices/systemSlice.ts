import { createSlice } from "@reduxjs/toolkit";
import { getTopSearchTrending } from "../asyncThunks/systemAsyncThunk";

const initialState: SystemSlice = {
  isShowAuthDialog: false,
  isShowModalSearch: false,
  typeAuth: "signin",
  isOpenDrawer: false,
  windowWidth: 0,
  lastScrollY: 0,
  isVisiable: true,
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
    setIsVisiable: (state, action) => {
      state.isVisiable = action.payload;
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
    setSrcAudioNotification: (state, action) => {
      state.audio.srcAudioNotification = action.payload;
    },
    playAudioNotification: (state, action) => {
      state.audio.playAudioNotification = action.payload;
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
  setIsShowModalSearch,
  setIsVisiable,
  setLastScrollY,
  setIsOpenDrawer,
  setTypeAuth,
  playAudioNotification,
  setSrcAudioNotification,
  showDialogSinInWhenNotLogin,
} = systemSlice.actions;
export default systemSlice.reducer;
