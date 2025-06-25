"use client";

import { THEMOVIEDB_IMAGE_URL } from "@/lib/env";
import { formatDateVn } from "@/lib/utils";
import Image from "@/components/shared/Image";
import ShowMoreText from "@/components/shared/ShowMoreText";

interface ActorDetailProps {
  data: {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: null | string;
    gender: number;
    homepage: null | string;
    id: number;
    imdb_id: null | string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
  };
}

const ActorDetail = ({ data }: ActorDetailProps) => {
  return (
    <div className="3xl:w-[440px] lg:w-[340px] w-full lg:text-left text-center lg:border-r lg:pr-10 pb-10 flex-shrink-0 border-[#ffffff10]">
      <div className="relative w-40 h-40 mb-4 lg:mx-0 mx-auto">
        <Image
          className="rounded-[25%]"
          src={`${THEMOVIEDB_IMAGE_URL}${data?.profile_path}`}
          alt={data?.name}
          ref={null}
        />
      </div>
      <h2 className="lg:text-2xl text-lg font-semibold text-gray-50 mb-4">
        {data?.name}
      </h2>
      <div className="grid lg:grid-cols-1 grid-cols-2 gap-4">
        <div>
          <p className="text-gray-50 text-sm">Tên gọi khác:</p>
          <p className="text-gray-400 text-sm">
            {data?.also_known_as?.length > 0
              ? data?.also_known_as?.join(", ")
              : "Đang cập nhật"}
          </p>
        </div>
        <div>
          <p className="text-gray-50 text-sm">Giới thiệu:</p>
          <ShowMoreText
            text={data?.biography || "Đang cập nhật"}
            row={5}
            className="text-gray-400 text-sm"
          />
        </div>
        <div>
          <span className="text-gray-50 text-sm mr-2">Giới tính:</span>
          <span className="text-gray-400 text-sm">
            {data?.gender === 1
              ? "Nữ"
              : data?.gender === 2
              ? "Nam"
              : "Không rõ"}
          </span>
        </div>
        <div>
          <span className="text-gray-50 text-sm mr-2">Ngày sinh:</span>
          <span className="text-gray-400 text-sm">
            {data?.birthday ? formatDateVn(data?.birthday) : "Đang cập nhật"}
          </span>
        </div>
        <div>
          <p className="text-gray-50 text-sm mr-2">Nơi sinh:</p>
          <p className="text-gray-400 text-sm">
            {data?.place_of_birth || "Đang cập nhật"}
          </p>
        </div>
        <div>
          <span className="text-gray-50 text-sm mr-2">Độ phổ biến:</span>
          <span className="text-gray-400 text-sm">
            {Number(data?.popularity).toFixed(1) || "Đang cập nhật"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActorDetail;
