"use client";

import Image from "@/components/shared/Image";
import ShowMoreText from "@/components/shared/ShowMoreText";
import { TagClassic } from "@/components/shared/TagClassic";
import { formatStringForURL, generateUrlImage } from "@/lib/utils";
import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { RiArrowRightWideFill } from "react-icons/ri";

interface SectionInfoProps {
  data: any;
}

const SectionInfo = ({ data }: SectionInfoProps) => {
  return (
    <Box className="flex-1">
      <Box className="flex flex-col gap-6">
        <Box className="flex gap-4">
          <Box className="flex-shrink-0 w-28 sm:block hidden">
            <Box className="h-0 pt-[150%] relative">
              <Image
                className="rounded-xl"
                src={generateUrlImage(data?.poster_url)}
                alt={data?.name || "Không xác định"}
              />
            </Box>
          </Box>
          <Box className="flex flex-col gap-2">
            <h4 className="lg:text-2xl truncate-lines three text-lg text-gray-50 font-semibold">
              {data?.name || "Không xác định"}
            </h4>
            <p className="text-[#ffd875] text-sm">
              {data?.origin_name || "Không xác định"}
            </p>
            <Box className="flex flex-wrap gap-2 items-center">
              <span className="bg-transparent border border-[#ffd875] h-6 justify-center p-1 rounded-md inline-flex items-center">
                <span className="text-[#ffd875] text-xs">TMDb</span>
                <span className="text-gray-50 text-sm ml-1">
                  {Number(data?.tmdb?.vote_average).toFixed(2) || 0}
                </span>
              </span>
              <TagClassic text={data?.quality || "Không xác định"} />
              <TagClassic text={data?.year || "Không xác định"} />
              <TagClassic text={data?.lang || "Không xác định"} />
              <TagClassic text={data?.time || "Không xác định"} />
              <TagClassic text={data?.episode_current || "Không xác định"} />
            </Box>
            <Box className="flex flex-wrap gap-2 items-center mt-1">
              {data?.category?.map((category: any, index: number) => (
                <TagClassic
                  key={index}
                  text={category?.name || "Không xác định"}
                  isRedirect
                  href={`/chi-tiet/the-loai/${category?.slug}`}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Box>
          <ShowMoreText
            text={data?.content}
            row={10}
            className="text-gray-400 text-sm text-justify"
          />
          <Link
            className="text-[#ffd875] mt-4 text-sm gap-1 hover:underline inline-flex items-center"
            href={`/thong-tin-phim/${data?.slug}?name=${formatStringForURL(
              data?.name,
              "-"
            )}`}
          >
            Thông tin phim
            <RiArrowRightWideFill />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SectionInfo;
