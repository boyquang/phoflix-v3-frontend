"use client";

import { Badge, Box, Button, useMediaQuery } from "@chakra-ui/react";
import Link from "next/link";
import { generateUrlImage } from "@/lib/utils";
import PlayIcon from "@/components/icons/PlayIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import OverlayFade from "@/components/shared/OverlayFade";
import Image from "@/components/shared/Image";
import { TagClassic } from "@/components/shared/TagClassic";
import { useRouter } from 'nextjs-toploader/app';
import DecodeText from "../shared/DecodeText";
import TmdbRatingBadge from "../shared/TmdbRatingBadge";
import BadgeCustom from "../shared/BadgeCustom";

interface SlideItemProps {
  item: Movie;
}

const SlideItem = ({ item }: SlideItemProps) => {
  const router = useRouter();
  const [isDesktop] = useMediaQuery(["(min-width: 1024px)"], {
    ssr: true,
    fallback: [true],
  });
  const href = isDesktop ? "#" : `/thong-tin-phim/${item?.slug}`;

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

      <Box
        onClick={() => {
          if (!isDesktop) {
            router.push(`/thong-tin-phim/${item?.slug}`);
          }
        }}
        className="absolute bottom-4 left-0 right-0 2xl:px-12 2xl:py-16 p-4 z-6 lg:w-[50%] overflow-hidden"
      >
        <DecodeText
          as="h4"
          text={item?.name}
          className="text-gradient-primary lg:text-4xl md:text-2xl font-semibold lg:inline-block line-clamp-2 block text-xl lg:text-left text-center mb-2"
        />
        <DecodeText
          as="p"
          text={item?.origin_name}
          className="text-primary lg:text-left text-center text-sm truncate"
        />
        <Box className="flex gap-2 items-center flex-wrap lg:justify-start justify-center mt-4">
          <TmdbRatingBadge rating={item?.tmdb?.vote_average} />
          <BadgeCustom
            className="bg-primary linear-gradient text-black"
            text={item?.quality || "Quality: N/A"}
          />
          <BadgeCustom
            size="xs"
            text={item?.episode_current || "Episode: N/A"}
          />
          <BadgeCustom size="xs" text={item?.year || "Year: N/A"} />
          <BadgeCustom size="xs" text={item?.time || "Time: N/A"} />
          {item?.lang?.split("+")?.map((lang, index) => (
            <BadgeCustom key={index} size="xs" text={lang} />
          ))}
        </Box>

        <Box className="lg:flex hidden flex-wrap gap-2 mt-2.5">
          {item?.categories?.map((caterogy, index: number) => (
            <TagClassic
              key={index}
              text={caterogy?.name || "Thể loại: N/A"}
              isRedirect
              href={`/chi-tiet/the-loai/${caterogy?.slug}`}
            />
          ))}
        </Box>

        <DecodeText
          as="p"
          text={item?.content || "Nội dung: N/A"}
          className="text-sm hidden text-white leading-6 lg:text-left text-center mt-6 my-4 lg:line-clamp-3"
        />

        <Box className="lg:flex hidden gap-4 items-center mt-6">
          <Link href={`/dang-xem/${item?.slug}`}>
            <Button
              size="lg"
              className="relative border-none duration-300 transition-all hover:scale-105 overflow-hidden rounded-lg bg-primary linear-gradient text-gray-900"
            >
              <PlayIcon />
              Xem ngay
            </Button>
          </Link>
          <Link href={`/thong-tin-phim/${item?.slug}`}>
            <Button
              size="lg"
              className="transition-all hover:scale-105 overflow-hidden bg-white text-black rounded-lg"
            >
              <InfoIcon />
              Chi tiết
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SlideItem;
