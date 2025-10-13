"use client";

import { SiAirplayaudio } from "react-icons/si";
import { Box, Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { showDialogSinInWhenNotLogin } from "@/store/slices/system.slice";
import { createRoomWatchingTogether } from "@/store/async-thunks/watching-together.thunk";
import { appConfig, FeatureStatus } from "@/configs/app.config";
import StatusTag from "@/components/shared/StatusTag";
import { toast } from "sonner";
import { FaPodcast } from "react-icons/fa6";
import Link from "next/link";

interface WatchingTogetherButtonProps {
  placement?: "vertical" | "horizontal";
  responsiveText?: boolean;
}

const { status } = appConfig.feature.watchingTogether;

const WatchingTogetherButton = ({
  placement = "horizontal",
  responsiveText = false,
}: WatchingTogetherButtonProps) => {
  const { movie, currentEpisode, episodes } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );
  const { loading } = useSelector((state: RootState) => state.watchingTogether);
  const { data: sesstion } = useSession();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const movieData = {
    movieName: movie?.name,
    movieOriginName: movie?.origin_name,
    movieSlug: movie?.slug,
    moviePoster: movie?.poster_url,
    movieThumb: movie?.thumb_url,
    episodes: episodes,
    voteAverage: movie?.tmdb?.vote_average,
    movieQuality: movie?.quality,
    movieYear: movie?.year,
    movieLang: movie?.lang,
    movieTime: movie?.time,
    movieEpisodeCurrent: movie?.episode_current,
  };

  const handleCreateRoomWatchingTogether = async () => {
    if (!sesstion) {
      dispatch(showDialogSinInWhenNotLogin());
      return;
    }

    if (status === FeatureStatus.MAINTENANCE) {
      toast.info("Tính năng đang bảo trì, vui lòng quay lại sau!");
      return;
    }

    if (!movie || !currentEpisode || !episodes) return;

    try {
      const response = await dispatch(
        createRoomWatchingTogether({
          userId: sesstion?.user?.id as string,
          movieData,
          accessToken: sesstion?.user?.accessToken as string,
        })
      );

      const { result, message, status: roomStatus } = response.payload ?? {};

      if (roomStatus) {
        toast.success(message);
        router.push(`/xem-chung/${result?.roomId}`);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi tạo phòng!");
    }
  };

  return (
    <Link
      href={`/xem-chung/tao-phong/${movie?.slug}`}
      // onClick={handleCreateRoomWatchingTogether}
      className={`p-2 select-none sm:min-w-16 cursor-pointer rounded-lg flex justify-center items-center gap-2 text-gray-50 transition-all hover:bg-[#ffffff05] ${
        placement === "vertical" ? "flex-col" : "flex-row"
      }`}
    >
      <FaPodcast />
      <span
        className={`text-xs whitespace-nowrap ${
          !responsiveText ? "block" : "hidden xs:block"
        }`}
      >
        Xem chung
      </span>
      {status === FeatureStatus.MAINTENANCE && <StatusTag text="Bảo trì" />}
      {loading && <Spinner size="sm" />}
    </Link>
  );
};

export default WatchingTogetherButton;
