"use client";

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from "@/components/ui/drawer";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { setIsOpenDrawer } from "@/store/slices/system.slice";
import { menu } from "../header/MenuBar";
import Link from "next/link";
import { FeatureStatus } from "@/configs/app.config";
import StatusTag from "@/components/shared/StatusTag";
import AccordionList from "./AccordionList";
import { categories, countries, movieCatalog } from "@/constants/movie.contant";

interface DrawerCustomProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerCustom = ({ isOpen, onClose }: DrawerCustomProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { data: session } = useSession();

  const isAuthenticated = session?.user?.accessToken ? true : false;

  const handleCloseDrawer = () => dispatch(setIsOpenDrawer(false));

  return (
    <DrawerRoot placement="start" open={isOpen} onOpenChange={onClose}>
      <DrawerBackdrop />

      <DrawerContent
        p={1}
        className="bg-[#2a314e] text-gray-50 border-r border-[#ffffff10]"
      >
        {session && (
          <DrawerHeader p={3}>
            <DrawerTitle>
              <ProfileHeader />
            </DrawerTitle>
          </DrawerHeader>
        )}
        <DrawerBody p={3}>
          <ul className="flex flex-col gap-1 h-full">
            {menu.map((item, index) => {
              if (item.path === "/xem-chung" && !isAuthenticated) return null;

              return (
                <li key={index} onClick={handleCloseDrawer}>
                  <Link
                    href={item.path}
                    className="text-sm flex gap-2 items-center p-2 w-full rounded-sm transition-all hover:bg-[#ffffff05]"
                  >
                    {item.name}
                    {item.status !== FeatureStatus.ACTIVE && (
                      <StatusTag text={item.status} bordered />
                    )}
                  </Link>
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
              items={categories.map((cat) => ({
                id: cat._id,
                name: cat.name,
                slug: cat.slug,
                _id: cat._id,
              }))}
              path="/chi-tiet/the-loai"
              callback={handleCloseDrawer}
            />
            <AccordionList
              label="Quốc gia"
              items={countries.map((country) => ({
                id: country._id,
                name: country.name,
                slug: country.slug,
                _id: country._id,
              }))}
              path="/chi-tiet/quoc-gia"
              callback={handleCloseDrawer}
            />
          </ul>
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default DrawerCustom;
