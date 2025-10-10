"use client";

import AlertDialog from "@/components/shared/AlertDialog";
import StatusTag from "@/components/shared/StatusTag";
import { Avatar } from "@/components/ui/avatar";
import { Tooltip } from "@/components/ui/tooltip";
import useSendSocketWatchingTogether from "@/hooks/useSendSocketWatchingTogether";
import { kickUserOutOfRoomWatchingTogether } from "@/lib/actions/watching-together.action";
import { RoomUser } from "@/store/slices/room-users.slice";
import { RootState } from "@/store/store";
import { Box, IconButton } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { IoPersonRemove } from "react-icons/io5";
import { useSelector } from "react-redux";

const ViewerList = () => {
  const { roomOwnerId, roomId } = useSelector(
    (state: RootState) => state.watchingTogether
  );
  const { users } = useSelector((state: RootState) => state.roomUsers);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const { sendSocketKickUser } = useSendSocketWatchingTogether();

  const handleKickUserOutOfRoom = async (user: RoomUser) => {
    setLoading(true);
    const response = await kickUserOutOfRoomWatchingTogether({
      userId: user?.id,
      roomId,
      roomOwnerId,
      accessToken: session?.user?.accessToken as string,
    });
    setLoading(false);

    if (response?.status) {
      sendSocketKickUser(user);
    }
  };

  return (
    <Box className="lg:mt-0 mt-4">
      <Box className="flex items-center gap-x-2 mb-4">
        <FaEye />
        <h4 className="lg:text-lg text-sm text-gray-300">
          {users?.length} người đang xem
        </h4>
      </Box>
      <ul className="flex flex-col gap-3">
        {users?.map((user: RoomUser, index: number) => (
          <li
            key={index}
            className="flex items-center justify-between gap-x-2 flex-wrap"
          >
            <div className="flex items-center gap-x-2 flex-wrap">
              <Avatar src={user.avatar} name={user.username} size="sm" />
              <p className="lg:text-sm text-xs text-gray-50">{user.username}</p>
              {user?.id === roomOwnerId && <StatusTag text="Chủ phòng" />}
            </div>
            {user?.id !== roomOwnerId && session?.user?.id === roomOwnerId && (
              <AlertDialog
                title="Xóa người xem khỏi phòng"
                content={
                  <span className="text-gray-50 text-sm">
                    Bạn chắn chắn muốn xóa người xem{" "}
                    <span className="text-primary">{user?.username}</span> ra
                    khỏi phòng
                  </span>
                }
                loading={loading}
                confirmCallback={() => handleKickUserOutOfRoom(user)}
                trigger={
                  <Box>
                    <Tooltip
                      content="Xóa người xem ra khỏi phòng"
                      closeDelay={100}
                      openDelay={100}
                    >
                      <IconButton
                        size="xs"
                        className="bg-red-600 hover:opacity-80 text-gray-50"
                      >
                        <IoPersonRemove />
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
              />
            )}
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default ViewerList;
