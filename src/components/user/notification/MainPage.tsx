"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useState, useTransition } from "react";
import NotificationTabs from "./NotificationTabs";
import NotificationList from "@/components/user/notification/NotificationList";
import SeeMoreNotifications from "./SeeMoreNotifications";
import { getNotifications } from "@/lib/actions/notificationActionClient";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const MainPage = () => {
  const { data: sesstion } = useSession();
  const [pending, startTransition] = useTransition();
  const params = useSearchParams();
  const [hasMore, setHasMore] = useState(false);
  const [notifications, setNotifications] = useState<NotificationCustom[]>([]);
  const tab = params.get("tab") || "community";
  const activeTab =
    tab === "community" || tab === "individual" ? tab : "community";

  useEffect(() => {
    startTransition(async () => {
      const response = await getNotifications({
        limit: 5,
        type: sesstion ? activeTab : "community",
        userId: activeTab === "individual" ? sesstion?.user?.id : null,
      });

      setNotifications(response?.result?.items ?? []);
      setHasMore(response?.result?.has_more ?? false);
    });
  }, [activeTab]);

  return (
    <Box>
      <h3 className="text-lg text-gray-50">Thông báo</h3>
      <NotificationTabs />
      <Box className="bg-[#ffffff05] rounded-2xl mx-auto overflow-hidden">
        <NotificationList notifications={notifications} loading={pending} />
      </Box>
      {hasMore && !pending && (
        <SeeMoreNotifications
          setHasMore={setHasMore}
          notifications={notifications}
          setNotifications={setNotifications}
        />
      )}
    </Box>
  );
};

export default MainPage;
