"use client";

import { Box } from "@chakra-ui/react";
import EmptyData from "../../shared/EmptyData";
import { MdNotificationsActive } from "react-icons/md";
import Loading from "@/app/loading";
import Link from "next/link";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { setOpenNotification } from "@/store/slices/notificationSlice";
import Image from "../../shared/Image";
import { formatDateUnix } from "@/lib/utils";

const NotificationList = ({ notifications, loading }: NotificationsProps) => {
  const dispatch: AppDispatch = useDispatch();

  if (loading) {
    return (
      <Box className="h-64 flex items-center justify-center">
        <Loading type="bars" height="h-1/2" />
      </Box>
    );
  }

  if (!notifications || notifications.length === 0) {
    return (
      <Box className="flex justify-center items-center">
        <EmptyData
          icon={<MdNotificationsActive />}
          title="Không có thông báo nào"
          description="Hãy quay lại sau nhé!"
        />
      </Box>
    );
  }

  return (
    <ul>
      {notifications?.map((notification, index) => (
        <li key={index} className="border-b border-[#ffffff10] last:border-b-0">
          <Link
            onClick={() => dispatch(setOpenNotification(false))}
            href={notification?.href as string}
            className="p-4 hover:bg-[#ffffff05] text-gray-50 flex gap-4 items-start"
          >
            {notification?.image && (
              <Box className="relative pt-14 h-0 rounded-md overflow-hidden w-10 flex-shrink-0">
                <Image
                  className="rounded-md"
                  src={notification?.image}
                  alt={notification?.content as string}
                />
              </Box>
            )}
            <Box>
              <p className="text-xs text-gray-100">{notification?.content}</p>
              <span className="text-[10px] text-gray-400">
                {formatDateUnix(notification?.created_at)}
              </span>
            </Box>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NotificationList;
