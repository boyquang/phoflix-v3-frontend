"use client";

import { Box, Spinner } from "@chakra-ui/react";
import { IoIosArrowDown } from "react-icons/io";
interface SeeMoreFeedbackProps {
  callback: () => void;
  loading: boolean;
}

const SeeMoreFeedback = ({ callback, loading }: SeeMoreFeedbackProps) => {
  return (
    <Box
      onClick={callback}
      className="py-4 text-sm text-primary cursor-pointer inline-flex items-center gap-2"
    >
      <Box className="flex gap-1 text-xs items-center">
        <span>{loading ? "Đang tải thêm" : "Xem thêm"}</span>
        {loading ? <Spinner size="sm" /> : <IoIosArrowDown />}
      </Box>
    </Box>
  );
};

export default SeeMoreFeedback;
