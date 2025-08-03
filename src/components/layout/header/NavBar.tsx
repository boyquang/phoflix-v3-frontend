"use client";

import { Box } from "@chakra-ui/react";
import Link from "next/link";
import AuthButton from "./AuthButton";
import MenuBar from "./MenuBar";
import BarButton from "./BarButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { SkeletonCircle } from "@/components/ui/skeleton";
import PopoverUser from "./PopoverUser";
import PopoverNotification from "./PopoverNotification";
import SearchDialog from "@/components/search/SearchDialog";
import { usePathname } from "next/navigation";
import { appConfig } from "@/configs/app.config";
import PopoverSetting from "./PopoverSetting";

const { appName } = appConfig;

const NavBar = () => {
  const { isVisiable, lastScrollY } = useSelector(
    (state: RootState) => state.system
  );
  const { status } = useSession();
  const pathname = usePathname();

  if (pathname.includes("/dashboard")) return null;

  return (
    <header
      className={`flex items-center justify-between fixed left-0 right-0 top-0 z-50 h-14 
        bg-transparent max-w-[1900px] mx-auto 2xl:px-12 px-4 transition-all 
        ${isVisiable ? "translate-y-0" : "-translate-y-full"} 
        ${lastScrollY > 0 ? "backdrop-blur" : ""}`}
    >
      <Box className="flex items-center gap-6">
        <BarButton />
        <Link
          href="/"
          className="font-bold lg:text-lg text-sm xs:flex hidden flex-col"
        >
          <span className="text-gradient">{appName}</span>
        </Link>
        <MenuBar />
      </Box>
      <Box className="flex items-center gap-4">
        <SearchDialog />
        <PopoverNotification />
        <PopoverSetting />
        {status === "loading" && <SkeletonCircle size="9" />}
        {status === "unauthenticated" && <AuthButton />}
        {status === "authenticated" && <PopoverUser />}
      </Box>
    </header>
  );
};

export default NavBar;
