"use client";

import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { FaHeart, FaPlus, FaUser } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { RiPlayListAddLine } from "react-icons/ri";

const menu = [
  {
    icon: <FaHeart />,
    label: "Yêu thích",
    link: "/nguoi-dung/yeu-thich",
  },
  {
    icon: <RiPlayListAddLine />,
    label: "Danh sách phát",
    link: "/nguoi-dung/danh-sach-phat",
  },
  {
    icon: <FaHistory />,
    label: "Lịch sử xem",
    link: "/nguoi-dung/lich-su-xem",
  },
  {
    icon: <FaUser />,
    label: "Tài khoản",
    link: "/nguoi-dung/tai-khoan",
  },
];

const SideBar = () => {
  const pathname = usePathname();

  return (
    <Box className="bg-[#25272f] xs:p-4 px-0 py-4 rounded-2xl w-full lg:max-h-[600px] lg:p-10 lg:w-72">
      <Box className="flex flex-col gap-6">
        <h4 className="text-center text-gray-50 text-lg lg:text-left">
          Quản lý tài khoản
        </h4>
        <ul className="flex flex-row justify-center gap-2 lg:flex-col lg:gap-1 lg:justify-start lg:mb-32 md:gap-4">
          {menu.map((item, index) => (
            <li key={index}>
              <Link
                href={item.link}
                className={`flex md:flex-row whitespace-nowrap flex-col gap-2 items-center lg:text-sm text-xs lg:py-4 lg:px-0 p-2 lg:border-b border-[#2e313a] hover:text-[#ffd875] transition-all
                    ${
                      pathname === item.link ? "text-[#ffd875]" : "text-gray-50"
                    }
                `}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Box className="flex-col gap-4 hidden lg:flex">
          <ProfileHeader />
          <Box
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex text-gray-50 text-sm cursor-pointer gap-2 hover:text-[#ffd875] items-center py-4 transition-all"
          >
            <FiLogOut />
            Đăng xuất
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
