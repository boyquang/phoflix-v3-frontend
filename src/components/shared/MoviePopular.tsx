"use client";

import Image from "@/components/shared/Image";
import { THEMOVIEDB_IMAGE_URL } from "@/lib/env";
import { formatString } from "@/lib/utils";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useSelector } from "react-redux";

const limit = 10;

const MoviePopular = () => {
  const { items, loading } = useSelector(
    (state: RootState) => state.movie.moviePopular
  );

  if (loading) return null;

  return (
    <div className="xl:block hidden pt-8 border-t border-[#ffffff10]">
      <h4 className="lg:text-2xl text-lg text-gray-50 mb-6">
        Top {limit} phim phổ biến nhất
      </h4>
      <div className="flex flex-col gap-4">
        {[...items]?.splice(0, limit)?.map((item: any, index: number) => (
          <div className="flex items-center justify-between gap-2" key={index}>
            <div className="2xl:text-5xl text-2xl 2xl:w-[60px] w-[40px] italic text-gradient flex-shrink-0 font-bold">
              {index + 1}
            </div>
            <Link
              className="flex-grow-1 block"
              href={`/thong-tin-phim/${formatString(
                item?.name || item?.title
              )}`}
            >
              <div className="group p-2 gap-4 flex items-start bg-[#ffffff05] flex-grow-1 rounded-xl">
                <div className="w-20 flex-shrink-0">
                  <div className="h-0 pt-[150%] relative">
                    <Image
                      className="rounded-md transition-all group-hover:brightness-75"
                      src={`${THEMOVIEDB_IMAGE_URL}${item?.poster_path}`}
                      alt={item?.title || item?.name || "Không xác định"}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 overflow-hidden">
                  <h4 className="text-sm text-gray-200">
                    {item?.name || item?.title || "Không xác định"}
                  </h4>
                  <p className="text-xs text-gray-400 truncate">
                    {item?.original_name ||
                      item?.original_title ||
                      "Không xác định"}
                  </p>
                  <div className="text-xs text-gray-400">
                    <p>
                      Độ phổ biến: {Number(item?.popularity || 0).toFixed(1)}
                    </p>
                    <p>
                      Điểm trung bình:{" "}
                      {Number(item?.vote_average || 0).toFixed(1)}
                    </p>
                    <p>Số lượng bình chọn: {item?.vote_count || 0}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviePopular;
