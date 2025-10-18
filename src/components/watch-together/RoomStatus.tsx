"use client";

import { FaRegHourglassHalf, FaVideoSlash } from "react-icons/fa6";
import { RiHourglassFill } from "react-icons/ri";

interface RoomStatusProps {
  status: "pending" | "ended";
}

const roomStatusMapping = {
  pending: {
    text: "Đang chờ",
    icon: <RiHourglassFill className="count-time" />,
    className: "text-white border-while bg-[#000000c0]",
  },
  ended: {
    text: "Đã kết thúc",
    icon: <FaVideoSlash />,
    className: "text-[#fe476a] border-[#fe476a] bg-[#0009]",
  },
};

const RoomStatus = ({ status }: RoomStatusProps) => {
  return (
    <div
      className={`${roomStatusMapping[status].className} absolute rounded-md px-2.5 py-1.5 bottom-2 left-2 border text-xs backdrop-blur-sm flex items-center gap-2`}
    >
      {roomStatusMapping[status].icon}
      {roomStatusMapping[status].text}
    </div>
  );
};

export default RoomStatus;
