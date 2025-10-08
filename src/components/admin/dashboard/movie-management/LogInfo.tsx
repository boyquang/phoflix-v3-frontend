"use client";

import CollapseElement from "@/components/shared/CollapseElement";
import { socketCrawlMovies } from "@/configs/socket.config";
import { Button } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
// import { FixedSizeList as List } from "react-window";

type LogMessage = {
  message: string;
  timeStamp: string;
};

const LogInfo = () => {
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const refScroll = useRef<HTMLDivElement | null>(null);
  const [isUserScrolling, setIsUserScrolling] = useState<boolean>(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    socketCrawlMovies.on("crawlProgress", (data) => {
      setLogs((prevLogs) => [...prevLogs, data].slice(-50));

      if (!isUserScrolling) {
        scrollTimeout.current = setTimeout(() => {
          refScroll.current?.scrollTo({
            top: refScroll.current.scrollHeight,
            behavior: "smooth",
          });
        }, 100);
      }
    });

    return () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      socketCrawlMovies.off("crawlProgress");
    };
  }, [isUserScrolling]);

  const handleScroll = () => {
    setIsUserScrolling(true);

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    scrollTimeout.current = setTimeout(() => {
      setIsUserScrolling(false);
    }, 200); // 200ms sau khi dừng cuộn
  };

  return (
    <div className="my-12">
      <div className="flex items-center gap-6 text-xl text-white mb-6">
        <h4>Tiến trình cào phim</h4>
        {logs.length > 0 && (
          <Button
            onClick={() => setLogs([])}
            className="bg-red-500 rounded-full hover:opacity-70"
            size="xs"
          >
            Dọn dẹp tiến trình
          </Button>
        )}
      </div>
      {logs?.length > 0 ? (
        <CollapseElement maxHeight={240} positionButton="center">
          <div
            ref={refScroll}
            onScroll={handleScroll}
            className=" border-[#ffffff10] rounded-xl border flex flex-col max-h-[560px] overflow-y-auto"
          >
            {logs?.map((log, index) => (
              <div
                key={index}
                className="flex items-center gap-1 p-4 border-b border-[#ffffff10] hover:bg-[#ffffff10] last:border-0 text-sm"
              >
                <div className="text-green-400">{log.timeStamp}</div>
                {log.message}
              </div>
            ))}
          </div>
        </CollapseElement>
      ) : (
        <p className="text-sm text-gray-400">Chưa có tiến trình nào</p>
      )}
    </div>
  );
};

export default LogInfo;
