"use client";

import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { generateUrlImage } from "@/lib/utils";
import PlayIcon from "@/components/icons/PlayIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import OverlayFade from "@/components/shared/OverlayFade";
import Image from "@/components/shared/Image";
import { TagClassic } from "@/components/shared/TagClassic";

interface SlideItemProps {
  item: SlideItem;
}

const SlideItem = ({ item }: SlideItemProps) => {
  const { windowWidth } = useSelector((state: RootState) => state.system);
  const href = windowWidth > 1024 ? "#" : `/thong-tin-phim/${item?.slug}`;

  return (
    <Box className="relative max-w-[1900px] mx-auto border border-[#191b24] overflow-hidden">
      <OverlayFade />
      <Box className="lg:before:absolute lg:before:inset-0 lg:before:bg-[url('/images/dotted.png')] lg:before:bg-repeat lg:before:opacity-20 lg:before:z-[2]">
        <Link
          href={href}
          className="relative h-0 xl:pt-[42%] lg:pt-[44%] md:pt-[50%] pt-[80%] overflow-hidden block"
        >
          <Image
            src={generateUrlImage(item?.thumb_url)}
            alt={item?.name || "Không xác định"}
          />
        </Link>
      </Box>

      <Box className="absolute bottom-4 left-0 right-0 2xl:px-12 xl:pb-20 p-4 z-6 lg:w-[50%] overflow-hidden">
        <h4 className="title-text lg:text-4xl md:text-2xl font-semibold lg:inline-block truncate-lines-2 block text-xl lg:text-left text-center mb-1">
          {item?.name || "Không xác định"}
        </h4>
        <h6 className="text-primary lg:text-left text-center text-sm truncate">
          {item?.origin_name || "Không xác định"}
        </h6>
        <Box className="flex gap-2 items-center flex-wrap lg:justify-start justify-center mt-3">
          <TagClassic text={item?.quality || "Không xác định"} />
          <TagClassic text={item?.year || "Không xác định"} />
          <TagClassic text={item?.lang || "Không xác định"} />
          <TagClassic text={item?.time || "Không xác định"} />
          <TagClassic text={item?.episode_current || "Không xác định"} />
        </Box>
        {windowWidth > 1024 && (
          <>
            <Box className="flex flex-wrap gap-2 mt-2">
              {item?.category?.map((caterogy, index: number) => (
                <TagClassic
                  key={index}
                  text={caterogy?.name || "Không xác định"}
                  isRedirect
                  href={`/chi-tiet/the-loai/${caterogy?.slug}`}
                />
              ))}
            </Box>
            <Box className="flex gap-4 items-center mt-6">
              <Link href={`/dang-xem/${item?.slug}`}>
                <Button
                  size="lg"
                  className="relative border-none duration-300 transition-all overflow-hidden shadow-primary bg-primary linear-gradient text-gray-900"
                >
                  <PlayIcon />
                  Xem ngay
                </Button>
              </Link>
              <Link href={`/thong-tin-phim/${item?.slug}`}>
                <Button
                  size="lg"
                  colorPalette="gray"
                  colorScheme="gray"
                  variant="subtle"
                  className="transition-all shadow-sub"
                >
                  <InfoIcon />
                  Chi tiết
                </Button>
              </Link>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SlideItem;
