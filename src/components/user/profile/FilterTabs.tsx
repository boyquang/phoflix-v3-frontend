"use client";

import { avatars } from "@/constants/avatar.contant";
import { setSelectedFilterTabsAvatar } from "@/store/slices/user.slice";
import { AppDispatch, RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const FilterTab = () => {
  const { selectedFilterTabsAvatar } = useSelector(
    (state: RootState) => state.user.avatar
  );
  const dispatch: AppDispatch = useDispatch();

  return (
    <Box className="flex gap-2 items-center flex-wrap">
      {Object.entries(avatars).map(([key, value]) => (
        <Box
          onClick={() => dispatch(setSelectedFilterTabsAvatar(key))}
          key={key}
          className={`px-2 select-none flex items-center justify-center min-h-7 text-xs rounded-md border bg-transparent cursor-pointer hover:text-gray-50 transition-all
            ${
              selectedFilterTabsAvatar === key
                ? "border-gray-50 text-gray-50"
                : "border-transparent text-gray-300"
            }
          `}
        >
          {value.label}
        </Box>
      ))}
    </Box>
  );
};

export default FilterTab;
