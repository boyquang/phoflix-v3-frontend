"use client";

import { createPortal } from "react-dom";
import { Box, Button, Image } from "@chakra-ui/react";
import { decodeHtmlEntities, generateUrlImage } from "@/lib/utils";
import { useState } from "react";
import { TagClassic } from "./TagClassic";
import Link from "next/link";
import PlayIcon from "../icons/PlayIcon";
import InfoIcon from "../icons/InfoIcon";

import "@/assets/css/animation.css";
interface MovieTooltipProps {
  data: Movie;
  position: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

const MovieTooltip = ({ data, position }: MovieTooltipProps) => {
  const [image, setImage] = useState<string>("/images/placeholder.jpg");

  return createPortal(
    <div
      style={{
        top: position.top,
        left: position.left,
        width: position.width,
        minHeight: position.height,
      }}
      className="bg-[#2f3346] rounded-xl shadow-lg text-white absolute overflow-hidden tooltip-animation z-50"
    >
      <div className="relative">
        <Image
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/images/notfound.png";
          }}
          src={image}
          onLoad={() => setImage(() => generateUrlImage(data?.thumb_url))}
          alt={data?.name}
          className="h-52 w-full object-cover rounded-xl"
        />
        <div className="bg-gradient-to-t h-1/2 absolute bottom-0 from-[#2f3346] inset-x-0 to-transparent"></div>
      </div>

      <Box className="bg-[#2f3346] h-full p-4">
        <h4 className="text-lg">{data?.name ?? "Không xác định"}</h4>
        <p className="text-[#ffd875] text-sm">
          {decodeHtmlEntities(data?.origin_name) || "Không xác định"}
        </p>
        <Box className="flex gap-4 items-center mb-4 mt-2">
          <Link href={`/dang-xem/${data?.slug}`}>
            <Button
              size="sm"
              className="relative overflow-hidden shadow-primary transition-all  bg-primary linear-gradient border-none text-gray-900"
            >
              <PlayIcon />
              Xem ngay
            </Button>
          </Link>
          <Link href={`/thong-tin-phim/${data?.slug}`}>
            <Button
              size="sm"
              colorPalette="gray"
              colorScheme="gray"
              variant="subtle"
              className=" transition-all shadow-sub"
            >
              <InfoIcon />
              Chi tiết
            </Button>
          </Link>
        </Box>
        <Box className="flex flex-wrap gap-2 items-center">
          <TagClassic text={data?.quality || "Không xác định"} />
          <TagClassic text={data?.year || "Không xác định"} />
          <TagClassic text={data?.lang || "Không xác định"} />
          <TagClassic text={data?.time || "Không xác định"} />
          <TagClassic text={data?.episode_current || "Không xác định"} />
        </Box>
        <Box className="flex flex-wrap gap-2 items-center mt-3">
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
    </div>,
    document.body
  );
};

export default MovieTooltip;
