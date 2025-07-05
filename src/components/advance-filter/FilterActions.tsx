"use client";

import Refreshicon from "@/components/icons/RefresIcon";
import { Box } from "@chakra-ui/react";
interface FilterActionsProps {
  handleSearch: () => void;
  handleResetFilter: () => void;
}

const FilterActions = ({
  handleSearch,
  handleResetFilter,
}: FilterActionsProps) => {
  return (
    <Box className="flex gap-4">
      <button
        onClick={() => handleSearch()}
        className="rounded-full text-sm cursor-pointer px-4 h-10 shadow-primary bg-[#ffda7d] text-[#1e2939]"
      >
        Lọc kết quả
      </button>

      <button
        onClick={handleResetFilter}
        className="rounded-full flex items-center justify-center bg-gray-50 cursor-pointer w-10 h-10 text-gray-900 hover:shadow-[0_5px_10px_10px_rgba(255,255,255,.15)]"
      >
        <Refreshicon />
      </button>
    </Box>
  );
};

export default FilterActions;
