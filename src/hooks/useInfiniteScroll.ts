"use client";

import { debounce } from "lodash";
import { useEffect, useRef } from "react";

interface InfiniteScrollProps {
  onLoadMore: () => Promise<void>;
  enabled: boolean;
  threshold?: number;
  rootMargin?: string;
}

const useInfiniteScroll = ({
  onLoadMore,
  enabled = true,
  threshold = 0.1,
  rootMargin = "0px",
}: InfiniteScrollProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const debounceLoadMore = debounce(onLoadMore, 300);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        console.log("IntersectionObserver entry:", entry);

        if (entry.isIntersecting) {
          console.log("Loading more items...");

          debounceLoadMore();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
      debounceLoadMore.cancel();
    };
  }, [enabled, threshold, rootMargin]);

  return {
    targetRef,
  };
};

export default useInfiniteScroll;
