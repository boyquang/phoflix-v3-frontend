"use client";

import Image from "@/components/shared/Image";
import { THEMOVIEDB_IMAGE_URL } from "@/lib/env";
import { formatString } from "@/lib/utils";
import Link from "next/link";

interface ActorMovieAllProps {
  data: any;
}

const ActorMovieAll = ({ data }: ActorMovieAllProps) => {
  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-5 grid-cols-3 lg:lg:gap-x-4 gap-y-6 gap-x-2">
      {data?.map((item: any, index: number) => (
        <Link
          key={index}
          href={`/thong-tin-phim/${formatString(item?.name || item?.title)}`}
        >
          <div className="relative group transition-all hover:-translate-y-2">
            <div className="relative pt-[150%] h-0 rounded-2xl overflow-hidden">
              <Image
                className="group-hover:brightness-75 transition-all"
                src={`${THEMOVIEDB_IMAGE_URL}${item?.poster_path}`}
                alt={item?.name}
              />
            </div>
            <div className="mt-2 text-center">
              <h4 className=" sm:text-sm text-gray-50 truncate text-xs">
                {item?.name || item?.title}
              </h4>
              <p className="text-gray-400 truncate text-xs">
                {item?.original_name || item?.original_title}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ActorMovieAll;
