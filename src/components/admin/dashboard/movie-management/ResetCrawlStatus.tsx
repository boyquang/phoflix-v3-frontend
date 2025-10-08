"use client";

import { resetCrawlStatus } from "@/lib/actions/crawl-movies.action";
import { RootState } from "@/store/store";
import { Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const ResetCrawlStatus = () => {
  const [loading, setLoading] = useState(false);
  const { isOtherProcessRunning } = useSelector(
    (state: RootState) => state.crawlMovies
  );
  const { data: session } = useSession();

  const handleReset = async () => {
    if (!session?.user?.accessToken) {
      toast.error("Bạn chưa đăng nhập!");
    }

    try {
      if (isOtherProcessRunning) return;

      setLoading(true);

      const response = await resetCrawlStatus(
        session?.user?.accessToken as string
      );

      if (response?.status) {
        toast.success(response?.message || "Làm mới thành công!");
      } else {
        toast.error(
          response?.message || "Làm mới thất bại, vui lòng thử lại sau!"
        );
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
      className="bg-white text-black hover:opacity-75 flex-1 lg:h-12 h-10"
      rounded="lg"
    >
      <IoMdRefresh />
      Làm mới
    </Button>
  );
};

export default ResetCrawlStatus;
