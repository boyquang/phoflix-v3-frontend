"use client";

import Loading from "@/app/loading";
import useSearch from "@/hooks/useSearch";
import { decodeHtmlEntities, formatString } from "@/lib/utils";
import { getTopSearchTrending } from "@/store/asyncThunks/systemAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { IoTrendingUp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

type TopSearchTrending = {
  soundex_code: string;
  keyword: string;
  total: number;
};

const TopSearchTrending = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items, loading, fetched } = useSelector(
    (state: RootState) => state.system.topSearchTrending
  );
  const { handleCreateSearchHistory } = useSearch();

  useEffect(() => {
    if (!fetched) {
      dispatch(getTopSearchTrending({ limit: 10 }));
    }
  }, []);

  if (items.length === 0 && !loading) return null;

  return (
    <Box className="px-4">
      <Box className="flex items-center gap-1 text-sm text-primary font-semibold">
        <IoTrendingUp />
        <h4>Xu hướng tìm kiếm</h4>
      </Box>

      {loading ? (
        <Loading type="bars" height="h-32" />
      ) : (
        <ul className="flex gap-2 flex-wrap mt-4">
          {items?.map((item: TopSearchTrending, index: number) => (
            <Link
              onClick={() => handleCreateSearchHistory(item?.keyword)}
              href={`/thong-tin-phim/${formatString(item?.keyword)}`}
              key={index}
            >
              <li className="flex justify-between px-2 py-1 rounded-md text-gray-100 text-xs bg-[#ffffff10] hover:text-[#ffd875] items-center">
                <span>{decodeHtmlEntities(item?.keyword)}</span>
              </li>
            </Link>
          ))}
        </ul>
      )}

      <Box className="w-full h-[0.5px] bg-[#ffffff10] my-6"></Box>
    </Box>
  );
};

export default TopSearchTrending;
