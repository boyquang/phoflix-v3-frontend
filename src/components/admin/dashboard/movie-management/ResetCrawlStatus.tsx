"use client";

import { resetCrawlStatus } from "@/lib/actions/crawl-movies.action";
import { RootState } from "@/store/store";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const ResetCrawlStatus = () => {
  const [loading, setLoading] = useState(false);
  const { isOtherProcessRunning } = useSelector(
    (state: RootState) => state.crawlMovies
  );

  const handleReset = async () => {
    try {
      if (isOtherProcessRunning) return;

      setLoading(true);

      const response = await resetCrawlStatus();

      if (response && response.status) {
        toast.success(response?.message || "Làm mới thành công!");
      }
    } catch (error) {
      console.error("Error resetting crawl status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleReset}
      loading={loading}
      disabled={loading || isOtherProcessRunning}
      className="bg-white text-black"
      size="sm"
    >
      <IoMdRefresh />
      Làm mới
    </Button>
  );
};

export default ResetCrawlStatus;
