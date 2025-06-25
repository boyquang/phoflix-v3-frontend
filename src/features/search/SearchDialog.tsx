"use client";

import SearchIcon from "@/components/icons/SearchIcon";
import { InputGroup } from "@/components/ui/input-group";
import { fetchDataMoviePreview } from "@/store/asyncThunks/movieAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Button, Dialog, Input, Portal } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import SearchHistory from "./SearchHistory";
import { IoSearch } from "react-icons/io5";
import { setIsShowModalSearch } from "@/store/slices/systemSlice";
import { handleShowToaster } from "@/lib/utils";
import VoiceButton from "../../components/shared/VoiceButton";
import { debounce, delay } from "lodash";
import { setKeyWord } from "@/store/slices/userSlice";
import useSearch from "@/hooks/useSearch";
import { appConfig } from "@/configs/appConfig";
import TopSearchTrending from "./TopSearchTrending";
import SearchPreview from "./SearchPreview";

const { dialog } = appConfig.charka;
const motionPresetDefault = dialog.motionPresetDefault;

const SearchDialog = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { isShowModalSearch } = useSelector((state: RootState) => state.system);
  const keyword = useSelector(
    (state: RootState) => state.user.searchHistory.keyword
  );
  const { handleCreateSearchHistory } = useSearch();

  const fetchData = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm.trim()) {
        dispatch(fetchDataMoviePreview({ keyword: searchTerm, limit: 10 }));
      }
    }, 500),
    [dispatch]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setKeyWord(e.target.value));
    fetchData(e.target.value);
  };

  const performSearch = async (keyword: string) => {
    if (keyword.trim() === "") {
      handleShowToaster("Thông báo", "Bạn muốn tìm gì thế?");
      return;
    }

    router.push(`/tim-kiem?keyword=${keyword.replace(/\s+/g, "+")}`);

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
          <IoSearch />
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
            className="bg-[#0f111af2] text-gray-50 border border-[#ffffff10] rounded-xl backdrop-blur mx-4 lg:max-w-[560px] md:max-w-[520px] sm:max-w-[420px] max-w-[calc(100%-32px)]"
          >
            <Dialog.Header p={4}>
              <Dialog.Title>
                <InputGroup
                  startElement={<SearchIcon />}
                  endElement={
                    <VoiceButton
                      callback={(keyword: string) =>
                        handleCallbackVoiceSearch(keyword)
                      }
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
                    className="font-normal text-gray-50 rounded-lg truncate bg-transparent border border-[#ffffff10] focus:border-gray-500"
                    placeholder="Nhập tên phim cần tìm..."
                  />
                </InputGroup>
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body p={0}>
              <Box className="mt-4">
                <TopSearchTrending />
                <SearchHistory />
                <SearchPreview />
              </Box>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default SearchDialog;
