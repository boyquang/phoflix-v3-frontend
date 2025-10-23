"use client";

import { Box, Popover, Portal } from "@chakra-ui/react";
import AvatarUser from "./AvatarUser";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaHeart, FaPlus, FaUser } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { appConfig, FeatureStatus } from "@/configs/app.config";
import StatusTag from "@/components/shared/StatusTag";
import { SiGoogleforms } from "react-icons/si";
import { RiPlayListAddLine } from "react-icons/ri";
import { usePathname } from "next/navigation";

let menu = [
  {
    icon: <FaHeart />,
    title: "Yêu thích",
    link: "/nguoi-dung/yeu-thich",
    status:
      appConfig.pages["/nguoi-dung/yeu-thich"]?.status || FeatureStatus.ACTIVE,
  },
  {
    icon: <RiPlayListAddLine />,
    title: "Danh sách phát",
    link: "/nguoi-dung/danh-sach-phat",
    status:
      appConfig.pages["/nguoi-dung/danh-sach-phat"]?.status ||
      FeatureStatus.ACTIVE,
  },
  {
    icon: <FaHistory />,
    title: "Lịch sử xem",
    link: "/nguoi-dung/lich-su-xem",
    status:
      appConfig.pages["/nguoi-dung/lich-su-xem"]?.status ||
      FeatureStatus.ACTIVE,
  },
  {
    icon: <FaUser />,
    title: "Tài khoản",
    link: "/nguoi-dung/tai-khoan",
    status:
      appConfig.pages["/nguoi-dung/tai-khoan"]?.status || FeatureStatus.ACTIVE,
  },
  {
    icon: <SiGoogleforms />,
    title: "Yêu cầu phim",
    link: "/nguoi-dung/yeu-cau-phim",
    status:
      appConfig.pages["/nguoi-dung/yeu-cau-phim"]?.status ||
      FeatureStatus.ACTIVE,
  },
  {
    icon: <BsFillGridFill />,
    title: "Bảng điều khiển",
    link: "/dashboard/user-management",
    status:
      appConfig.pages["/dashboard/user-management"]?.status ||
      FeatureStatus.ACTIVE,
  },
];

const PopoverUser = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [loadingSignOut, setLoadingSignOut] = useState(false);

  // Chỉ hiển thị bảng điều khiển cho admin
  if (session?.user?.role === "member") {
    menu = menu.filter((item) => item.link !== "/dashboard/user-management");
  }

  const handleSignOut = async () => {
    setLoadingSignOut(true);
    try {
      await signOut({ callbackUrl: window.location.href });
    } catch (error) {
      setLoadingSignOut(false);
    }
  };

  return (
    <Popover.Root
      size="xs"
      autoFocus={false}
      open={open}
      onOpenChange={({ open }) => setOpen(open)}
    >
      <Popover.Trigger asChild>
        <Box className="cursor-pointer">
          <AvatarUser
            name={session?.user?.username as string}
            src={session?.user?.image as string}
          />
        </Box>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            rounded="md"
            p={0}
            className="bg-[#0f111af2] text-gray-50 border border-[#ffffff10]"
          >
            <Popover.Header p={0}>
              <Box className="p-4 border-b-[0.5px] border-[#ffffff10]">
                <ProfileHeader />
              </Box>
            </Popover.Header>
            <Popover.Body
              p={0}
              className="max-h-[50vh] overflow-y-auto overscroll-contain"
            >
              <ul className="py-2 flex flex-col">
                {menu.map((item, index) => (
                  <li
                    className={`${
                      item.link === pathname
                        ? "bg-[#ffffff05] text-primary"
                        : "text-white"
                    }`}
                    key={index}
                    onClick={() => setOpen(false)}
                  >
                    <Link
                      href={item.link}
                      className="px-4 py-2.5 flex-1 transition-all hover:bg-[#ffffff05] flex gap-2 items-center truncate"
                    >
                      {item.icon}
                      {item.title}
                      {item.status !== FeatureStatus.ACTIVE && (
                        <StatusTag text={item.status} bordered />
                      )}
                    </Link>
                  </li>
                ))}

                <Box className="w-full h-[0.5px] bg-[#ffffff10]" />

                <li>
                  <Box
                    onClick={handleSignOut}
                    className={`px-4 cursor-pointer py-2 transition-all hover:bg-[#ffffff05] flex gap-2 items-center truncate ${
                      loadingSignOut ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    <FiLogOut />
                    Đăng xuất
                  </Box>
                </li>
              </ul>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default PopoverUser;
