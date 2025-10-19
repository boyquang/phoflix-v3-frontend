"use client";

import { setIsShowAuthDialog } from "@/store/slices/system.slice";
import { AppDispatch } from "@/store/store";
import { Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

interface UnauthenticatedProps {
  title?: string;
}

const Unauthenticated = ({ title }: UnauthenticatedProps) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-6">
      <p className="text-white text-lg">
        {title || "Vui lòng đăng nhập để tiếp tục."}
      </p>
      <Button
        onClick={() => dispatch(setIsShowAuthDialog(true))}
        size="xl"
        className="rounded-full bg-primary linear-gradient text-gray-900 shadow-primary"
      >
        Đăng nhập
      </Button>
    </div>
  );
};

export default Unauthenticated;
