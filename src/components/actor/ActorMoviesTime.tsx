"use client";

import HoverOutlineWrapper from "@/components/shared/HoverOutlineWrapper";
import Image from "@/components/shared/Image";
import { THEMOVIEDB_IMAGE_URL } from "@/constants/env.contant";
import { formatString } from "@/lib/utils";
import Link from "next/link";

interface ActorMoviesTime {
  data: MoviesByActor[];
}

type ACC = Record<string, MoviesByActor[]>;

const ActorMoviesTime = ({ data }: ActorMoviesTime) => {
  const moviesByYear = data?.reduce((acc: ACC, movie) => {
    const date = movie?.first_air_date || movie?.release_date;
    const year = date?.split("-")?.[0] || date?.split("-")?.[0];

    if (!year) return acc;

    // Kiểm tra xem năm đã tồn tại trong acc chưa
    // Nếu chưa, khởi tạo một mảng mới cho năm đó
    if (!acc[year]) {
      acc[year] = [];
    }

    // Thêm phim vào mảng của năm tương ứng
    acc[year]?.push(movie);

    return acc;
  }, {});

  // Sắp xếp các năm theo thứ tự giảm dần
  const sortedYears = Object.keys(moviesByYear).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  return (
    <div className="flex flex-col gap-12">
      {sortedYears.map((year, index) => (
        <div
          key={index}
          style={{ justifyContent: "start" }}
          className="relative flex lg:flex-row flex-col items-start lg:-ml-10 lg:gap-0 gap-4"
        >
          <div className="relative z-[2] items-start flex-shrink-0 text-center w-20 lg:h-20 h-auto before:content-[''] before:w-[10px] before:h-[10px] before:rounded-full before:bg-[#FFD875] before:absolute lg:before:left-[-5px] before:left-0 lg:before:top-0 before:top-[7px]">
            <span className="lg:tracking-[3px] font-bold lg:absolute relative justify-end w-full h-full flex items-center lg:text-[40px] text-lg lg:opacity-20 lg:-rotate-90 text-gray-50">
              {year}
            </span>
          </div>
          <div className="flex-grow-1 w-full grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-5 grid-cols-2 lg:gap-x-4 gap-y-4 gap-x-2">
            {moviesByYear[year]?.map((movie, index: number) => (
              <Link
                key={index}
                href={`/thong-tin-phim/${formatString(
                  movie?.name || movie?.title || ""
                )}`}
              >
                <div
                  className="relative group transition-all hover:-translate-y-2"
                  key={index}
                >
                  <HoverOutlineWrapper rounded="lg" ringSize="2">
                    <div className="relative pt-[150%] h-0">
                      <Image
                        className="group-hover:brightness-75 rounded-lg transition-all"
                        src={`${THEMOVIEDB_IMAGE_URL}${movie?.poster_path}`}
                        alt={movie?.name || movie?.title || ""}
                      />
                    </div>
                  </HoverOutlineWrapper>
                  <div className="mt-2 text-center">
                    <h4 className="sm:text-sm text-xs text-gray-50 truncate font-semibold">
                      {movie?.name || movie?.title}
                    </h4>
                    <span className="text-xs text-gray-400 truncate block">
                      {movie?.original_name || movie?.original_title}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActorMoviesTime;
