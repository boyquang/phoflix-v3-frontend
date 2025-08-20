"use client";

import AlertDialog from "@/components/shared/AlertDialog";
import useSendSocketWatchingTogether from "@/hooks/useSendSocketWatchingTogether";
import { leaveRoomWatchingTogether } from "@/lib/actions/watching-together.action";
import { setHasLeftRoom } from "@/store/slices/watching-together.slice";
import { AppDispatch, RootState } from "@/store/store";
import { Button } from "@chakra-ui/react";
import { delay } from "lodash";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const LeaveRoomButton = () => {
  const { roomOwnerId } = useSelector(
    (state: RootState) => state.watchingTogether
  );
  const params = useParams();
  const roomId = params?.roomId as string;
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { sendSocketLeaveRoom, sendSocketCloseRoom } =
    useSendSocketWatchingTogether();

  const handleLeaveRoomWatchingTogether = async () => {
    try {
      setLoading(true);
      const response = await leaveRoomWatchingTogether({
        userId: session?.user?.id as string,
        roomId,
        accessToken: session?.user?.accessToken as string,
      });

      if (response?.status) {
        if (session?.user?.id === roomOwnerId) {
          sendSocketCloseRoom();
        } else {
          sendSocketLeaveRoom();
        }

        toast.success(response?.message);

        delay(() => {
          router.push("/");
        }, 1000);

        dispatch(setHasLeftRoom(true));
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog
      title={roomOwnerId === session?.user?.id ? "Đóng phòng" : "Rời phòng"}
      loading={loading}
      content={
        roomOwnerId === session?.user?.id
          ? "Bạn có chắc chắn muốn đóng phòng?"
          : "Bạn có chắc chắn muốn rời phòng"
      }
      confirmCallback={handleLeaveRoomWatchingTogether}
      trigger={
        <Button size="sm" className="bg-red-600 hover:opacity-80">
          <FaSignOutAlt className="md:mr-1" />
          <span className="md:block hidden">
            {session?.user?.id === roomOwnerId ? "Đóng phòng" : "Rời phòng"}
          </span>
        </Button>
      }
    />
  );
};

export default LeaveRoomButton;
