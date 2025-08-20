"use client";

import {
  createUserSearchHistory,
  deleteAllUserSearchHistory,
  deleteUserSearchHistory,
} from "@/store/async-thunks/user.thunk";
import { setIsShowModalSearch } from "@/store/slices/system.slice";
import { setKeyWord } from "@/store/slices/user.slice";
import { AppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useSearch = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data: session } = useSession();

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
    if (!session) return;

    try {
      setLoading(true);
      const response = await dispatch(
        deleteAllUserSearchHistory({
          userId: session.user?.id as string,
          accessToken: session.user?.accessToken as string,
        })
      );

      const { status, message } = response.payload;

      if (status) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleCreateSearchHistory,
    handleDeleteSearchHistory,
    handleDeleteAllSearchHistory,
  };
};

export default useSearch;
