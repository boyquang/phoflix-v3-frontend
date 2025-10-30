"use client";

import { getUserMovies } from "@/lib/actions/user-movie.action";
import { RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaChevronRight } from "react-icons/fa";
import MovieSwiper from "../shared/MovieSwiper";
import MovieItem from "../user/MovieItem";
import { SwiperSlide } from "swiper/react";
import useUserMovie from "@/hooks/useUserMovie";

const ContinueWatchingMovies = () => {
  const [items, setItems] = useState<Movie[]>([]);
  const { data: session, status } = useSession();
  const { triggerRefresh } = useSelector((state: RootState) => state.system);
  const { handleDeleteMovie } = useUserMovie({ items });
  const [idDelete, setIdDelete] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchData = async () => {
      try {
        const response = await getUserMovies({
          type: "history",
          page: 1,
          limit: 7,
          accessToken: session?.user?.accessToken as string,
        });

        if (response?.status) {
          setItems(response?.result?.movies || []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [status, triggerRefresh]);

  if (!items || items?.length === 0) return null;

  return (
    <Box className="my-12 flex flex-col lg:gap-4">
      <Box className="flex items-center lg:justify-start justify-between gap-4 lg:mb-0 mb-2">
        <h3 className="flex items-center gap-1 lg:text-2xl md:text-xl text-md text-white font-semibold mb-1">
          Đã xem gần đây
        </h3>
        <Link
          href="/nguoi-dung/lich-su-xem"
          className="px-2 py-1 rounded-full border border-[#fff5] flex text-gray-50 text-sm gap-0.5 hover:text-primary items-center transition-all"
        >
          Xem thêm
          <FaChevronRight />
        </Link>
      </Box>
      <MovieSwiper
        showNavigation={false}
        loading={false}
        error={false}
        orientation="vertical"
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 8,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 8,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 8,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 12,
          },
          1440: {
            slidesPerView: 6,
            spaceBetween: 16,
          },
          1920: {
            slidesPerView: 7,
            spaceBetween: 18,
          },
        }}
      >
        {items?.map((item, index) => (
          <SwiperSlide key={index} className="relative">
            <MovieItem
              item={item}
              isLoading={idDelete === item?._id}
              callback={(movieId) =>
                handleDeleteMovie(movieId, "history", setIdDelete)
              }
            />
          </SwiperSlide>
        ))}
      </MovieSwiper>
    </Box>
  );
};

export default ContinueWatchingMovies;
