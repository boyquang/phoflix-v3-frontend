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
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);

  return (
    <Link
      href={`/xem-chung/tao-phong/${movie?.slug}`}
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
    </Link>
  );
};

export default WatchingTogetherButton;
