"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useClickOutside } from "@/hooks/useClickOutside";
import { RootState } from "@/store/store";
import { useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { CloseButton } from "@/components/ui/close-button";
import Image from "@/components/shared/Image";
import { IconButton } from "@chakra-ui/react";
import { TiUserDelete } from "react-icons/ti";
import { useSession } from "next-auth/react";
import useWatchTogetherV2 from "@/hooks/useWatchTogetherV2";
import { Tooltip } from "@/components/ui/tooltip";

const ViewerList = () => {
  const { roomData, loading } = useSelector(
    (state: RootState) => state.watchTogetherV2
  );
  const [showViewers, setShowViewers] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { data: session } = useSession();
  const { handleKickViewer, isHost } = useWatchTogetherV2();

  // xử lý click outside
  useClickOutside(menuRef, () => setShowViewers(false));

  return (
    <div ref={menuRef} className="relative ">
      <Tooltip
        contentProps={{
          className: "bg-white text-black",
        }}
        content="Xem người xem"
      >
        <div
          className="text-sm cursor-pointer text-gray-300 flex items-center gap-1"
          onClick={() => setShowViewers(!showViewers)}
        >
          <FaEye />
          {roomData?.currentParticipants || 0}
        </div>
      </Tooltip>

      <AnimatePresence>
        {showViewers && (
          <motion.div
            key="viewerList"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="
                fixed right-2 bottom-2 top-2 md:left-auto left-2
                border border-[rgba(255,255,255,0.2)]
                max-h-[calc(100vh-0.5rem)] overflow-y-auto
                md:max-w-lg w-[calc(100%-1rem)]
                bg-[#111111] shadow-xl rounded-2xl md:p-6 p-4 z-50
            "
          >
            <div className="text-white text-lg font-semibold mb-3 flex items-center justify-between">
              {roomData?.currentParticipants} người{" "}
              {roomData?.status === "active" ? "đang xem" : "đang chờ"}
              <CloseButton
                className="ml-4 text-white hover:bg-transparent hover:opacity-75"
                onClick={() => setShowViewers(false)}
              />
            </div>
            <ul className="space-y-2">
              {roomData?.participantUsers?.map((user) => (
                <li key={user?.userId} className="text-gray-200 flex gap-4">
                  <div className="w-9 h-9 relative flex-shrink-0">
                    <Image
                      src={user?.avatar}
                      alt={user?.username}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex-grow-1 overflow-hidden flex flex-col">
                    <div className="font-medium text-sm truncate">
                      {user?.username}
                      {user?.userId === session?.user.id && (
                        <span className="ml-1 text-xs text-gray-300 italic">
                          (Bạn)
                        </span>
                      )}
                    </div>
                    {roomData?.hostUserId === user?.userId ? (
                      <span className="text-xs text-primary">Chủ phòng</span>
                    ) : (
                      <span className="text-xs text-gray-400">Người xem</span>
                    )}
                  </div>
                  {roomData?.hostUserId !== user?.userId && isHost && (
                    <Tooltip
                      content={`Xóa ${user?.username} khỏi phòng`}
                      contentProps={{
                        className: "bg-white text-black",
                      }}
                    >
                      <IconButton
                        loading={loading.kickUserId === user?.userId}
                        onClick={() =>
                          handleKickViewer(roomData._id, user?.userId)
                        }
                        className="text-white rounded-md hover:bg-[#fff1] bg-transparent border border-[#fff2]"
                      >
                        <TiUserDelete />
                      </IconButton>
                    </Tooltip>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewerList;
