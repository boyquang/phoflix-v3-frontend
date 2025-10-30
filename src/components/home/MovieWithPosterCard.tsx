"use client";

import { fetchMovieDetail } from "@/lib/actions/movie.action";
import { useEffect, useState } from "react";
import MovieSwiper from "../shared/MovieSwiper";
import SeeMoreLink from "./SeeMoreLink";

interface MovieWithPosterCardProps {
  describe: "danh-sach" | "the-loai" | "quoc-gia";
  type: Countries | Categories | DescribeType;
  title?: string;
  limit?: number;
}

const MovieWithPosterCard = ({
  describe,
  type,
  title = "Phim nổi bật",
  limit,
}: MovieWithPosterCardProps) => {
  const [items, setItems] = useState<Movie[] | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetchMovieDetail(describe, type, 1, 10);
        setItems(response.items || []);
      } catch (error) {
        console.error("Error fetching top movies:", error);
      }
    };

    fetchMovies();
  }, [type, describe, limit]);

  if (!items || items.length === 0) return null;

  return (
    <div className="2xl:px-0 px-4">
      <div className="flex items-center gap-4 lg:mb-4">
        <h4 className="lg:text-2xl md:flex-grow-0 flex-grow-1 capitalize md:text-xl text-md text-white font-semibold mb-1">
          {title}
        </h4>
        <SeeMoreLink title="Xem thêm" link={`/chi-tiet/${describe}/${type}`} />
      </div>
      <MovieSwiper
        error={false}
        items={items || []}
        showNavigation={false}
        showPoster={true}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 8 },
          640: { slidesPerView: 2, spaceBetween: 8 },
          768: { slidesPerView: 3, spaceBetween: 8 },
          1024: { slidesPerView: 2, spaceBetween: 12 },
          1440: { slidesPerView: 3, spaceBetween: 16 },
          1920: { slidesPerView: 4, spaceBetween: 18 },
        }}
      />
    </div>
  );
};

export default MovieWithPosterCard;
