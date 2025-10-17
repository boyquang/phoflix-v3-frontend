"use client";

import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import BackButton from "@/components/shared/BackButton";
import Image from "@/components/shared/Image";
import PopoverCopy from "@/components/shared/PopoverCopy";
import { formatDate } from "@/lib/utils";
import { getRoomData } from "@/store/async-thunks/watch-together-v2.thunk";
import { AppDispatch, RootState } from "@/store/store";
import { Link } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { FaEye, FaLink } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import LiveBadge from "./LiveBadge";
import { IoIosPlayCircle } from "react-icons/io";
import SectionVideo from "./SectionVideo";
import StatusCard from "./StatusCard";
import MovieInfo from "./MovieInfo";
import useSetCurrentEpisode from "@/hooks/useSetCurrentEpisode";
import LiveToggleButton from "./LiveToggleButton";
import SectionEpisodes from "./SectionEpisodes";
import { setEpisode } from "@/store/slices/episode.slice";
import useBeforeUnload from "@/hooks/useBeforeUnload";
import ViewerList from "./ViewerList";
import useWatchTogetherV2 from "@/hooks/useWatchTogetherV2";

interface ClientWrapperProps {
  roomId: string;
}

const ClientWrapper = ({ roomId }: ClientWrapperProps) => {
  const { fetched, roomData, loading } = useSelector(
    (state: RootState) => state.watchTogetherV2
  );
  const { data: session, status } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const { handleGetRoomData } = useWatchTogetherV2();

  const isHost = roomData?.host.userId === session?.user.id;
  const isRoomInactive =
    roomData?.status === "ended" || roomData?.status === "pending";
  const isRoomActive =
    roomData?.status === "pending" || roomData?.status === "active";

  // Load data khi reload page
  useEffect(() => {
    if (status !== "authenticated" || !roomId || fetched) return;

    handleGetRoomData(roomId);
  }, [status, roomId, dispatch, fetched]);

  // Cảnh báo khi người dùng cố gắng rời khỏi trang
  useBeforeUnload({});

  useEffect(() => {
    if (roomData) {
      dispatch(
        setEpisode({
          episodes: roomData.movie?.episodes || [],
          movie: roomData.movie as Movie,
        })
      );
    }
  }, [roomData]);

  // Đặt episode hiện tại dựa trên tham số URL
  useSetCurrentEpisode({
    enabled: roomData?.status === "active",
  });

  if (status === "loading") return <div className="min-h-screen" />;
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white">Vui lòng đăng nhập để tiếp tục.</p>
      </div>
    );
  }
  if (loading.fetchRoomData) return <Loading type="bars" />;
  if (!roomData) return <NotFound />;

  return (
    <div className="min-h-screen">
      <div className="relative">
        <div className="sticky top-0 w-full h-16 bg-[rgba(0,0,0,.7)] flex items-center lg:px-6 px-4 z-30 gap-4">
          <BackButton href="/xem-chung" />
          <div className="flex-grow-1 overflow-hidden">
            <div className="flex items-center gap-2">
              {roomData?.status === "active" && (
                <LiveBadge position="relative" size="sm" rounded="rounded-sm" />
              )}
              <h4 className="text-base text-white font-semibold line-clamp-1">
                {roomData?.roomName || "Phòng xem chung"}
              </h4>
            </div>
            <p className="text-xs text-gray-400 line-clamp-1">
              {roomData?.movie?.name}
            </p>
          </div>
          {isRoomActive && isHost && (
            <LiveToggleButton roomId={roomId as string} />
          )}
        </div>
        <div className="relative flex items-center justify-center bg-black">
          {isRoomInactive ? (
            <div className="relative h-0 pb-[56.25%] z-10 w-full">
              <div className="opacity-50 select-none">
                <Image
                  src={roomData.movie?.thumb_url}
                  alt={roomData?.movie?.name || "Poster"}
                  className="rounded-none"
                />
              </div>
            </div>
          ) : (
            <SectionVideo
              movie={roomData?.movie}
              status={roomData?.status as "active" | "pending" | "ended"}
            />
          )}
          {isRoomInactive && (
            <StatusCard
              status={roomData.status as "pending" | "ended"}
              roomData={roomData}
              session={session}
            />
          )}
        </div>
        <div className="h-20 flex items-center lg:px-6 px-4 bg-[#000000b0]">
          <div className="flex-grow-1 flex items-center gap-3">
            <div className="lg:w-10 w-9 h-9 lg:h-10 rounded-full relative">
              <Image
                src={roomData.host.avatar}
                alt={roomData?.host.username || "Avatar"}
                className="rounded-full"
              />
            </div>
            <div>
              <div className="text-sm text-white">
                {roomData?.host.username || "Host"}
              </div>
              <div className="text-xs text-gray-400">
                Tạo {formatDate(roomData.createAt || "N/a")}
              </div>
            </div>
          </div>
          {isRoomActive && (
            <div className="flex items-center gap-6">
              <ViewerList />
              <PopoverCopy
                value={window.location.href}
                trigger={
                  <div className="flex cursor-pointer items-center gap-1 text-sm text-gray-300 hover:text-white">
                    <FaLink />
                    Chia sẻ
                  </div>
                }
              />
              <Link
                target="_blank"
                href={`/dang-xem/${roomData?.movie?.slug}`}
                className="text-sm md:inline-flex hidden text-white hover:text-[#ffd875] no-underline"
              >
                <IoIosPlayCircle />
                Xem riêng
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-8 py-8 border-t border-[#fff2] lg:px-6 px-4">
        <div className="xl:col-span-4 col-span-12">
          <MovieInfo movie={roomData?.movie} />
        </div>
        {roomData?.status === "active" && (
          <div className="xl:col-span-8 col-span-12 xl:pl-8 xl:border-l border-[#fff2]">
            <SectionEpisodes />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientWrapper;
