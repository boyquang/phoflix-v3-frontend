"use client";

import { AppDispatch, RootState } from "@/store/store";
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import EmptyData from "../shared/EmptyData";
import { setIsShowModalSearch } from "@/store/slices/system.slice";
import SearchPreviewItem from "./SearchPreviewItem";
import { LuSearchX } from "react-icons/lu";
import Loading from "@/app/loading";
import useSearch from "@/hooks/useSearch";
import { limitSearchPreview } from "./SearchDialog";

const SearchPreview = () => {
  const { items, loading } = useSelector(
    (state: RootState) => state.movie.searchMoviePreview
  );
  const keyword = useSelector(
    (state: RootState) => state.user.searchHistory.keyword
  );
  const { handleCreateSearchHistory } = useSearch();
  const dispatch: AppDispatch = useDispatch();

  if (keyword?.trim() === "") return null;
  if (loading)
    return (
      <Box className="h-64 flex items-center justify-center">
        <Loading type="bars" height="h-1/2" />
      </Box>
    );
  if (items?.length === 0 && !loading)
    return (
      <EmptyData
        icon={<LuSearchX />}
        title="Không tìm thấy phim phù hợp"
        description="Hãy thử lại với từ khóa khác"
      />
    );

  return (
    <Box className="flex flex-col gap-4">
      <ul className="flex flex-col gap-2">
        {items?.map((item, index: number) => (
          <SearchPreviewItem
            key={index}
            item={item}
            callback={(keyword) => handleCreateSearchHistory(keyword)}
          />
        ))}
      </ul>

      {items?.length >= limitSearchPreview && (
        <Link
          href={`/tim-kiem?keyword=${encodeURIComponent(keyword)}`}
          className="w-full flex items-center gap-2 mt-3"
        >
          <Button
            onClick={() => dispatch(setIsShowModalSearch(false))}
            size="xl"
            className="xs:text-sm text-xs w-full bg-[#ffffff10] text-white hover:text-[#ffd875] rounded-b-xl rounded-t-none"
          >
            Toàn bộ kết quả
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default SearchPreview;
