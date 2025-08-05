"use client";

import { Box } from "@chakra-ui/react";
import NavBar from "./layout/header/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  setIsOpenDrawer,
  setIsShowAuthDialog,
  setWidth,
} from "@/store/slices/system.slice";
import { useEffect } from "react";
import DrawerCustom from "./layout/drawer/DrawerCustom";
import { Toaster } from "./ui/toaster";
import Footer from "./layout/Footer";
import AuthDialog from "./auth/AuthDialog";
import ScrollToTopButton from "./shared/ScrollToTopButton";
import { usePathname } from "next/navigation";
import { setHasLeftRoom } from "@/store/slices/watching-together.slice";
import useCheckSessionStatus from "@/hooks/useCheckSessionStatus";
import useResize from "@/hooks/useReszie";
import useScroll from "@/hooks/useScroll";
import NotificationSound from "./shared/NotificationSound";
import useSocketShowNotification from "@/hooks/useSocketShowNotification";
import SnowEffect from "./effects/SnowEffect";
import dynamic from "next/dynamic";
import GoToSleepAnimation from "./warn-user/repose/GoToSleepAnimation";
import ChatBotDialog from "./chat-bot/ChatBotDialog";
import { auth } from "@/auth";
import { signOut } from "next-auth/react";

const ReposeUserAlert = dynamic(
  () => import("./warn-user/repose/ReposeUserAlert"),
  {
    ssr: false,
  }
);

const App = ({ children }: { children: React.ReactNode }) => {
  const { isOpenDrawer, isShowAuthDialog, typeAuth, reboot } = useSelector(
    (state: RootState) => state.system
  );
  const dispatch: AppDispatch = useDispatch();
  const pathname = usePathname();

  // useEffect(() => {
  //   if (reboot.status) {
  //     signOut({
  //       callbackUrl: window.location.href,
  //     });
  //   }
  // }, [reboot.status]);

  // Kiểm tra trạng thái phiên đăng nhập
  useCheckSessionStatus();

  // Xử lý khi người dùng resize lại cửa sổ
  useResize();

  // Xử lý khi người dùng cuộn trang
  useScroll();

  // Hiển thị thông báo
  useSocketShowNotification();

  useEffect(() => {
    dispatch(setWidth(window.innerWidth));
  }, []);

  useEffect(() => {
    // Làm mới lại trạng thái khi người dùng rời khỏi phòng
    if (!pathname.includes("/phong-xem-chung")) {
      dispatch(setHasLeftRoom(false));
    }

    // Dừng đọc văn bản nếu đang nói
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
  }, [pathname]);

  return (
    <Box>
      <NavBar />
      {children}
      <Footer />

      <NotificationSound />

      <DrawerCustom
        isOpen={isOpenDrawer}
        onClose={() => dispatch(setIsOpenDrawer(false))}
      />

      <ReposeUserAlert />

      <GoToSleepAnimation />

      <AuthDialog
        isOpen={isShowAuthDialog}
        type={typeAuth}
        onClose={() => dispatch(setIsShowAuthDialog(false))}
      />

      <Toaster />

      <SnowEffect />

      <Box className="focus-backdrop" />

      <div className="fixed z-[99] flex flex-col gap-4 right-4 bottom-4">
        <ScrollToTopButton />
        <ChatBotDialog />
      </div>
    </Box>
  );
};

export default App;
