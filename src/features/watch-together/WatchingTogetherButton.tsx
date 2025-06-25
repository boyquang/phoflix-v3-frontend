"use client";

import { SiAirplayaudio } from "react-icons/si";
import { handleShowToaster } from "@/lib/utils";
import { Box, Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { showDialogSinInWhenNotLogin } from "@/store/slices/systemSlice";
import { createRoomWatchingTogether } from "@/store/asyncThunks/watchingTogetherAsyncThunk";
import { appConfig, FeatureStatus } from "@/configs/appConfig";
import StatusTag from "@/components/shared/StatusTag";

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
  const { data: sesstion }: any = useSession();
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
      handleShowToaster(
        "Thông báo",
        "Tính năng đang bảo trì, vui lòng quay lại sau!",
        "warning"
      );
      return;
    }

    if (movie && currentEpisode && episodes) {
      const response = await dispatch(
        createRoomWatchingTogether({
          userId: sesstion?.user?.id,
          movieData,
          accessToken: sesstion?.user?.accessToken,
        })
      );

      const { result, message, status } = response.payload ?? {};

      if (status) {
        router.push(`/phong-xem-chung/${result?.roomId}`);
      }

      handleShowToaster(
        "Thông báo",
        message ?? "Tạo phòng thất bại!",
        status ? "success" : "error"
      );
    }
  };

  return (
    <Box
      onClick={handleCreateRoomWatchingTogether}
      className={`p-2 select-none sm:min-w-16 cursor-pointer rounded-lg flex justify-center items-center gap-2 text-gray-50 transition-all hover:bg-[#ffffff05] ${
        placement === "vertical" ? "flex-col" : "flex-row"
      }`}
    >
      <SiAirplayaudio />
      <span
        className={`xs:text-xs text-[10px] whitespace-nowrap ${
          !responsiveText ? "block" : "hidden xs:block"
        }`}
      >
        Xem chung
      </span>
      {status === FeatureStatus.MAINTENANCE && <StatusTag text="Bảo trì" />}
      {loading && <Spinner size="sm" />}
    </Box>
  );
};

export default WatchingTogetherButton;
