"use client";

import { useState } from "react";
import Link from "next/link";
import CategoryAndCountryList from "./CategoryAndCountryList";
import { categories, countries } from "@/constants/movie.contant";
import { usePathname } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import { useSession } from "next-auth/react";
import MovieCatalog from "./MovieCatalog";
import StatusTag from "@/components/shared/StatusTag";
import { appConfig, FeatureStatus } from "@/configs/app.config";

const { watchingTogether, advancedFilter } = appConfig.feature;

export const menu = [
  { name: "Trang chủ", path: "/", status: "active" },
  {
    name: "Lọc nâng cao",
    path: "/loc-nang-cao",
    status: advancedFilter.status,
  },
  {
    name: "Phòng xem chung",
    path: "/phong-xem-chung",
    status: watchingTogether.status,
  },
  { name: "Diễn viên", path: "/dien-vien", status: "active" },
];

const MenuBar = () => {
  const { data: session } = useSession();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const isAuthenticated = session?.user?.accessToken ? true : false;

  return (
    <ul className="text-gray-50 gap-2 items-center xl:flex hidden relative z-50">
      {menu.map((item, index) => {
        if (item.path === "/phong-xem-chung" && !isAuthenticated) return null;

        return (
          <li
            key={index}
            className=" items-center relative inline-flex text-white 
                after:content-[''] after:absolute after:left-1/2 after:bottom-0 
                after:h-[2px] after:w-0 after:bg-[#ffd875]
                after:transition-all after:duration-300 hover:text-[#ffd875]
                after:-translate-x-1/2 
                hover:after:w-full"
          >
            <Link
              href={item.path}
              className={`p-2 text-sm relative ${
                pathname === item.path ? "text-[#ffd875]" : ""
              }`}
            >
              {item.name}
            </Link>
            {item.status !== FeatureStatus.ACTIVE && (
              <StatusTag text={item.status} bordered />
            )}
          </li>
        );
      })}

      <li
        className={`flex p-2 text-sm cursor-pointer gap-1 items-center relative ${
          openDropdown === "catalog" ? "text-primary transition-all" : ""
        }`}
        onMouseEnter={() => setOpenDropdown("catalog")}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <span>Danh mục</span>
        <IoIosArrowDown
          className={`${
            openDropdown === "catalog"
              ? "-rotate-90 transition-transform duration-300"
              : ""
          }`}
        />
        <MovieCatalog isOpen={openDropdown === "catalog"} />
      </li>

      <li
        className={`flex p-2 text-sm cursor-pointer gap-1 items-center relative ${
          openDropdown === "country" ? "text-primary transition-all" : ""
        }`}
        onMouseEnter={() => setOpenDropdown("country")}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <span>Quốc gia</span>
        <IoIosArrowDown
          className={`${
            openDropdown === "country"
              ? "-rotate-90 transition-transform duration-300"
              : ""
          }`}
        />
        <CategoryAndCountryList
          data={countries}
          type="quoc-gia"
          isOpen={openDropdown === "country"}
        />
      </li>

      <li
        className={`flex p-2 text-sm cursor-pointer gap-1 items-center relative ${
          openDropdown === "category" ? "text-primary transition-all" : ""
        }`}
        onMouseEnter={() => setOpenDropdown("category")}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <span>Thể loại</span>
        <IoIosArrowDown
          className={`${
            openDropdown === "category"
              ? "-rotate-90 transition-transform duration-300"
              : ""
          }`}
        />
        <CategoryAndCountryList
          data={categories}
          type="the-loai"
          isOpen={openDropdown === "category"}
        />
      </li>
    </ul>
  );
};

export default MenuBar;
