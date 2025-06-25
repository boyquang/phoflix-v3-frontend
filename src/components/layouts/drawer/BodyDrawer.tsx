"use client";

import Link from "next/link";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { setIsOpenDrawer } from "@/store/slices/systemSlice";
import AccordionList from "./AccordionList";
import { categories, countries, movieCatalog } from "@/constants/movie";
import { useSession } from "next-auth/react";
import { menu } from "../header/MenuBar";
import StatusTag from "@/components/shared/StatusTag";
import { FeatureStatus } from "@/configs/appConfig";

const BodyDrawer = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data: session }: any = useSession();

  const isAuthenticated = session?.user?.accessToken ? true : false;

  const handleCloseDrawer = () => dispatch(setIsOpenDrawer(false));

  return (
    <ul className="flex flex-col gap-1 h-full">
      {menu.map((item, index) => {
        if (item.path === "/community-room" && !isAuthenticated) return null;

        return (
          <li
            key={index}
            onClick={handleCloseDrawer}
            className="flex items-center"
          >
            <Link
              href={item.path}
              className="text-sm p-2 rounded-sm transition-all hover:bg-[#ffffff05] block"
            >
              {item.name}
            </Link>

            {item.status !== FeatureStatus.ACTIVE && (
              <StatusTag text={item.status} bordered />
            )}
          </li>
        );
      })}

      <AccordionList
        label="Danh mục"
        items={movieCatalog}
        path="/chi-tiet/danh-sach"
        callback={handleCloseDrawer}
      />

      <AccordionList
        label="Thể loại"
        items={categories}
        path="/chi-tiet/the-loai"
        callback={handleCloseDrawer}
      />
      <AccordionList
        label="Quốc gia"
        items={countries}
        path="/chi-tiet/quoc-gia"
        callback={handleCloseDrawer}
      />
    </ul>
  );
};

export default BodyDrawer;
