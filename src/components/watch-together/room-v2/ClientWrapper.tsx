"use client";

import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import BackButton from "@/components/shared/BackButton";
import Image from "@/components/shared/Image";
import PopoverCopy from "@/components/shared/PopoverCopy";
import { formatDate, splitFilename } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store/store";
import { Link } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { FaLink } from "react-icons/fa6";
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
import ViewerList from "./ViewerList";
import useWatchTogetherV2 from "@/hooks/useWatchTogetherV2";
import useReceiveSocketWatchTogetherV2 from "@/hooks/useReceiveSocketWatchTogetherV2";
import { Tooltip } from "@/components/ui/tooltip";
import AutoNextEpisodeButton from "@/components/watch-movie/AutoNextEpisodeButton";
import CinemaMode from "@/components/shared/CinemaMode";
import SyncRoomDataButton from "./SyncRoomDataButton";
import Unauthenticated from "@/components/shared/Unauthenticated";
import RoomDescription from "./RoomDescription";
import useFetchSeasonEpisodes from "@/hooks/useFetchSeasonEpisodes";

interface ClientWrapperProps {
  roomId: string;
}

const ClientWrapper = ({ roomId }: ClientWrapperProps) => {
  const { fetched, roomData, loading } = useSelector(
    (state: RootState) => state.watchTogetherV2
  );
  const { data: session, status } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const {
    handleGetRoomData,
    handleLeaveRoom,
    isHost,
    isRoomInactive,
    isRoomActive,
    isHostInActiveRoom,
  } = useWatchTogetherV2();

  // Load data khi reload page
  useEffect(() => {
    if (status !== "authenticated" || !roomId || fetched) return;
    handleGetRoomData(roomId);
  }, [status, roomId, dispatch, fetched]);

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

  // season episodes
  useFetchSeasonEpisodes({
    movie: roomData?.movie as Movie,
  });

  // Receive socket
  useReceiveSocketWatchTogetherV2();

  if (status === "loading") return <Loading type="bars" />;
  if (status === "unauthenticated") {
    return <Unauthenticated title="Vui lòng đăng nhập để xem phòng này" />;
  }
  if (loading.fetchRoomData) return <Loading type="bars" />;
  if (!roomData) return <NotFound />;

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="focus-backdrop" />
      <div className="relative watch-player">
        <div className="sticky top-0 w-full h-16 bg-[rgba(0,0,0,.7)] flex items-center lg:px-6 px-4 z-30 gap-4">
          <Tooltip
            content="Thoát phòng"
            contentProps={{
              className: "bg-white text-black",
            }}
          >
            <BackButton
              href="/xem-chung"
              onClick={() => {
                if (session?.user.id !== roomData?.hostUserId) {
                  handleLeaveRoom(roomId);
                }
              }}
            />
          </Tooltip>
          <div className="flex-grow-1 overflow-hidden">
            <div className="flex items-center gap-2 mb-1">
              {roomData?.status === "active" && (
                <LiveBadge position="relative" size="sm" rounded="rounded-sm" />
              )}
              <h4 className="md:text-base flex-grow-1 text-sm text-white font-semibold line-clamp-1">
                {roomData?.roomName || "Phòng xem chung"}
              </h4>
            </div>
            <RoomDescription roomData={roomData} />
          </div>
          {isRoomActive && isHost && (
            <LiveToggleButton roomId={roomId as string} />
          )}
        </div>
        <div className="relative">
          <div className="relative flex items-center justify-center bg-black">
            {isRoomInactive ? (
              <div className="relative xl:h-[calc(100vh-9rem)] h-0 xl:pb-0 pb-[56.25%] z-10 w-full">
                <div className="opacity-50 select-none">
                  <Image
                    src={roomData?.movie?.thumb_url || ""}
                    alt={roomData?.movie?.name || "Poster"}
                    className="rounded-none"
                  />
                </div>
              </div>
            ) : (
              <SectionVideo
                session={session}
                movie={roomData?.movie as Movie}
                status={roomData?.status as "active" | "pending" | "ended"}
              />
            )}
            {isRoomInactive && (
              <StatusCard
                status={roomData?.status as "pending" | "ended"}
                roomData={roomData}
                session={session}
              />
            )}
          </div>
          <div className="relative">
            <div className="pointer-events-none sm:hidden block absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-[#08080a]/100 to-[#08080a]/0 z-50" />
            <div
              style={{
                scrollbarWidth: "none",
              }}
              className="sm:overflow-hidden relative h-20 flex items-center gap-4 justify-between overflow-auto lg:px-6 px-4 bg-[#000000b0]"
            >
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="lg:w-10 w-9 h-9 lg:h-10 rounded-full relative  overflow-hidden">
                  <Image
                    src={roomData?.host?.avatar || ""}
                    alt={roomData?.host?.username || "Avatar"}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <div className="text-sm text-white">
                    {roomData?.host?.username || "Host"}
                  </div>
                  <div className="text-xs text-gray-400">
                    Tạo {formatDate(roomData?.createdAt || "N/a")}
                  </div>
                </div>
                <div className="w-[1px] h-10 bg-[#fff2] ml-4 sm:hidden block"></div>
              </div>
              <div className="flex lg:gap-6 gap-4 items-center flex-shrink-0">
                {isHostInActiveRoom && <AutoNextEpisodeButton />}
                {!isHost && roomData?.status === "active" && (
                  <SyncRoomDataButton session={session} roomId={roomId} />
                )}
                <CinemaMode />
              </div>
              {isRoomActive && (
                <div className="flex items-center gap-6 flex-shrink-0">
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
                    className="text-sm md:inline-flex hidden text-white hover:text-primary no-underline"
                  >
                    <IoIosPlayCircle />
                    Xem riêng
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-8 py-8 border-t border-[#fff2] lg:px-6 px-4">
        <div className="xl:col-span-4 col-span-12">
          <MovieInfo movie={roomData?.movie as Movie} />
        </div>
        {isHostInActiveRoom && (
          <div className="xl:col-span-8 col-span-12 xl:pl-8 xl:border-l border-[#fff2]">
            <SectionEpisodes />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientWrapper;
