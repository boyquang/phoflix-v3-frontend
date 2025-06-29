"use client";

import { Button } from "@chakra-ui/react";
import { SiGoogleforms } from "react-icons/si";

const CreateMovieRequest = () => {
  return (
    <Button
      size="xs"
      rounded="full"
      className="xs:text-xs text-[10px] text-gray-200 bg-transparent border border-gray-400 hover:bg-[#25272f] transition-all"
    >
      <SiGoogleforms />
      Tạo yêu cầu mới
    </Button>
  );
};

export default CreateMovieRequest;
