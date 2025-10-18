"use client";

import { socketV2 } from "@/configs/socket.config";
import {
  checkIsCrawling,
  crawlMovies,
  pauseCrawling,
} from "@/lib/actions/crawl-movies.action";
import {
  setActionCrawl,
  setIsRunning,
} from "@/store/slices/crawl-movies.slice";
import { AppDispatch, RootState } from "@/store/store";
import { Button, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RxUpdate } from "react-icons/rx";
import { PiLightningFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface RunCrawlMoviesProps {
  action: "create" | "update";
}

const themes = {
  create: {
    textDefault: "Bắt đầu",
    textIsCrawling: "Ngừng lại",
    styleDefault:
      "bg-primary linear-gradient text-black border-none disabled:opacity-70",
    styleIsCrawling: "bg-red-500 text-white border-none",
    icon: PiLightningFill,
  },
  update: {
    textDefault: "Cập nhật",
    textIsCrawling: "Ngừng lại",
    styleDefault: "bg-sky-500 text-white disabled:opacity-70",
    styleIsCrawling: "bg-red-500 text-white border-none",
    icon: RxUpdate,
  },
};

const RunCrawlMovies = ({ action }: RunCrawlMoviesProps) => {
  const { textDefault, textIsCrawling, styleDefault, styleIsCrawling, icon } =
    themes[action];
  const [isCrawling, setIsCrawling] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { isOtherProcessRunning, actionCrawl } = useSelector(
    (state: RootState) => state.crawlMovies
  );
  const { data: session, status } = useSession();

  useEffect(() => {
    socketV2.on("notifyCrawlStatus", (isCrawling) => {
      setIsCrawling(isCrawling);
      dispatch(setIsRunning(isCrawling));
    });

    return () => {
      socketV2.off("notifyCrawlStatus");
    };
  }, []);

  useEffect(() => {
    if (status !== "authenticated") return;

    const checkCrawlingStatus = async () => {
      const result = await checkIsCrawling(session.user.accessToken as string);

      setIsCrawling(result.isCrawling);
      dispatch(setActionCrawl(result.action));
      dispatch(setIsRunning(result.isCrawling));
    };

    checkCrawlingStatus();
  }, [status]);

  const handleCrawl = async () => {
    if (!session?.user?.accessToken) {
      toast.error("Bạn chưa đăng nhập!");
      return;
    }

    // Nếu đang crawl và khác action thì không cho chạy
    if (isCrawling && actionCrawl !== action) return;

    // Chạy khi reload trang và có tiến trình khác đang chạy
    if (isOtherProcessRunning && !isCrawling) return;

    try {
      setLoading(true);

      let response = null;

      // Nếu đang crawl và đúng action hiện tại thì dừng
      if (isCrawling && actionCrawl === action) {
        dispatch(setIsRunning(false));
        response = await pauseCrawling(session?.user?.accessToken as string);
      } else {
        dispatch(setIsRunning(true));
        response = await crawlMovies({
          action,
          accessToken: session?.user?.accessToken as string,
        });
      }

      if (response && response.status) {
        setIsCrawling(response.isCrawling);
        dispatch(setActionCrawl(response.action));
      } else {
        setIsCrawling(false);
        dispatch(setIsRunning(false));
        toast.error(response?.message || "Đã có lỗi xảy ra, vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Error in handleCrawl:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCrawl}
      loading={loading}
      rounded="lg"
      disabled={
        loading ||
        (isCrawling && actionCrawl !== action) ||
        (isOtherProcessRunning && !isCrawling)
      }
      className={` ${
        isCrawling && actionCrawl === action ? styleIsCrawling : styleDefault
      } hover:opacity-75 flex-1 lg:h-12 h-10`}
    >
      {icon && <Icon as={icon} />}
      {isCrawling && actionCrawl === action ? textIsCrawling : textDefault}
    </Button>
  );
};

export default RunCrawlMovies;
