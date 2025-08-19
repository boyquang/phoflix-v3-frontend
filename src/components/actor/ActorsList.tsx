"use client";

import { Skeleton } from "@chakra-ui/react";
import { FaUsers } from "react-icons/fa6";
import Link from "next/link";
import { THEMOVIEDB_IMAGE_URL } from "@/constants/env.contant";
import Image from "@/components/shared/Image";
import EmptyData from "@/components/shared/EmptyData";
import HoverOutlineWrapper from "@/components/shared/HoverOutlineWrapper";

interface ActorsListProps {
  items: Actor[];
  classNameGrids?: string;
  loading?: boolean;
  showTitle?: boolean;
  classNameEmpty?: string;
}

const ActorsList = ({
  items,
  loading,
  classNameGrids,
  classNameEmpty,
  showTitle = true,
}: ActorsListProps) => {
  if (!items || items?.length === 0) {
    return (
      <EmptyData
        className={`h-48 bg-[#0003] rounded-2xl ${classNameEmpty}`}
        icon={<FaUsers />}
        title="Đang cập nhật"
        description="Hiện chưa có dữ liệu về diễn viên. Vui lòng quay lại sau nhé!"
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {showTitle && (
        <h4 className="lg:text-2xl text-lg text-gray-50">Diễn viên</h4>
      )}
      <div className={`${classNameGrids}`}>
        {items?.map((item, index: number) => (
          <Link key={index} href={`/dien-vien/${item?.id}`}>
            <div className="relative group transition-all hover:-translate-y-2">
              <HoverOutlineWrapper rounded="lg" ringSize="2">
                <div
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(180deg, black 0, transparent 80%)",
                    maskImage:
                      "linear-gradient(180deg, black 0, transparent 80%)",
                  }}
                  className="h-0 relative pt-[150%]"
                >
                  {loading ? (
                    <Skeleton className="absolute inset-0 rounded-xl" />
                  ) : (
                    <Image
                      src={`${THEMOVIEDB_IMAGE_URL}${item?.profile_path}`}
                      alt={item?.name}
                      className="group-hover:brightness-75 transition-all rounded-lg"
                      ref={null}
                    />
                  )}
                </div>
              </HoverOutlineWrapper>
              <div className="absolute bottom-0 left-0 right-0 z-[2] p-2 text-center rounded-xl">
                <h6 className="text-primary text-sm truncate">{item?.name}</h6>
                <p className="text-gray-200 text-xs truncate">
                  {item?.original_name}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ActorsList;
