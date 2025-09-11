"use client";

import { socketCrawlMovies } from "@/configs/socket.config";
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

interface RunCrawlMoviesProps {
  action: "create" | "update";
}

const themes = {
  create: {
    textDefault: "Bắt đầu cào",
    textIsCrawling: "Ngừng cào",
    styleDefault:
      "bg-primary linear-gradient text-black border-none disabled:opacity-70",
    styleIsCrawling: "bg-red-500 text-white border-none",
    icon: PiLightningFill,
  },
  update: {
    textDefault: "Cập nhật",
    textIsCrawling: "Ngừng cập nhật",
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

  useEffect(() => {
    socketCrawlMovies.on("notifyCrawlStatus", (isCrawling) => {
      setIsCrawling(isCrawling);
      dispatch(setIsRunning(isCrawling));
    });

    return () => {
      socketCrawlMovies.off("notifyCrawlStatus");
    };
  }, []);

  useEffect(() => {
    const checkCrawlingStatus = async () => {
      const result = await checkIsCrawling();

      setIsCrawling(result.isCrawling);
      dispatch(setActionCrawl(result.action));
      dispatch(setIsRunning(result.isCrawling));
    };

    checkCrawlingStatus();
  }, []);

  const handleCrawl = async () => {
    try {
      // Nếu đang crawl và khác action thì không cho chạy
      if (isCrawling && actionCrawl !== action) return;

      // Chạy khi reload trang và có tiến trình khác đang chạy
      if (isOtherProcessRunning && !isCrawling) return;

      setLoading(true);

      let response = null;

      // Nếu đang crawl và đúng action hiện tại thì dừng
      if (isCrawling && actionCrawl === action) {
        dispatch(setIsRunning(false));
        response = await pauseCrawling();
      } else {
        dispatch(setIsRunning(true));
        response = await crawlMovies(action, 10);
      }

      if (response && response.status) {
        setIsCrawling(response.isCrawling);
        dispatch(setActionCrawl(response.action));
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
      disabled={
        loading ||
        (isCrawling && actionCrawl !== action) ||
        (isOtherProcessRunning && !isCrawling)
      }
      size="sm"
      className={
        isCrawling && actionCrawl === action ? styleIsCrawling : styleDefault
      }
    >
      {icon && <Icon as={icon} />}
      {isCrawling && actionCrawl === action ? textIsCrawling : textDefault}
    </Button>
  );
};

export default RunCrawlMovies;
