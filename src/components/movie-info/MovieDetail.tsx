"use client";

import Image from "@/components/shared/Image";
import { generateUrlImage } from "@/lib/utils";
import { Box, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import ShowMoreText from "@/components/shared/ShowMoreText";
import TextToSpeech from "@/components/shared/TextToSpeech";
import { TagClassic } from "@/components/shared/TagClassic";
import MoviePopular from "@/components/shared/MoviePopular";
import DecodeText from "../shared/DecodeText";
import { useSession } from "next-auth/react";
import MovieActionsDialog from "../admin/dashboard/movie-management/MovieActionsDialog";
import AddNewButton from "../shared/AddNewButton";
import { LuPencilLine } from "react-icons/lu";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import IconButtonAction from "../shared/IconButtonAction";
import AlertDialog from "../shared/AlertDialog";
import AdminMovieActions from "../admin/dashboard/movie-management/AdminMovieActions";
import TmdbRatingBadge from "../shared/TmdbRatingBadge";
import BadgeCustom from "../shared/BadgeCustom";

interface MovieDetailProps {
  data: Movie & { episodes: Episode[] };
}

const MovieDetail = ({ data }: MovieDetailProps) => {
  const { data: session } = useSession();

  const isAdmin = session?.user?.role === "admin";

  return (
    <Box className="flex flex-col h-full md:p-6 p-4 gap-2 items-center lg:backdrop-blur-lg lg:bg-[#191B24] xl:items-start xl:rounded-bl-4xl xl:rounded-tl-4xl xl:rounded-tr-4xl lg:rounded-tl-4xl lg:rounded-tr-4xl relative z-[10]">
      {isAdmin && <AdminMovieActions data={data} />}

      <Box className="w-40 mb-2">
        <Box className="h-0 pt-[150%] relative">
          <Image
            className="rounded-xl"
            src={generateUrlImage(data?.poster_url)}
            alt={data?.name || "Không xác định"}
          />
        </Box>
      </Box>

      <Box className="flex flex-col gap-2 xl:items-start items-center overflow-hidden">
        <DecodeText
          as="h4"
          text={data?.name || "Tên phim: N/A"}
          className="lg:text-2xl text-lg text-gray-50 font-semibold line-clamp-2 break-words lg:text-left text-center"
        />
        <DecodeText
          as="p"
          text={data?.origin_name || "Tên gốc: N/A"}
          className="text-[#ffd875] text-sm truncate-lines-2 lg:text-left text-center"
        />
        <Box className="flex flex-wrap gap-2 items-center sm:justify-start justify-center">
          <TmdbRatingBadge rating={data?.tmdb?.vote_average} />
          <BadgeCustom text={data?.quality || "N/A"} />
          <BadgeCustom text={data?.year || "N/A"} />
          <BadgeCustom text={data?.time || "N/A"} />
          <BadgeCustom text={data?.episode_current || "N/A"} />
        </Box>

        <Box className="flex flex-wrap gap-2 items-center mt-1">
          {data?.categories?.map((category, index: number) => (
            <TagClassic
              key={index}
              text={category?.name || "Thể loại: N/A"}
              isRedirect
              href={`/chi-tiet/the-loai/${category?.slug}`}
            />
          ))}
        </Box>
      </Box>

      <Box className="flex flex-col gap-4 mt-3 my-6 w-full">
        <Box className="flex flex-col text-sm gap-1">
          <Box className="flex items-center justify-between">
            <span className="text-gray-50 font-semibold">Giới thiệu:</span>
            <TextToSpeech
              lang="vi-VN"
              text={data?.content || "Không có mô tả"}
            />
          </Box>
          <ShowMoreText
            text={data?.content || "Không có mô tả"}
            row={10}
            className="text-gray-400 text-sm text-justify"
          />
        </Box>
        <Box className="flex text-sm gap-2">
          <span className="text-gray-50 font-semibold whitespace-nowrap">
            Đạo diễn:
          </span>
          {data?.actors?.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {data?.directors?.map((director, index: number) => (
                <li key={index} className="text-gray-400">
                  <DecodeText text={director} />
                  {index < data?.directors?.length - 1 && <span>,</span>}
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-400">N/A</span>
          )}
        </Box>
        <Box className="flex text-sm gap-2">
          <span className="text-gray-50 font-semibold whitespace-nowrap">
            Quốc gia:
          </span>
          {data?.countries?.length > 0 ? (
            <ul className="flex gap-2">
              {data?.countries?.map((country, index: number) => (
                <li
                  key={index}
                  className="text-gray-400 hover:text-[#ffd875] transition-all"
                >
                  <Link href={`/chi-tiet/quoc-gia/${country?.slug}`}>
                    <DecodeText text={country?.name} />
                    {index < data?.countries?.length - 1 && <span>,</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-400">N/A</span>
          )}
        </Box>
        <Box className="flex text-sm gap-2">
          <span className="text-gray-50 font-semibold whitespace-nowrap">
            Diễn viên:
          </span>
          {data?.actors?.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {data?.actors?.map((actor, index: number) => (
                <li key={index} className="text-gray-400">
                  <DecodeText text={actor} />
                  {index < data?.actors?.length - 1 && <span>,</span>}
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-400">N/A</span>
          )}
        </Box>
      </Box>

      <MoviePopular />
    </Box>
  );
};

export default MovieDetail;
