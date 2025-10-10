"use client";

import { useEffect } from "react";

/**
 * Hook để xử lý sự kiện click ra ngoài một phần tử
 * @param ref tham chiếu đến phần tử DOM
 * @param handler là hàm xử lý sự kiện click ra ngoài
 */

export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Nếu ref không tồn tại hoặc phần tử được click nằm trong ref thì không làm gì cả
      if (!ref?.current || ref.current.contains(event.target as Node)) return;
      // Nếu click ra ngoài phần tử ref thì gọi hàm handler truyền vào
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
