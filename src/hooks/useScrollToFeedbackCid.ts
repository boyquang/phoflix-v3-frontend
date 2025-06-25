"use client";

import { scrollToElement } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface UseScrollToFeedbackCid {
  id: string | null;
}

const useScrollToFeedbackCid = ({ id }: UseScrollToFeedbackCid) => {
  const [cid, setCid] = useState<string | null>(null);
  const params = useSearchParams();
  const feedbackId = params.get("cid");

  useEffect(() => {
    const cid = params.get("cid");
    if (cid) {
      setCid(cid || null);
    }
  }, [params.get("cid")]);

  // Dùng để cuộn đến feedback được đánh dấu
  useEffect(() => {
    if (cid && feedbackId === cid) {
      scrollToElement({
        name: feedbackId,
        type: "id",
      });
    }
  }, [cid]);

  return { cid };
};

export default useScrollToFeedbackCid;
