"use client";

import { useEffect, useState } from "react";
import RunCrawlMovies from "./RunCrawlMovies";
import { fetchMovieStats } from "@/lib/actions/crawl-movies.action";
import { socketCrawlMovies } from "@/configs/socket.config";
import { IoIosStats } from "react-icons/io";
import { BsCupHotFill } from "react-icons/bs";
import { toast } from "sonner";
import ResetCrawlStatus from "./ResetCrawlStatus";
import { useSession } from "next-auth/react";
import { RxUpdate } from "react-icons/rx";

const CrawlStatusBox = () => {
  const [stats, setStats] = useState({
    totalMovies: 0, // tổng số phim
    totalUpdatedMovies: 0, // số phim đã cập nhật
    totalSlugs: 0, // tổng số slugs
    totalSeries: 0, // phim bộ
    totalSingles: 0, // phim lẻ
    totalTVShows: 0, // chương trình truyền hình
    totalAnimations: 0, // phim hoạt hình
    totalCinemas: 0, // phim chiếu rạp
    totalDubbedMovies: 0, // phim thuyết minh
    totalSubtitledMovies: 0, // phim phụ đề
    totalVoiceDubbedMovies: 0, // phim lồng tiếng
  });
  const { data: session } = useSession();

  useEffect(() => {
    socketCrawlMovies.on("refreshTotalMovies", (movieStats) => {
      setStats((prevStats) => ({ ...prevStats, ...movieStats }));
      toast.success("Đã cập nhật thống kê phim mới!");
    });

    return () => {
      socketCrawlMovies.off("refreshTotalMovies");
    };
  }, []);

  useEffect(() => {
    if (!session?.user?.accessToken) return;

    const fetchData = async () => {
      try {
        const response = await fetchMovieStats(
          session?.user?.accessToken as string
        );

        if (response?.status) {
          setStats((prev) => ({ ...prev, ...response.data }));
        }
      } catch (error) {
        console.error("Error fetching total crawled movies:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-8">
      <div className="grid grid-cols-12 gap-6">
        <div className="bg-[#ffffff0f] p-4 lg:col-span-6 col-span-12 rounded-2xl items-center shadow-md">
          <div className="flex items-center gap-2 text-xl font-bold text-white mb-2">
            <IoIosStats className="text-xl" />
            <h6>Thống kê phim</h6>
          </div>

          <p className="text-lg font-semibold text-center text-primary mb-4">
            Tổng {stats.totalMovies}/{stats.totalSlugs} bộ phim
          </p>

          <div className="grid grid-cols-2 gap-3 w-full text-center">
            <div className="bg-[#ffffff1a] rounded-lg p-2 flex flex-col items-center">
              <span className="font-semibold text-sm">Phim bộ</span>
              <span className="text-lg font-bold">{stats.totalSeries}</span>
            </div>
            <div className="bg-[#ffffff1a] rounded-lg p-2 flex flex-col items-center">
              <span className="font-semibold text-sm">Phim lẻ</span>
              <span className="text-lg font-bold">{stats.totalSingles}</span>
            </div>
            <div className="bg-[#ffffff1a] rounded-lg p-2 flex flex-col items-center">
              <span className="font-semibold text-sm">
                Chương trình truyền hình
              </span>
              <span className="text-lg font-bold">{stats.totalTVShows}</span>
            </div>
            <div className="bg-[#ffffff1a] rounded-lg p-2 flex flex-col items-center">
              <span className="font-semibold text-sm">Hoạt hình</span>
              <span className="text-lg font-bold">{stats.totalAnimations}</span>
            </div>
            <div className="bg-[#ffffff1a] rounded-lg p-2 flex flex-col items-center">
              <span className="font-semibold text-sm">Chiếu rạp</span>
              <span className="text-lg font-bold">{stats.totalCinemas}</span>
            </div>
            <div className="bg-[#ffffff1a] rounded-lg p-2 flex flex-col items-center">
              <span className="font-semibold text-sm">Phim thuyết minh</span>
              <span className="text-lg font-bold">
                {stats.totalDubbedMovies}
              </span>
            </div>
            <div className="bg-[#ffffff1a] rounded-lg p-2 flex flex-col items-center">
              <span className="font-semibold text-sm">Phim phụ đề</span>
              <span className="text-lg font-bold">
                {stats.totalSubtitledMovies}
              </span>
            </div>
            <div className="bg-[#ffffff1a] rounded-lg p-2 flex flex-col items-center">
              <span className="font-semibold text-sm">Phim lồng tiếng</span>
              <span className="text-lg font-bold">
                {stats.totalVoiceDubbedMovies}
              </span>
            </div>
          </div>

          <div className="text-sm text-green-400 mt-4 text-left flex items-center gap-1">
            <RxUpdate />
            <span>Đã cập nhật: {stats.totalUpdatedMovies}/{stats.totalMovies} phim</span>
          </div>
        </div>

        <div className="lg:col-span-6 col-span-12 bg-[#ffffff0f] p-4 rounded-2xl flex flex-col justify-between items-start shadow-md">
          <div>
            <div className="flex items-center gap-1 text-xl font-semibold">
              <BsCupHotFill />
              <h6>Hướng dẫn sử dụng</h6>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-sm text-gray-400">
                <span className="font-bold text-primary">Bắt đầu cào: </span>
                hệ thống sẽ kiểm tra slugs chưa được lưu vào cơ sở dữ liệu và
                tiến hành cào dữ liệu phim tương ứng với các slugs đó. Nếu chưa
                có slugs từ trước thì hệ thống sẽ tự động cào slugs trước khi
                cào phim.
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-bold text-primary">Cập nhật:</span> hệ
                thống sẽ cập nhật thông tin phim mới nhất cho tất cả các phim đã
                có trong cơ sở dữ liệu. Nếu chưa có slugs từ trước thì hệ thống
                sẽ tự động cào slugs trước khi cập nhật phim.
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-bold text-primary">Làm mới:</span> hệ
                thống sẽ đặt lại trạng thái cào. Sau đó bạn có thể bắt đầu một
                quá trình cào mới từ đầu.
              </p>
              <p className="text-sm text-green-400">
                <span className="font-semibold">Tip:</span> Không tắt trình
                duyệt hoặc đóng tab trong khi quá trình đang diễn ra để tránh bị
                gián đoạn.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-end mt-4 flex-wrap">
            <RunCrawlMovies action="create" />
            <RunCrawlMovies action="update" />
            <ResetCrawlStatus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrawlStatusBox;
