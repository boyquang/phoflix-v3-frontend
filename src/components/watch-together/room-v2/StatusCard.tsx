"use client";

import useWatchTogetherV2 from "@/hooks/useWatchTogetherV2";
import { Button } from "@chakra-ui/react";
import { Session } from "next-auth";
import Link from "next/link";
import { FaPodcast } from "react-icons/fa6";
import { IoIosPlayCircle } from "react-icons/io";
import { RiHourglassFill } from "react-icons/ri";

interface StatusCardProps {
  status: "pending" | "ended";
  roomData: Room;
  session: Session | null;
}

type ButtonConfig = {
  label: string;
  href: string;
  icon: React.ReactNode;
  className: string;
  isShow?: boolean;
  onclick?: () => void;
};

type CardStatusMapping = {
  pending: {
    title: string;
    buttons: ButtonConfig[];
  };
  ended: {
    title: string;
    buttons: ButtonConfig[];
  };
};

const StatusCard = ({ session, status, roomData }: StatusCardProps) => {
  const { handleStartLive } = useWatchTogetherV2();

  const cardStatusMapping: CardStatusMapping = {
    pending: {
      title: "Buổi xem chung",
      buttons: [
        {
          isShow: true,
          label: "Đang chờ",
          href: "#",
          icon: <RiHourglassFill className="count-time" />,
          className: "bg-white text-black cursor-progress",
        },
        {
          isShow: roomData?.host?.userId === session?.user.id,
          label: "Bắt đầu",
          href: "#",
          onclick: () => {
            handleStartLive(roomData._id);
          },
          icon: <IoIosPlayCircle />,
          className: "bg-transparent text-white border hover:opacity-75 border-[rgba(255,255,255,.5)]",
        },
      ],
    },
    ended: {
      title: "Đã kết thúc",
      buttons: [
        {
          isShow: true,
          label: "Xem riêng",
          href: `/dang-xem/${roomData?.movie?.slug}`,
          icon: <IoIosPlayCircle />,
          className: "bg-white text-black hover:opacity-75",
        },
        {
          isShow: true,
          label: "Live khác",
          href: "/xem-chung",
          icon: <FaPodcast />,
          className: "bg-transparent text-white border hover:opacity-75 border-[rgba(255,255,255,.5)]",
        },
      ],
    },
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <div className="lg:max-w-[440px] max-w-[80%] text-center lg:border border-[rgba(255,255,255,.5)] flex flex-col gap-2 items-center justify-center w-full lg:bg-[rgba(0,0,0,.7)] lg:backdrop-blur-sm lg:p-6 rounded-2xl">
        <h6 className="text-base text-white">
          {cardStatusMapping[status].title}
        </h6>
        <h4 className="lg:text-lg font-semibold text-center text-base text-primary line-clamp-2">
          {roomData?.movie?.name || "Phòng xem chung"}
        </h4>
        <div className="flex items-center gap-4 w-full lg:mt-6 justify-center">
          {cardStatusMapping[status].buttons.map((button, index) => (
            <div key={index}>
              {button.isShow ? (
                <Button
                  asChild
                  rounded="lg"
                  onClick={() => {
                    if (button?.onclick) button.onclick();
                  }}
                  className={`${button.className} lg:flex-grow-1 lg:px-4 lg:h-[50px] h-[36px] px-2.5 lg:text-lg text-sm`}
                >
                  <Link href={button.href}>
                    {button.icon}
                    {button.label}
                  </Link>
                </Button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
