"use client";

import EmptyData from "@/components/shared/EmptyData";
import { formatDate } from "@/lib/utils";
import { FaEye, FaPodcast } from "react-icons/fa6";
import Image from "../shared/Image";
import AvatarCustom from "../shared/AvatarCustom";
import RoomStatus from "./RoomStatus";
import FilterOptions from "../shared/FilterOptions";
import useWatchTogetherV2 from "@/hooks/useWatchTogetherV2";
import { Spinner } from "@chakra-ui/react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import LiveBadge from "./room-v2/LiveBadge";

interface ListRoomsProps {
  rooms: Room[];
  classNameGrid: string;
  scope?: "all" | "user";
}

const ListRooms = ({ scope = "all", rooms, classNameGrid }: ListRoomsProps) => {
  const {
    generateOptionsRoomByStatus,
    handleJoinRoom,
    handleStartLive,
    handleDeleteRoom,
    handleEndLive,
  } = useWatchTogetherV2();
  const { joinRoomId } = useSelector(
    (state: RootState) => state.watchTogetherV2.loading
  );

  const handleOptionsChange = (value: ValueOptionRoom, roomId: string) => {
    const actionMapping = {
      end: handleEndLive,
      start: handleStartLive,
      delete: handleDeleteRoom,
    };

    if (actionMapping[value]) {
      actionMapping[value](roomId);
    }
  };

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
          {joinRoomId === room?._id && (
            <div className="absolute text-primary gap-2 top-2 left-2 z-20">
              <Spinner size="sm" />
            </div>
          )}
          <div
            className={`flex relative flex-col gap-3 transition-all group ${
              joinRoomId === room?._id ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <div className="relative">
              <div
                title={room?.movie?.name}
                onClick={() => {
                  handleJoinRoom(room?._id);
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
                  <LiveBadge />
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
                      handleJoinRoom(room?._id);
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
                  isLastItem={
                    rooms[rooms.length - 1]._id === room._id && rooms.length > 1
                  }
                  selectedBackground={false}
                  options={generateOptionsRoomByStatus(room?.status)}
                  onChange={(value) =>
                    handleOptionsChange(value as ValueOptionRoom, room?._id)
                  }
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
