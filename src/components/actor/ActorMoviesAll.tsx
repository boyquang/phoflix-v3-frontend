"use client";

import HoverOutlineWrapper from "@/components/shared/HoverOutlineWrapper";
import Image from "@/components/shared/Image";
import { THEMOVIEDB_IMAGE_URL } from "@/constants/env.contant";
import { formatString } from "@/lib/utils";
import Link from "next/link";

interface ActorMovieAllProps {
  data: MoviesByActor[];
}

const ActorMovieAll = ({ data }: ActorMovieAllProps) => {
  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-5 grid-cols-2 lg:lg:gap-x-4 gap-y-6 gap-x-2">
      {data?.map((item, index: number) => (
        <Link
          key={index}
          href={`/thong-tin-phim/${formatString(
            item?.name || item?.title || ""
          )}`}
        >
          <div className="relative group transition-all hover:-translate-y-2">
            <HoverOutlineWrapper rounded="lg" ringSize="2">
              <div className="relative pt-[150%] h-0">
                <Image
                  className="rounded-lg group-hover:brightness-75 transition-all"
                  src={`${THEMOVIEDB_IMAGE_URL}${item?.poster_path}`}
                  alt={item?.name || item?.title || ""}
                />
              </div>
            </HoverOutlineWrapper>
            <div className="mt-2 text-center">
              <h4 className=" sm:text-sm text-gray-50 truncate text-xs font-semibold">
                {item?.name || item?.title}
              </h4>
              <span className="text-gray-400 truncate text-xs block">
                {item?.original_name || item?.original_title}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ActorMovieAll;
