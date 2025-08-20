"use client";

import Image from "@/components/shared/Image";
import { THEMOVIEDB_IMAGE_URL } from "@/constants/env.contant";
import { formatString } from "@/lib/utils";
import { RootState } from "@/store/store";
import Link from "next/link";
import { AiFillLike } from "react-icons/ai";
import { FaFireAlt, FaHeart, FaMedal } from "react-icons/fa";
import { useSelector } from "react-redux";

const limit = 10;

const MoviePopular = () => {
  const { items, loading } = useSelector(
    (state: RootState) => state.movie.moviePopular
  );

  if (loading) return null;

  return (
    <div className="xl:block hidden w-full pt-8 border-t border-[#ffffff10]">
      <div className="lg:text-2xl text-lg text-gray-50 mb-6 flex items-center gap-2">
        <FaMedal />
        <h4>Top {limit} phim phổ biến nhất</h4>
      </div>

      <div className="flex flex-col gap-4">
        {[...items]?.splice(0, limit)?.map((item, index: number) => (
          <div className="flex items-center relative" key={index}>
            <div className="text-6xl 2xl:relative whitespace-nowrap absolute z-10 -top-4 -left-2 w-[80px] italic text-gradient flex-shrink-0 font-bold">
              {index + 1}
            </div>
            <Link
              className="flex-grow-1 block"
              href={`/thong-tin-phim/${formatString(
                item?.name || item?.title || ""
              )}`}
            >
              <div className="group border border-transparent hover:border-white/20 p-2 gap-4 flex items-center bg-[#ffffff05] flex-grow-1 rounded-xl overflow-hidden">
                <div className="w-20 flex-shrink-0">
                  <div className="h-0 pt-[150%] relative">
                    <Image
                      className="rounded-md brightness-75"
                      src={`${THEMOVIEDB_IMAGE_URL}${item?.poster_path}`}
                      alt={item?.title || item?.name || "Không xác định"}
                    />
                  </div>
                </div>
                <div className="overflow-hidden min-w-0 flex-1">
                  <h4 className="text-sm text-gray-200">
                    {item?.name || item?.title || "Không xác định"}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    {item?.original_name ||
                      item?.original_title ||
                      "Không xác định"}
                  </p>
                  <div className="text-xs text-gray-400 flex items-center gap-2 mt-4">
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-md border border-white/10">
                      <FaFireAlt />
                      {Number(item?.popularity || 0).toFixed(1)}
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-md border border-white/10">
                      <FaHeart />
                      {Number(item?.vote_average || 0).toFixed(1)}
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-md border border-white/10">
                      <AiFillLike />
                      {Number(item?.vote_count || 0).toFixed(1)}
                    </div>
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
