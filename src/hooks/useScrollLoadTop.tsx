"use client";

import { debounce } from "lodash";
import { useEffect } from "react";

interface ScrollLoadTopProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  onLoadMore: () => Promise<void>;
  enabled?: boolean;
  options?: {
    restoreOffset?: number;
    debounceTime?: number;
    behavior?: ScrollBehavior;
  };
}

/**
 *
 * @param containerRef - Là một ref đến phần tử chứa nội dung cần tải thêm.
 * @param onLoadMore - Hàm được gọi khi cần tải thêm dữ liệu.
 * @param enabled - Biến boolean để bật/tắt tính năng tải thêm.
 * @param options - Tùy chọn cấu hình cho hành vi cuộn, bao gồm:
 *   - restoreOffset: Khoảng cách cuộn lại sau khi tải thêm (mặc
 * định là 120px).
 *   - debounceTime: Thời gian trễ để tránh gọi hàm quá nhiều lần
 * (mặc định là 300ms).
 *  - behavior: Hành vi cuộn (mặc định là "instant").
 * @description containerRef phải có overflow-y-auto và chiều cao cố định.
 */

const useScrollLoadTop = ({
  containerRef,
  onLoadMore,
  enabled = true,
  options = {
    restoreOffset: 120,
    debounceTime: 300,
    behavior: "instant",
  },
}: ScrollLoadTopProps) => {
  useEffect(() => {
    const container = containerRef?.current;

    if (!container || !enabled) return;

    const debounceLoadMore = debounce(async () => {
      if (container.scrollTop === 0) {
        await onLoadMore();
        container.scrollTo({
          top: options.restoreOffset,
          behavior: options.behavior,
        });
      }
    }, options.debounceTime);

    container.addEventListener("scroll", debounceLoadMore);

    return () => {
      container.removeEventListener("scroll", debounceLoadMore);
      debounceLoadMore.cancel();
    };
  }, [containerRef, enabled, onLoadMore, options]);
};

export default useScrollLoadTop;
