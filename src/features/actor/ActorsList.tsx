"use client";

import { Skeleton } from "@chakra-ui/react";
import { FaUsers } from "react-icons/fa6";
import Link from "next/link";
import { THEMOVIEDB_IMAGE_URL } from "@/lib/env";
import { decodeHtmlEntities } from "@/lib/utils";
import Image from "@/components/shared/Image";
import EmptyData from "@/components/shared/EmptyData";

interface ActorsListProps {
  items: any[];
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
        className={`mx-auto max-w-2xl h-48 bg-[#0003] rounded-2xl ${classNameEmpty}`}
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
          <Link
            key={index}
            href={`/dien-vien/${item?.id}?name=${decodeHtmlEntities(
              item?.name
            )}`}
          >
            <div className="relative group transition-all hover:-translate-y-2">
              <div className="h-0 relative pt-[150%]">
                {loading ? (
                  <Skeleton className="absolute inset-0 rounded-xl" />
                ) : (
                  <Image
                    src={`${THEMOVIEDB_IMAGE_URL}${item?.profile_path}`}
                    alt={item?.name}
                    className="group-hover:brightness-75 transition-all rounded-xl"
                    ref={null}
                  />
                )}
              </div>
              <div className="bg-gradient-to-t rounded-xl h-1/2 absolute z-[1] bottom-0 from-[#191b24] inset-x-0 to-transparent pointer-events-none css-0"></div>
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
