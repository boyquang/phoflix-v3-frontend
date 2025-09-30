"use client";

import {
  addNewMovie,
  checkMovieExists,
  deleteMovie,
} from "@/lib/actions/user-movie.action";
import { showDialogSinInWhenNotLogin } from "@/store/slices/system.slice";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdHeart, IoMdHeartDislike } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

interface FavoriteButtonProps {
  placement?: "vertical" | "horizontal";
  responsiveText?: boolean;
}

const FavoriteButton = ({
  placement = "horizontal",
  responsiveText = false,
}: FavoriteButtonProps) => {
  const { data: session, status } = useSession();
  const movie = useSelector((state: RootState) => state.movie.movieInfo.movie);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();

  // Chỉ gọi api khi movie.slug là slug của movie hiện tại
  useEffect(() => {
    if (status === "authenticated" && movie && params?.slug === movie?.slug) {
      handleCheckMovieExists();
    }
  }, [movie, params?.slug, status]);

  const handleCheckMovieExists = async () => {
    setLoading(true);
    const response = await checkMovieExists({
      movieId: movie?._id as string,
      type: "favorite",
      accessToken: session?.user?.accessToken as string,
    });
    setLoading(false);
    setFavorite(response?.result?.existed ?? false);
  };

  const handleAddNewMovie = async () => {
    if (!movie) return;

    const response = await addNewMovie({
      movieId: movie?._id as string,
      type: "favorite",
      accessToken: session?.user?.accessToken as string,
    });

    return response;
  };

  const handleDeleteMovie = async () => {
    if (!movie) return;

    const response = await deleteMovie({
      movieId: movie?._id as string,
      type: "favorite",
      accessToken: session?.user?.accessToken as string,
    });

    return response;
  };

  const handleActionsFavorite = async () => {
    if (!session) {
      dispatch(showDialogSinInWhenNotLogin());
      return;
    }

    try {
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

      if (response?.status) {
        toast.success(response.message);
      } else {
        toast.error("Đã xảy ra lỗi khi thực hiện thao tác yêu thích.");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi! Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
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
      {loading ? (
        <Spinner size="xs" />
      ) : favorite ? (
        <IoMdHeartDislike />
      ) : (
        <IoMdHeart />
      )}
      <span
        className={`text-xs whitespace-nowrap ${
          !responsiveText ? "block" : "hidden xs:block"
        }`}
      >
        {favorite ? "Bỏ yêu thích" : "Yêu thích"}
      </span>
    </Box>
  );
};

export default FavoriteButton;
