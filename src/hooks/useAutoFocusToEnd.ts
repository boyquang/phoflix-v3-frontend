"use client";

import { useEffect } from "react";

interface UseAutoFocusToEndProps {
  ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
}

const useAutoFocusToEnd = ({ ref }: UseAutoFocusToEndProps) => {
  useEffect(() => {
    const el = ref.current;

    if (el) {
      const length = el.value.length;
      el.focus(); // Đặt tiêu điểm vào trường nhập liệu
      el.setSelectionRange(length, length); // Đặt con trỏ ở cuối văn bản
    }
  }, []);
};

export default useAutoFocusToEnd;
