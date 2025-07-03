"use client";

import {
  createUserSearchHistory,
  deleteAllUserSearchHistory,
  deleteUserSearchHistory,
} from "@/store/asyncThunks/userAsyncThunk";
import { setIsShowModalSearch } from "@/store/slices/systemSlice";
import { setKeyWord } from "@/store/slices/userSlice";
import { AppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import useNotification from "./useNotification";

const useSearch = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data: session } = useSession();
  const { notificationAlert } = useNotification();

  const handleCreateSearchHistory = async (keyword: string) => {
    dispatch(setKeyWord(""));
    dispatch(setIsShowModalSearch(false));

    if (session) {
      dispatch(
        createUserSearchHistory({
          userId: session?.user?.id as string,
          keyword,
          accessToken: session?.user?.accessToken as string,
        })
      );
    }
  };

  const handleDeleteSearchHistory = async (
    searchId: string,
    setSearchId: (id: string | null) => void
  ) => {
    if (session) {
      setSearchId(searchId);
      await dispatch(
        deleteUserSearchHistory({
          id: searchId,
          userId: session.user?.id as string,
          accessToken: session.user?.accessToken as string,
        })
      );
      setSearchId(null);
    }
  };

  const handleDeleteAllSearchHistory = async (
    setLoading: (loading: boolean) => void
  ) => {
    if (session) {
      setLoading(true);
      const response = await dispatch(
        deleteAllUserSearchHistory({
          userId: session.user?.id as string,
          accessToken: session.user?.accessToken as string,
        })
      );
      setLoading(false);

      const { status, message } = response.payload;

      notificationAlert({
        title: status ? "Thành công" : "Thất bại",
        description: message,
        type: status ? "success" : "error",
      });
    }
  };

  return {
    handleCreateSearchHistory,
    handleDeleteSearchHistory,
    handleDeleteAllSearchHistory,
  };
};

export default useSearch;
