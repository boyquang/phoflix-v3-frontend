"use client";

import EmptyData from "@/components/shared/EmptyData";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { FaEye } from "react-icons/fa6";
import { RiMovieAiFill } from "react-icons/ri";
import Image from "../shared/Image";
import AvatarCustom from "../shared/AvatarCustom";

interface ListRoomsProps {
  rooms: Rooms[];
  classNameGrid: string;
}

const ListRooms = ({ rooms, classNameGrid }: ListRoomsProps) => {
  if (!rooms || rooms?.length === 0) {
    return (
      <EmptyData
        className="mx-auto max-w-2xl h-48 mt-32 bg-[#0003] rounded-2xl"
        icon={<RiMovieAiFill />}
        title="Danh sách phòng trống"
        description="Hiện chưa có phòng nào được tạo. Hãy tạo một phòng mới để cùng nhau xem phim nhé!"
      />
    );
  }

  return (
    <ul className={`${classNameGrid} mt-6`}>
      {rooms?.map((room) => (
        <li key={room.roomId}>
          <div className="flex flex-col gap-3 transition-all group hover:-translate-y-1">
            <div className="relative">
              <Link
                href={`/phong-xem-chung/${room.roomId}`}
                className="relative h-0 pt-[56.25%] block"
              >
                <Image
                  src={room?.movieData?.movieThumb || ""}
                  alt={room?.movieData?.movieName || "Phim"}
                  className="rounded-xl brightness-90 group-hover:brightness-100 transition-all duration-300 object-cover absolute inset-0 w-full h-full"
                />
              </Link>
              <div className="shadow-2xl rounded-md px-2 items-center py-1 text-xs bg-red-500 flex gap-1 text-gray-50 absolute left-2 top-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white live-flash"></div>
                LIVE
              </div>
              <div className="absolute rounded-md text-white px-2 py-1 bottom-2 left-2 border text-xs border-white backdrop-blur-sm bg-[#000000c0] flex items-center gap-1">
                <FaEye />
                <span>{room?.users?.length || 0} đang xem</span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="live-avatar w-10 h-10 flex items-center justify-center rounded-full overflow-hidden flex-shrink-0 border-2 border-red-500 bg-[#282B3A]">
                <AvatarCustom
                  src={room.roomOwner?.avatar}
                  alt={room.roomOwner?.name}
                  size="small"
                />
              </div>
              <div className="flex flex-col gap-1 overflow-hidden">
                <h4 className="text-sm">
                  <Link
                    href={`/watching-together/${room.roomId}`}
                    className="text-gray-50 hover:text-[#FFD875] block truncate transition-all duration-300"
                  >
                    Cùng xem {room?.movieData?.movieName} nhé
                  </Link>
                </h4>
                <div className="flex gap-2 text-xs text-[#aaaaaa] items-center">
                  <span className="truncate">
                    {room.roomOwner?.name || "Không xác định"}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ffffff30] flex-shrink-0"></div>
                  <span className="truncate">
                    {formatDate(room?.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListRooms;
