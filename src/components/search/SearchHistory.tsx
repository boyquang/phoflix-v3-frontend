"use client";

import EmptyData from "@/components/shared/EmptyData";
import { getUserSearchHistory } from "@/store/asyncThunks/userAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Button, IconButton } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertDialog from "../shared/AlertDialog";
import Link from "next/link";
import { decodeHtmlEntities, formatString } from "@/lib/utils";
import { BiSearchAlt } from "react-icons/bi";
import { BsXLg } from "react-icons/bs";
import { FaClockRotateLeft } from "react-icons/fa6";
import Loading from "@/app/loading";
import useSearch from "@/hooks/useSearch";

const SearchHistory = () => {
  const { items, loading, fetched } = useSelector(
    (state: RootState) => state.user.searchHistory
  );
  const keyword = useSelector(
    (state: RootState) => state.user.searchHistory.keyword
  );
  const {
    handleCreateSearchHistory,
    handleDeleteAllSearchHistory,
    handleDeleteSearchHistory,
  } = useSearch();
  const dispatch: AppDispatch = useDispatch();
  const { data: session } = useSession();
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    if (session && !fetched) {
      dispatch(
        getUserSearchHistory({
          userId: session.user?.id as string,
          accessToken: session.user?.accessToken as string,
        })
      );
    }
  }, [session]);

  if (keyword?.trim() !== "") return null;
  if (loading)
    return (
      <Box className="h-64 flex items-center justify-center">
        <Loading type="bars" height="h-1/2" />
      </Box>
    );

  if (!items || items?.length === 0) {
    return (
      <EmptyData
        icon={<BiSearchAlt />}
        title="Lịch sử tìm kiếm trống"
        description="Tìm kiếm ngay để xem phim bạn yêu thích!"
      />
    );
  }

  return (
    <Box className="mt-6 mb-4">
      <div className="flex items-center justify-between gap-2 px-4">
        <h4 className="text-gray-50 text-sm font-bold inline-block">
          Lịch sử tìm kiếm
        </h4>
        {items?.length >= 2 && (
          <AlertDialog
            title="Xóa tất cả lịch sử tìm kiếm"
            content="Bạn có chắc chắn muốn xóa tất cả lịch sử tìm kiếm?"
            loading={loadingDelete}
            confirmCallback={() =>
              handleDeleteAllSearchHistory(setLoadingDelete)
            }
            trigger={
              <div className="flex justify-center">
                <Button
                  className="text-xs bg-red-500 text-white px-1 h-6 hover:opacity-80"
                  size="xs"
                >
                  Xóa tất cả
                </Button>
              </div>
            }
          />
        )}
      </div>
      <ul className="flex flex-col gap-2 mt-4">
        {items?.map((item, index: number) => (
          <li
            className="flex h-12 justify-between p-4 text-gray-50 lg:text-sm text-xs hover:bg-[#ffffff05] items-center"
            key={index}
          >
            <Link
              onClick={() => handleCreateSearchHistory(item?.keyword)}
              className="flex flex-1 h-12 items-center overflow-hidden"
              href={`/thong-tin-phim/${formatString(item?.keyword)}`}
            >
              <Box className="flex flex-1 gap-2 items-center max-w-[90%]">
                <FaClockRotateLeft />
                <span className="w-full truncate">
                  {decodeHtmlEntities(item?.keyword)}
                </span>
              </Box>
            </Link>
            <IconButton
              onClick={() => handleDeleteSearchHistory(item?.id, setIdDelete)}
              className="flex-shrink-0 bg-transparent hover:text-[#ffd875] text-gray-50"
              aria-label="delete"
              size="xs"
              loading={idDelete === item?.id}
            >
              <BsXLg />
            </IconButton>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default SearchHistory;
