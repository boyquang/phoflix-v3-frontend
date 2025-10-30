"use client";

import { fetchMovieDetail } from "@/lib/actions/movie.action";
import { useEffect, useRef, useState } from "react";
import MovieSwiper from "../shared/MovieSwiper";
import Image from "../shared/Image";
import { generateUrlImage } from "@/lib/utils";
import { SwiperSlide } from "swiper/react";
import Link from "next/link";
import MovieTooltip from "../shared/MovieTooltip";
import useTooltip from "@/hooks/useTooltip";
import EpisodeBadges from "../shared/EpisodeBadges";
import { textBackgrounds } from "@/constants/color.contant";

interface TopMovieSectionProps {
  describe: "danh-sach" | "the-loai" | "quoc-gia";
  type: Countries | Categories | DescribeType;
  title?: string;
  limit?: number;
}

const TopMovieSection = ({
  type,
  describe,
  title = "Top phim hay hôm nay",
  limit,
}: TopMovieSectionProps) => {
  const [items, setItems] = useState<Movie[] | null>(null);

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

  if (!items || items.length === 0) return null;

  return (
    <div className="2xl:px-0 px-4 top-up">
      <h4
        style={{
          background:
            textBackgrounds[Math.floor(Math.random() * textBackgrounds.length)],
        }}
        className="lg:text-2xl inline-block text-gradient md:text-xl text-md font-semibold lg:mb-6 mb-4"
      >
        {title}
      </h4>
      <MovieSwiper
        error={false}
        items={items || []}
        showNavigation={false}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 8 },
          640: { slidesPerView: 2, spaceBetween: 8 },
          768: { slidesPerView: 4, spaceBetween: 8 },
          1024: { slidesPerView: 5, spaceBetween: 12 },
          1440: { slidesPerView: 6, spaceBetween: 16 },
          1920: { slidesPerView: 6, spaceBetween: 18 },
        }}
      >
        {items?.map((movie, index) => (
          <SwiperSlide key={index} className="relative">
            <MovieCard key={index} data={movie} index={index} />
          </SwiperSlide>
        ))}
      </MovieSwiper>
    </div>
  );
};

export default TopMovieSection;

interface MovieCardProps {
  data: Movie;
  index: number;
}

const MovieCard = ({ data, index }: MovieCardProps) => {
  const currentElementRef = useRef<HTMLImageElement | null>(null);
  const tooltipTimeout = useRef<NodeJS.Timeout | null>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const { onMouseEnterShowTooltip, onMouseLeaveHideTooltip } = useTooltip();

  const handleMouseEnter = () => {
    onMouseEnterShowTooltip(tooltipTimeout, currentElementRef, setTooltip);
  };

  const handleMouseLeave = () => {
    onMouseLeaveHideTooltip(tooltipTimeout, setTooltip);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/thong-tin-phim/${data?.slug}`} className="group">
        <div className="top-movie-mask absolute inset-0"></div>
        <div className="h-0 pb-[150%] relative bg-transparent group-hover:bg-primary top-movie-mask transition-all">
          <EpisodeBadges data={data} />
          <Image
            ref={currentElementRef}
            src={generateUrlImage(data?.poster_url)}
            className="top-movie-mask group-hover:brightness-75 transition-all rounded-lg group-hover:w-[calc(100%-8px)] group-hover:h-[calc(100%-8px)] group-hover:top-1 group-hover:left-1"
            alt={data?.name || "Không xác định"}
          />
        </div>
        <div className="flex items-start mt-2 gap-1">
          <div className="xl:text-5xl text-4xl whitespace-nowrap xl:w-14 w-[50px] italic text-gradient flex-shrink-0 font-extrabold">
            {index + 1}
          </div>
          <div>
            <h6 className="text-sm text-white line-clamp-1">
              {data?.name || "Không xác định"}
            </h6>
            <p className="text-xs text-gray-400 line-clamp-1">
              {data?.origin_name || "Không có mô tả"}
            </p>
          </div>
        </div>
      </Link>

      {tooltip?.visible && <MovieTooltip data={data} position={tooltip} />}
    </div>
  );
};
