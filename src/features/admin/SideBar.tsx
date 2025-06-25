"use client";

import { useState } from "react";
import Link from "next/link";
import { FaCommentAlt, FaUser } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { TbMessageReportFilled } from "react-icons/tb";
import { IoMdNotifications } from "react-icons/io";
import { usePathname } from "next/navigation";
import ProfileHeader from "../../components/shared/ProfileHeader";
import { SiGoogleforms } from "react-icons/si";

const links = [
  { label: "Trang chủ", icon: <TiHome />, path: "/" },
  {
    label: "Quản lý người dùng",
    icon: <FaUser />,
    path: "/dashboard/user-management",
  },
  {
    label: "Quản lý phản hồi",
    icon: <FaCommentAlt />,
    path: "/dashboard/feedback-management",
  },
  {
    label: "Quản lý báo cáo",
    icon: <TbMessageReportFilled />,
    path: "/dashboard/report-management",
  },
  {
    label: "Quản lý thông báo",
    icon: <IoMdNotifications />,
    path: "/dashboard/notification-management",
  },
  {
    label: "Quản lý yêu cầu phim",
    icon: <SiGoogleforms />,
    path: "/dashboard/movie-request-management",
  },
];

const SideBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="sm:none fixed top-2 left-2 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-20 sm:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-[#282b3a] px-3 py-4 overflow-y-auto transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <ProfileHeader />

        <ul className="space-y-2 font-medium mt-6">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center p-2 text-gray-100 rounded-lg hover:bg-[#ffffff0f] group ${
                  pathname === link.path ? "bg-[#ffffff0f]" : ""
                }`}
              >
                {link.icon}
                <span className="flex-1 ms-3 whitespace-nowrap">
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
