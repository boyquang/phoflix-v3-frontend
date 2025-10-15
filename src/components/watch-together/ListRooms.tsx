"use client";

import EmptyData from "@/components/shared/EmptyData";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { FaEye, FaPodcast, FaVideoSlash } from "react-icons/fa6";
import Image from "../shared/Image";
import AvatarCustom from "../shared/AvatarCustom";
import RoomStatus from "./RoomStatus";
import FilterOptions from "../shared/FilterOptions";
import useWatchTogetherV2 from "@/hooks/useWatchTogetherV2";
import { useState } from "react";
import { Spinner } from "@chakra-ui/react";

interface ListRoomsProps {
  rooms: Room[];
  classNameGrid: string;
  scope?: "all" | "user";
}

const ListRooms = ({ scope = "all", rooms, classNameGrid }: ListRoomsProps) => {
  const { generateOptionsRoomByStatus, handleJoinRoom } = useWatchTogetherV2();
  const [roomId, setRoomId] = useState<string>("");

  if (!rooms || rooms?.length === 0) {
    return (
      <EmptyData
        className="mx-auto h-48 bg-[#0003] rounded-2xl"
        icon={<FaPodcast />}
        title="Không có phòng xem chung nào"
        description="Hiện chưa có phòng xem chung nào được tạo. Hãy tạo mới để cùng nhau xem phim nhé!"
      />
    );
  }

  return (
    <ul className={`${classNameGrid} mt-6`}>
      {rooms?.map((room) => (
        <li key={room?._id} className="relative">
          {roomId === room?._id && (
            <div className="absolute text-primary gap-2 top-2 left-2 z-20">
              <Spinner size="sm" />
            </div>
          )}
          <div
            className={`flex relative flex-col gap-3 transition-all group ${
              roomId === room?._id ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <div className="relative">
              <div
                title={room?.movie?.name}
                onClick={() => {
                  handleJoinRoom(room?._id, setRoomId);
                }}
                className="relative h-0 pt-[56.25%] cursor-pointer"
              >
                <Image
                  src={room?.movie?.thumb_url}
                  alt={room?.roomName}
                  className="rounded-xl brightness-90 group-hover:brightness-100 transition-all duration-300 object-cover absolute inset-0 w-full h-full"
                />
              </div>
              {room?.status === "active" && (
                <>
                  <div className="shadow-2xl rounded-md px-2 items-center py-1 text-xs bg-red-500 flex gap-1 text-gray-50 absolute left-2 top-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white live-flash"></div>
                    LIVE
                  </div>
                  <div className="absolute rounded-md text-white px-2.5 py-1.5 bottom-2 left-2 border text-xs border-white backdrop-blur-sm bg-[#000000c0] flex items-center gap-2">
                    <FaEye />
                    <span>{room?.currentParticipants || 0} đang xem</span>
                  </div>
                </>
              )}

              {room?.status === "pending" && <RoomStatus status="pending" />}
              {room?.status === "ended" && <RoomStatus status="ended" />}
            </div>
            <div className="flex gap-4">
              <div className="live-avatar w-10 h-10 flex items-center justify-center rounded-full overflow-hidden flex-shrink-0 border-2 border-red-500 bg-[#282B3A]">
                <AvatarCustom
                  src={room?.host?.avatar}
                  alt={room?.movie?.name}
                  size="small"
                />
              </div>
              <div className="flex flex-col gap-1 overflow-hidden flex-grow-1">
                <h4 className="text-sm overflow-hidden">
                  <div
                    title={room?.roomName}
                    onClick={() => {
                      handleJoinRoom(room?._id, setRoomId);
                    }}
                    className="text-white cursor-pointer font-semibold hover:text-[#FFD875] line-clamp-2 transition-all duration-300"
                  >
                    {room?.roomName}
                  </div>
                </h4>
                <div className="flex items-center gap-2">
                  <div className="flex gap-2 text-xs text-[#aaaaaa] items-center overflow-hidden">
                    <span className="line-clamp-1">{room?.host?.username}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ffffff30] flex-shrink-0"></div>
                    <span className="whitespace-nowrap">
                      {formatDate(room?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
              {scope === "user" && (
                <FilterOptions
                  selectedBackground={false}
                  options={generateOptionsRoomByStatus(room?.status)}
                  onChange={() => {}}
                />
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListRooms;
