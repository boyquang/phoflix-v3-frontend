"use client";

import { changeQuery, getIdFromLinkEmbed, scrollToTop } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import Image from "../shared/Image";
import { Button } from "@chakra-ui/react";
import { setCurrentEpisode } from "@/store/slices/movie.slice";
import { useRouter } from "next/navigation";

interface MovieVersionListProps {
  redirect?: boolean;
  classNameGrid?: string;
}

const backgroundColor = {
  vietsub: "bg-[#3E435C]",
  "thuyet-minh": "bg-[#297447]",
  "long-tieng": "bg-[#1d2e79]",
};

const icon = {
  vietsub: "/icons/vietsub.svg",
  "thuyet-minh": "/icons/thuyet-minh.svg",
  "long-tieng": "/icons/long-tieng.svg",
};

const MovieVersionList = ({
  redirect = true,
  classNameGrid,
}: MovieVersionListProps) => {
  const { groups } = useSelector((state: RootState) => state.movie.episode);
  const { movie, currentEpisode } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleChangeVerion = (
    version: EpisodeMerged,
    language: "vietsub" | "thuyet-minh" | "long-tieng"
  ) => {
    if (!redirect) {
      const id = getIdFromLinkEmbed(version.link_embed, 8);
      const newQuery = [
        { key: "id", value: id },
        { key: "language", value: language },
      ];

      // Cập nhật thông tin bản chiếu hiện tại
      dispatch(setCurrentEpisode(version));
      // Cập nhật url query
      changeQuery(newQuery);
      // Cuộn lên đầu trang
      scrollToTop();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="lg:text-2xl text-lg text-gray-50">Các bản chiếu</h4>
      <div
        className={`grid gap-4 ${
          classNameGrid
            ? classNameGrid
            : "lg:grid-cols-3 md:grid-cols-3 xs:grid-cols-2 grid-cols-1"
        } `}
      >
        {(Object.keys(groups) as languageType[])?.map((language) => {
          const version = groups[language]?.items?.[0] || null;
          if (!version) return null;

          const label = groups[language]?.label;
          const id =
            getIdFromLinkEmbed(version?.link_embed, 8) || "error-link-embed";
          const queryParams = `id=${id}&language=${language}`;
          const href = `/dang-xem/${movie?.slug}?${queryParams}`;
          const isCurrent = currentEpisode?.link_embed === version?.link_embed;

          return (
            <div
              onClick={() => {
                if (redirect) {
                  router.push(href);
                }
                handleChangeVerion(
                  version,
                  language as "vietsub" | "thuyet-minh" | "long-tieng"
                );
              }}
              key={language}
              className={`relative border-2 rounded-xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 
                ${backgroundColor[language]}  
                ${
                  isCurrent && !redirect
                    ? "border-primary cursor-default"
                    : "border-transparent cursor-pointer"
                }
              `}
            >
              <div className="absolute w-[40%] fade-right-mask top-0 right-0 bottom-0 max-w-[130px]">
                <Image
                  src={movie?.poster_url || "/images/notfound.png"}
                  alt={movie?.name || "Không xác định"}
                  className="rounded-none"
                />
              </div>
              <div className="relative z-10 w-[90%] p-6 flex flex-col items-start justify-center gap-4">
                <div className="flex items-center gap-1 text-sm text-gray-50">
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-5 relative">
                      <Image
                        src={icon[language as languageType]}
                        alt={language}
                      />
                    </div>
                    <span>{label}</span>
                  </div>
                </div>
                <h4 className="max-w-[90%] truncate-lines-2 text-[1rem] text-gray-50 font-semibold">
                  {movie?.name}
                </h4>
                <Button size="xs" className="rounded-md bg-white text-black">
                  {currentEpisode?.link_embed === version?.link_embed
                    ? "Đang xem"
                    : "Xem bản này"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieVersionList;
