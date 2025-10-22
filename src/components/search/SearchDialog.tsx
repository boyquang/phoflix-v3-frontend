"use client";

import { InputGroup } from "@/components/ui/input-group";
import { fetchDataMoviePreview } from "@/store/async-thunks/movie.thunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Button, Dialog, Input, Portal } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'nextjs-toploader/app';
import SearchHistory from "./SearchHistory";
import { IoSearch, IoSearchOutline } from "react-icons/io5";
import { setIsShowModalSearch } from "@/store/slices/system.slice";
import VoiceButton from "../shared/VoiceButton";
import { debounce, delay } from "lodash";
import { setKeyWord } from "@/store/slices/user.slice";
import useSearch from "@/hooks/useSearch";
import { appConfig } from "@/configs/app.config";
import TopSearchTrending from "./TopSearchTrending";
import SearchPreview from "./SearchPreview";
import Link from "next/link";
import { toast } from "sonner";

const { dialog } = appConfig.chakra;
const motionPresetDefault = dialog.motionPresetDefault;

export const limitSearchPreview = 5;

const SearchDialog = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { items } = useSelector(
    (state: RootState) => state.movie.searchMoviePreview
  );
  const { isShowModalSearch } = useSelector((state: RootState) => state.system);
  const keyword = useSelector(
    (state: RootState) => state.user.searchHistory.keyword
  );
  const { handleCreateSearchHistory } = useSearch();

  const fetchData = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm.trim()) {
        dispatch(
          fetchDataMoviePreview({
            keyword: searchTerm,
            limit: limitSearchPreview,
          })
        );
      }
    }, 500),
    [dispatch]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setKeyWord(e.target.value));
    fetchData(e.target.value);
  };

  const performSearch = async (keyword: string) => {
    if (!keyword.trim()) {
      toast.info("Bạn muốn tìm gì thế?");
      return;
    }

    router.push(`/tim-kiem?keyword=${keyword.trim().replace(/\s+/g, "+")}`);

    // Gọi hàm để tạo lịch sử tìm kiếm
    handleCreateSearchHistory(keyword);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      performSearch(keyword);
    }
  };

  const handleCallbackVoiceSearch = (voiceKeyword: string) => {
    dispatch(setKeyWord(voiceKeyword));

    // Gọi hàm tìm kiếm với từ khóa giọng nói sau 1 giây
    delay(() => performSearch(voiceKeyword), 1000);
  };

  return (
    <Dialog.Root
      scrollBehavior="inside"
      motionPreset={motionPresetDefault}
      open={isShowModalSearch}
      onOpenChange={({ open }) => dispatch(setIsShowModalSearch(open))}
    >
      <Dialog.Trigger asChild>
        <Button
          aria-label="Tìm kiếm phim"
          className="2xl:min-w-60 lg:min-w-48 text-gray-50 lg:bg-[#ffffff2f] bg-transparent rounded-md"
          size="sm"
        >
          <IoSearch title="Tìm kiếm" />
          <span className="flex-1 text-left ml-1 lg:block hidden">
            Tìm kiếm phim ...
          </span>
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            padding={0}
            className="bg-[#0f111af2] text-gray-50 border border-[#ffffff10] rounded-md backdrop-blur mx-4 lg:max-w-2xl md:max-w-xl sm:max-w-lg max-w-[calc(100%-32px)]"
          >
            <Dialog.Header p={4}>
              <Dialog.Title className="w-full">
                <InputGroup
                  startElement={<IoSearchOutline className="text-white" />}
                  endElement={
                    <VoiceButton
                      callback={(keyword: string) =>
                        handleCallbackVoiceSearch(keyword)
                      }
                      size="xs"
                    />
                  }
                  className="w-full"
                >
                  <Input
                    onKeyDown={(e) => handleKeyDown(e)}
                    value={keyword}
                    maxLength={100}
                    onChange={(e) => handleSearch(e)}
                    css={{
                      "&:focus-visible": {
                        outline: "none",
                      },
                    }}
                    className="font-normal text-gray-50 rounded-md truncate bg-transparent border-2 border-[#ffffff10] focus:border-white/50"
                    placeholder="Tìm kiếm phim..."
                  />
                </InputGroup>
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body p={0}>
              <Box className="mt-4 overflow-hidden">
                <TopSearchTrending />
                <SearchHistory />
                <SearchPreview />
              </Box>
            </Dialog.Body>
            <Dialog.Footer p={0}>
              {items?.length >= limitSearchPreview && keyword.trim() !== "" && (
                <Link
                  href={`/tim-kiem?keyword=${encodeURIComponent(keyword)}`}
                  className="w-full flex items-center gap-2 mt-3"
                >
                  <Button
                    onClick={() => dispatch(setIsShowModalSearch(false))}
                    size="xl"
                    className="xs:text-sm text-xs w-full bg-[#ffffff10] text-white hover:text-primary rounded-t-none"
                  >
                    Xem tất cả
                  </Button>
                </Link>
              )}
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default SearchDialog;
