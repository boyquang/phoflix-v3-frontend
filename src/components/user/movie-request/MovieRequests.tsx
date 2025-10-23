"use client";

import EmptyData from "@/components/shared/EmptyData";
import ShowMoreText from "@/components/shared/ShowMoreText";
import { formatDateUnix } from "@/lib/utils";
import { useEffect, useState } from "react";
import { SiGoogleforms } from "react-icons/si";
import SeeMoreMovieRequest from "./SeeMoreMovieRequest";
import DeleteMovieRequest from "@/components/user/movie-request/DeleteMovieRequest";
import { IoIosReturnRight } from "react-icons/io";
import {
  status,
  statusShowAdminResponse,
} from "@/constants/movie-request.contant";

export interface IMovieRequest {
  id: string;
  movie_name: string;
  description: string | null;
  release_year: number | null;
  country: string | null;
  genre: string | null;
  admin_response: string | null;
  status: "pending" | "approved" | "rejected" | "all";
  created_at: number;
}

interface MovieRequestsProps {
  data: {
    items: MovieRequest[];
    has_more: boolean;
    total_items: number;
    status: "pending" | "approved" | "rejected" | "all";
  };
}

const emptys = {
  pending: {
    title: "Không có yêu cầu nào đang chờ duyệt",
    description: "Hãy gửi yêu cầu phim mới nhé!",
  },
  approved: {
    title: "Không có yêu cầu nào đã được duyệt",
    description: "Hãy gửi yêu cầu phim mới nhé!",
  },
  rejected: {
    title: "Không có yêu cầu nào đã bị từ chối",
    description: "Hãy gửi yêu cầu phim mới nhé!",
  },
  all: {
    title: "Không có yêu cầu nào",
    description: "Hãy gửi yêu cầu phim mới nhé!",
  },
};

const MovieRequests = ({ data }: MovieRequestsProps) => {
  const [movieRequests, setMovieRequests] = useState<MovieRequest[]>(
    data?.items || []
  );

  useEffect(() => {
    if (data) {
      setMovieRequests(data.items);
    }
  }, [data]);

  if (!data?.items || data?.items?.length === 0) {
    return (
      <div className="flex justify-center items-center rounded-2xl p-4 bg-[#ffffff05]">
        <EmptyData
          icon={<SiGoogleforms />}
          title={emptys[data?.status]?.title || "Không có yêu cầu nào"}
          description={
            emptys[data?.status]?.description || "Hãy gửi yêu cầu phim mới nhé!"
          }
        />
      </div>
    );
  }

  return (
    <div className="">
      <ul className="bg-[#ffffff05] rounded-2xl flex-1 mx-auto overflow-hidden">
        {movieRequests?.map((request) => (
          <li
            id={request.id}
            key={request.id}
            className="p-4 border-b relative border-[#ffffff10] last:border-b-0 hover:bg-[#ffffff05]"
          >
            <div className="flex items-center justify-between gap-4">
              <h4 className="lg:text-[1rem] text-sm mb-1 text-white truncate font-semibold">
                {request.movie_name}
              </h4>
              <DeleteMovieRequest movieRequestId={request?.id} />
            </div>
            <p className="lg:text-sm text-xs text-gray-500 mt-2 mb-0.5">
              Năm phát hành: {request.release_year || "N/A"} | Quốc gia:{" "}
              {request.country || "N/A"} | Thể loại: {request.genre || "N/A"}
            </p>
            <div className="text-xs mb-0.5 lg:text-sm text-gray-500">
              <p className="mb-0.5">
                {request.description ? "Mô tả: " : "Mô tả: N/A"}
              </p>
              {request.description && (
                <ShowMoreText text={request.description || "N/A"} row={3} />
              )}
            </div>
            <div className="flex items-center justify-between mb-2 mt-1">
              <div className="flex items-center gap-1">
                <span className="text-xs lg:text-sm text-gray-500">
                  Trạng thái:
                </span>
                <div
                  className={`flex items-center justify-center rounded-full lg:h-5 h-4 lg:text-sm text-xs px-2 ${
                    status[request.status]?.className ||
                    "bg-gray-500 text-white"
                  }`}
                >
                  {status[request.status]?.label || "Không xác định"}
                </div>
              </div>
              <span className="text-xs text-gray-500">
                {formatDateUnix(request?.created_at)}
              </span>
            </div>

            {request.admin_response &&
              statusShowAdminResponse.includes(request.status) && (
                <div className="text-xs lg:text-sm text-gray-500">
                  <p className="mb-0.5 text-primary">
                    Phản hồi của quản trị viên:
                  </p>
                  <div className="flex items-start gap-1">
                    <IoIosReturnRight className="flex-shrink-0 mt-1" />
                    <ShowMoreText text={request.admin_response} row={3} />
                  </div>
                </div>
              )}
          </li>
        ))}
      </ul>

      <SeeMoreMovieRequest
        movieRequests={movieRequests}
        setMovieRequests={setMovieRequests}
        hasMore={data?.has_more || false}
      />
    </div>
  );
};

export default MovieRequests;
