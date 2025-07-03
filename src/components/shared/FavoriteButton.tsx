"use client";

import {
  addNewMovie,
  checkMovieExists,
  deleteMovie,
} from "@/lib/actions/userMovieAction";
import { handleShowToaster } from "@/lib/utils";
import { showDialogSinInWhenNotLogin } from "@/store/slices/systemSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdHeart, IoMdHeartDislike } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

interface FavoriteButtonProps {
  placement?: "vertical" | "horizontal";
  responsiveText?: boolean;
}

const FavoriteButton = ({
  placement = "horizontal",
  responsiveText = false,
}: FavoriteButtonProps) => {
  const { data: sesstion } = useSession();
  const movie = useSelector((state: RootState) => state.movie.movieInfo.movie);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();

  // Chỉ gọi api khi movie.slug là slug của movie hiện tại
  useEffect(() => {
    if (sesstion && movie && params?.slug === movie?.slug) {
      handleCheckMovieExists();
    }
  }, []);

  const handleCheckMovieExists = async () => {
    setLoading(true);
    const response = await checkMovieExists({
      userId: sesstion?.user?.id as string,
      movieSlug: movie?.slug as string,
      type: "favorite",
      accessToken: sesstion?.user?.accessToken as string,
    });
    setLoading(false);
    setFavorite(response?.result?.exists ?? false);
  };

  const handleAddNewMovie = async () => {
    if (!movie) {
      handleShowToaster("Thông báo", "Phim không tồn tại.", "error");
      return;
    }

    const response = await addNewMovie({
      userId: sesstion?.user?.id as string,
      movieData: {
        name: movie?.name,
        lang: movie?.lang,
        quality: movie?.quality,
        slug: movie?.slug,
        year: movie?.year,
        time: movie?.time,
        episodeCurrent: movie?.episode_current,
        originName: movie?.origin_name,
        posterUrl: movie?.poster_url,
        thumbUrl: movie?.thumb_url,
        category: movie?.category,
      },
      type: "favorite",
      accessToken: sesstion?.user?.accessToken as string,
    });

    return response;
  };

  const handleDeleteMovie = async () => {
    if (!movie) {
      handleShowToaster("Thông báo", "Phim không tồn tại.", "error");
      return;
    }

    const response = await deleteMovie({
      userId: sesstion?.user?.id as string,
      movieSlug: movie?.slug,
      type: "favorite",
      accessToken: sesstion?.user?.accessToken as string,
    });

    return response;
  };

  const handleActionsFavorite = async () => {
    if (!sesstion) {
      dispatch(showDialogSinInWhenNotLogin());
      return;
    }

    let response = null;

    setLoading(true);

    if (!favorite) {
      response = await handleAddNewMovie();
    } else {
      response = await handleDeleteMovie();
    }

    setLoading(false);

    if (response?.status) {
      handleCheckMovieExists();
    }

    handleShowToaster(
      "Thông báo",
      response?.message,
      response?.status ? "success" : "error"
    );
  };

  return (
    <Box
      onClick={handleActionsFavorite}
      className={`p-2 select-none sm:min-w-16 cursor-pointer rounded-lg flex justify-center items-center gap-2 transition-all hover:bg-[#ffffff05] 
          ${placement === "vertical" ? "flex-col" : "flex-row"}
          ${loading ? "opacity-50" : ""}
          ${favorite ? "text-[#ffd875]" : "text-gray-50"}
        `}
    >
      {loading ? <Spinner /> : favorite ? <IoMdHeartDislike /> : <IoMdHeart />}
      <span
        className={`xs:text-xs text-[10px] whitespace-nowrap ${
          !responsiveText ? "block" : "hidden xs:block"
        }`}
      >
        {favorite ? "Bỏ yêu thích" : "Yêu thích"}
      </span>
    </Box>
  );
};

export default FavoriteButton;
