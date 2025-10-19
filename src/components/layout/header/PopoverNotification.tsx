"use client";

import { Box, IconButton, Popover, Portal } from "@chakra-ui/react";
import { useEffect, useState, useTransition } from "react";
import { IoNotifications } from "react-icons/io5";
import Link from "next/link";
import NotificationList from "@/components/user/notification/NotificationList";
import { getNotifications } from "@/lib/actions/notification-client-action";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import {
  setActiveTab,
  setNewNotification,
  setOpenNotification,
} from "@/store/slices/notification.slice";

const tabs = [
  { id: "community", title: "Cộng đồng" },
  { id: "individual", title: "Cá nhân" },
];

const PopoverNotification = () => {
  const dispatch: AppDispatch = useDispatch();
  const [notifications, setNotifications] = useState<NotificationCustom[]>([]);
  const [pending, startTransition] = useTransition();
  const { activeTab, openNotification, newNotification } = useSelector(
    (state: RootState) => state.notification
  );
  const { data: session } = useSession();

  const filteredTabs = session
    ? tabs
    : tabs.filter((tab) => tab.id !== "individual");

  useEffect(() => {
    startTransition(async () => {
      const response = await getNotifications({
        limit: 5,
        type: activeTab,
        userId: activeTab === "individual" ? session?.user?.id : null,
      });

      setNotifications(response?.result?.items ?? []);
    });
  }, [activeTab]);

  // Hàm xử lý khi người dùng click vào biểu tượng thông báo
  const handleClickNotification = () => {
    if (newNotification) {
      dispatch(setNewNotification(false));
    }
  };

  return (
    <Popover.Root
      size="xs"
      autoFocus={false}
      open={openNotification}
      onOpenChange={({ open }) => dispatch(setOpenNotification(open))}
    >
      <Popover.Trigger asChild>
        <Box className="cursor-pointer relative">
          <IconButton
            onClick={handleClickNotification}
            title="Thông báo"
            size="sm"
            variant="outline"
            className="bg-transparent text-gray-50 lg:border-[#ffffff86] lg:border border-0"
            rounded="full"
          >
            <IoNotifications
              className={`${newNotification ? "shake-bell" : ""}`}
            />
          </IconButton>
          {newNotification && (
            <Box className="w-2 h-2 bg-primary linear-gradient absolute right-0.5 top-0.5 rounded-full" />
          )}
        </Box>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            rounded="md"
            p={0}
            className="bg-[#0f111af2] text-gray-50 border border-[#ffffff10] max-w-[320px]"
          >
            <Popover.Header p={0}>
              <Box className="flex items-center gap-4 p-4 border-b-[0.5px] border-[#ffffff10]">
                {filteredTabs.map((tab) => (
                  <Box
                    key={tab.id}
                    className={`text-sm transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? "text-primary"
                        : "text-gray-200 hover:text-gray-100"
                    }`}
                    onClick={() => dispatch(setActiveTab(tab.id))}
                  >
                    {tab.title}
                  </Box>
                ))}
              </Box>
            </Popover.Header>
            <Popover.Body
              p={0}
              className="max-h-[50vh] overflow-y-auto overscroll-contain"
            >
              <NotificationList
                notifications={notifications}
                loading={pending}
              />
            </Popover.Body>
            {notifications?.length >= 5 && !pending && (
              <Popover.Footer p={0}>
                <Box className="w-full p-2 border-t border-[#ffffff10]">
                  <Link
                    onClick={() => dispatch(setOpenNotification(false))}
                    href={`/nguoi-dung/thong-bao?tab=${activeTab}`}
                    className="text-sm hover:text-[#ffd875] text-gray-200 w-full h-full block p-2 text-center"
                  >
                    Xem tất cả
                  </Link>
                </Box>
              </Popover.Footer>
            )}
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default PopoverNotification;
