"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

interface UseBeforeUnloadProps {
  cbFunc?: () => void;
}

/**
 * useBeforeUnload hook
 * @param param shouldWarn: Kích hoạt cảnh báo khi người dùng cố gắng rời khỏi trang.
 * @param param message: Thông điệp hiển thị trong cảnh báo.
 * @description Hook này thêm một sự kiện 'beforeunload' để cảnh báo người dùng khi họ cố gắng rời khỏi trang.
 */

const useBeforeUnload = ({ cbFunc }: UseBeforeUnloadProps) => {
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    const handleBeforeUnload = () => {
      cbFunc?.();
    };

    return () => {
      handleBeforeUnload();
      prevPathname.current = pathname;
    };
  }, [pathname, cbFunc]);
};

export default useBeforeUnload;
