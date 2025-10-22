"use client";

import Image from "@/components/shared/Image";
import ShowMoreText from "@/components/shared/ShowMoreText";
import { TagClassic } from "@/components/shared/TagClassic";
import { generateUrlImage } from "@/lib/utils";
import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { RiArrowRightWideFill } from "react-icons/ri";
import TmdbRatingBadge from "../shared/TmdbRatingBadge";
import BadgeCustom from "../shared/BadgeCustom";
import DecodeText from "../shared/DecodeText";

interface SectionInfoProps {
  data: Movie | null;
}

const SectionInfo = ({ data }: SectionInfoProps) => {
  if (!data) return null;

  return (
    <Box className="flex-1">
      <Box className="flex flex-col gap-6">
        <Box className="flex gap-4">
          <Box className="flex-shrink-0 w-28 sm:block hidden">
            <Box className="h-0 pt-[150%] relative">
              <Image
                className="rounded-md"
                src={generateUrlImage(data?.poster_url)}
                alt={data?.name || "Không xác định"}
              />
            </Box>
          </Box>
          <Box className="flex flex-col gap-2">
            <DecodeText
              as="h4"
              text={data?.name || "Tên phim: N/A"}
              className="lg:text-2xl line-clamp-2 text-lg text-gray-50"
            />
            <DecodeText
              as="p"
              text={data?.origin_name || "Tên gốc: N/A"}
              className="text-primary text-sm line-clamp-1"
            />
            <Box className="flex flex-wrap gap-2 items-center">
              <TmdbRatingBadge rating={data?.tmdb?.vote_average} />
              <BadgeCustom text={data?.quality || "N/A"} />
              <BadgeCustom text={data?.year || "N/A"} />
              <BadgeCustom text={data?.time || "N/A"} />
              <BadgeCustom text={data?.episode_current || "N/A"} />
            </Box>
            <Box className="flex flex-wrap gap-2 items-center mt-1">
              {data?.categories?.map((category, index: number) => (
                <TagClassic
                  bordered={false}
                  key={index}
                  text={category?.name || "Thể loại: N/A"}
                  isRedirect
                  href={`/chi-tiet/the-loai/${category?.slug}`}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Box>
          <ShowMoreText
            text={data?.content as string}
            row={10}
            className="text-gray-400 text-sm text-justify"
          />
          <Link
            className="text-primary mt-4 text-sm gap-1 hover:underline inline-flex items-center"
            href={`/thong-tin-phim/${data?.slug}`}
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
