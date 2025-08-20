"use client";

import Image from "@/components/shared/Image";
import { generateUrlImage } from "@/lib/utils";
import { Box } from "@chakra-ui/react";
import Link from "next/link";
import ShowMoreText from "@/components/shared/ShowMoreText";
import TextToSpeech from "@/components/shared/TextToSpeech";
import { TagClassic } from "@/components/shared/TagClassic";
import MoviePopular from "@/components/shared/MoviePopular";
import DecodeText from "../shared/DecodeText";

interface MovieDetailProps {
  data: Movie;
}

const MovieDetail = ({ data }: MovieDetailProps) => {
  return (
    <Box className="flex flex-col h-full md:p-6 p-4 gap-2 items-center lg:backdrop-blur-lg lg:bg-[#191B24] xl:items-start xl:rounded-bl-4xl xl:rounded-tl-4xl xl:rounded-tr-4xl lg:rounded-tl-4xl lg:rounded-tr-4xl relative z-[10]">
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
        <h4 className="lg:text-2xl text-lg text-gray-50 font-semibold truncate-lines-2 break-words lg:text-left text-center">
          {data?.name || "Không xác định"}
        </h4>
        <p className="text-[#ffd875] text-sm truncate-lines-2 lg:text-left text-center">
          {data?.origin_name || "Không xác định"}
        </p>
        <Box className="flex flex-wrap gap-2 items-center sm:justify-start justify-center">
          <span className="bg-transparent border border-[#ffd875] h-6 justify-center p-1 rounded-md inline-flex items-center">
            <span className="text-[#ffd875] text-xs">TMDb</span>
            <span className="text-gray-50 text-sm ml-1">
              {Number(data?.tmdb?.vote_average).toFixed(1) || 0}
            </span>
          </span>
          <TagClassic text={data?.quality || "Không xác định"} />
          <TagClassic text={data?.year || "Không xác định"} />
          <TagClassic text={data?.lang || "Không xác định"} />
          <TagClassic text={data?.time || "Không xác định"} />
          <TagClassic text={data?.episode_current || "Không xác định"} />
        </Box>

        <Box className="flex flex-wrap gap-2 items-center mt-1">
          {data?.category?.map((category, index: number) => (
            <TagClassic
              key={index}
              text={category?.name || "Không xác định"}
              isRedirect
              href={`/chi-tiet/the-loai/${category?.slug}`}
            />
          ))}
        </Box>
      </Box>

      <Box className="flex flex-col gap-4 mt-3 my-6">
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
          <ul className="flex flex-wrap gap-2">
            {data?.director?.map((director, index: number) => (
              <li key={index} className="text-gray-400">
                <DecodeText text={director} />
                {index < data?.director?.length - 1 && <span>,</span>}
              </li>
            ))}
          </ul>
        </Box>
        <Box className="flex text-sm gap-2">
          <span className="text-gray-50 font-semibold whitespace-nowrap">
            Quốc gia:
          </span>
          <ul className="flex gap-2">
            {data?.country?.map((country, index: number) => (
              <li
                key={index}
                className="text-gray-400 hover:text-[#ffd875] transition-all"
              >
                <Link href={`/chi-tiet/quoc-gia/${country?.slug}`}>
                  <DecodeText text={country?.name} />
                  {index < data?.country?.length - 1 && <span>,</span>}
                </Link>
              </li>
            ))}
          </ul>
        </Box>
        <Box className="flex text-sm gap-2">
          <span className="text-gray-50 font-semibold whitespace-nowrap">
            Diễn viên:
          </span>
          <ul className="flex flex-wrap gap-2">
            {data?.actor?.map((actor, index: number) => (
              <li key={index} className="text-gray-400">
                <DecodeText text={actor} />
                {index < data?.actor?.length - 1 && <span>,</span>}
              </li>
            ))}
          </ul>
        </Box>
      </Box>

      <MoviePopular />
    </Box>
  );
};

export default MovieDetail;
