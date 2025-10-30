"use client";

import { useEffect, useRef, useState } from "react";
import { fetchMovieDetail } from "@/lib/actions/movie.action";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from "../shared/Image";
import { generateUrlImage } from "@/lib/utils";
import DecodeText from "../shared/DecodeText";
import TmdbRatingBadge from "../shared/TmdbRatingBadge";
import BadgeCustom from "../shared/BadgeCustom";
import { TagClassic } from "../shared/TagClassic";
import Link from "next/link";
import { Button } from "@chakra-ui/react";
import PlayIcon from "../icons/PlayIcon";
import InfoIcon from "../icons/InfoIcon";
import SeeMoreLink from "./SeeMoreLink";

interface MovieBannerProps {
  describe: "danh-sach" | "the-loai" | "quoc-gia";
  type: Countries | Categories | DescribeType;
  title?: string;
  limit?: number;
}

const MovieBanner = ({ type, describe, title, limit }: MovieBannerProps) => {
  const [items, setItems] = useState<Movie[] | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const response = await fetchMovieDetail(describe, type, 1, 10);
        setItems(response.items || []);
      } catch (error) {
        console.error("Error fetching top movies:", error);
      }
    };

    fetchTopMovies();
  }, [type, describe, limit]);

  if (!items || items?.length === 0) return null;

  return (
    <div className="2xl:px-0 px-4 pb-12">
      <div className="flex items-center gap-4 mb-6">
        <h4 className="lg:text-2xl md:flex-grow-0 flex-grow-1 capitalize md:text-xl text-md text-white font-semibold mb-1">
          {title}
        </h4>
        <SeeMoreLink title="Xem thêm" link={`/chi-tiet/${describe}/${type}`} />
      </div>
      <div className="w-full relative">
        <Swiper
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(s) =>
            setActiveIndex(s.realIndex ?? s.activeIndex ?? 0)
          }
          slidesPerView={1}
          modules={[Autoplay, EffectFade]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          grabCursor={true}
          effect="fade"
          loop={items?.length > 1}
          className="w-full relative"
        >
          {items?.map((item, index: number) => (
            <SwiperSlide className="h-full" key={index}>
              <MovieItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          aria-hidden={items.length === 0}
          className="pointer-events-auto absolute left-1/2 lg:-bottom-16 -bottom-8 -translate-x-1/2 z-50 flex gap-2 lg:items-end items-center lg:w-auto w-full lg:justify-baseline justify-center"
        >
          <div className="flex lg:gap-4 gap-2 bg-transparent p-1 rounded-md">
            {items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  const s = swiperRef.current;
                  if (s && typeof s.slideTo === "function") {
                    s.slideToLoop(idx);
                  }
                }}
                className={`lg:w-20 cursor-pointer lg:hover:border-white lg:hover:shadow-[0_0_0_3px_rgba(255,255,255,0.06)] lg:rounded-lg rounded-full overflow-hidden relative lg:border-2 transition-all duration-200 ${
                  activeIndex === idx
                    ? "lg:border-white lg:shadow-[0_0_0_3px_rgba(255,255,255,0.06)]"
                    : "lg:border-transparent lg:opacity-80 lg:hover:opacity-100"
                }`}
                aria-label={`Thumbnail ${idx + 1}`}
                title={item?.name}
              >
                <div
                  className={`lg:hidden block w-2.5 h-2.5 rounded-full ${
                    activeIndex === idx ? "bg-primary" : "bg-white"
                  }`}
                ></div>
                <div className="relative lg:block hidden w-full h-0 pb-[150%]">
                  <Image
                    src={generateUrlImage(item?.poster_url)}
                    alt={item?.name || `Thumb ${idx + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieBanner;

interface MovieItemProps {
  item: Movie;
}

const MovieItem = ({ item }: MovieItemProps) => {
  return (
    <div className="relative bg-[#2F3346] rounded-2xl overflow-hidden h-[420px]">
      <Link
        href={`/thong-tin-phim/${item?.slug}`}
        className="lg:hidden flex absolute inset-0 z-30"
      />
      <div className="lg:before:absolute lg:before:inset-0 lg:before:bg-[url('/images/dotted.png')] lg:before:bg-repeat lg:before:opacity-20 lg:before:z-[2]" />
      <div className="flex lg:flex-row flex-col-reverse h-full">
        <div className="lg:p-8 p-4 lg:max-w-[600px] max-w-full z-10 relative overflow-hidden">
          <DecodeText
            as="h4"
            text={item?.name}
            className="text-gradient font-bold line-clamp-1 lg:text-2xl text-xl mb-1"
          />
          <DecodeText
            as="p"
            text={item?.origin_name}
            className="text-white text-sm line-clamp-1 font-thin"
          />
          <div className="flex gap-2 items-center flex-wrap mt-4">
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
            <div className="sm:flex hidden items-center gap-2">
              {item?.lang?.split("+")?.map((lang, index) => (
                <BadgeCustom key={index} size="xs" text={lang} />
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2.5">
            {item?.categories?.map((caterogy, index: number) => (
              <TagClassic
                key={index}
                text={caterogy?.name || "Thể loại: N/A"}
                isRedirect
                href={`/chi-tiet/the-loai/${caterogy?.slug}`}
              />
            ))}
          </div>

          <DecodeText
            as="p"
            text={item?.content || "Nội dung: N/A"}
            className="text-sm text-white leading-6 mt-6 my-4 line-clamp-3"
          />

          <div className="lg:flex hidden gap-4 items-center mt-6">
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
          </div>
        </div>
        <div
          className=" [mask-image:linear-gradient(to_top,transparent_0%,black_30%,black_100%)] 
                    [-webkit-mask-image:linear-gradient(to_top,transparent_0%,black_30%,black_100%)]
                    lg:[mask-image:linear-gradient(to_right,transparent_0%,black_30%,black_100%)]
                    lg:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_30%,black_100%)]
                    [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]
                    [mask-size:100%_100%] [-webkit-mask-size:100%_100%] 
                    lg:relative absolute top-0 xl:w-[calc(100%-500px)] lg:w-[80%] w-full lg:h-full md:h-[260px] h-[200px]"
        >
          <Image
            src={generateUrlImage(item?.thumb_url)}
            alt={item?.name || "Movie Banner"}
          />
        </div>
      </div>
    </div>
  );
};
