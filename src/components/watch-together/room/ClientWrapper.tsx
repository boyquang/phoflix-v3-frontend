"use client";

import { AppDispatch, RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ViewerList from "./ViewerList";
import { setCurrentEpisode } from "@/store/slices/watching-together.slice";
import Loading from "@/app/loading";
import LeaveRoomButton from "./LeaveRoomButton";
import useLeaveRoomOnRouteChange from "@/hooks/useLeaveRoomOnRouteChange";
import useJoinRoom from "@/hooks/useJoinRoom";
import useSetCurrenEpisode from "@/hooks/useSetCurrentEpisode";
import CinemaMode from "@/components/shared/CinemaMode";
import MovieInfo from "./MovieInfo";
import RootLayout from "@/components/layout/RootLayout";
import useSocketRoomUserEvents from "@/hooks/useSocketRoomUserEvents";
import EpisodeWrapper from "./EpisodesWrapper";
import VideoPlayerWrapper from "./VideoPlayerWrapper";
import PopoverCopy from "@/components/shared/PopoverCopy";
import ShareRoom from "./ShareRoom";

const ClientWrapper = () => {
  const params = useParams();
  const roomId = params?.roomId as string;
  const { movieData, roomOwnerId, currentEpisode, loading, maxUserInRoom } =
    useSelector((state: RootState) => state.watchingTogether);
  const dispatch: AppDispatch = useDispatch();
  const { data: session } = useSession();

  // Chạy khi người dùng thay rời phòng bằng cách nhấn nút back hoặc chuyển trang
  useLeaveRoomOnRouteChange({
    roomId,
    roomOwnerId,
    userId: session?.user?.id as string,
  });

  // Chạy để lấy dữ liệu tập phim cho chủ phòng
  useSetCurrenEpisode({
    episodes: movieData?.episodes || [],
    enabled: session?.user?.id === roomOwnerId,
    callback: (item) => dispatch(setCurrentEpisode(item)),
  });

  // Chạy khi người dùng tham gia phòng
  useJoinRoom({
    roomId,
  });

  // Xử lý các sự kiện liên quan đến người dùng trong phòng
  useSocketRoomUserEvents({
    roomId,
  });

  if (loading) {
    return <Loading type="bars" />;
  }

  if (!session) {
    return (
      <RootLayout>
        <Box className="flex flex-col items-center justify-center h-screen text-center px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
            Bạn chưa đăng nhập
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Vui lòng đăng nhập để xem phòng.
          </p>
        </Box>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <Box className="lg:pt-28 pt-24 text-gray-50">
        <Box className="flex justify-between items-center mb-12">
          <Box className="flex flex-col gap-2">
            <p className="text-sm text-green-500">Id phòng: {roomId}</p>
            <p className="text-xs text-gray-300">
              Lưu ý: Phòng chỉ chứa tối đa {maxUserInRoom || 0} người xem.
            </p>
          </Box>
          <LeaveRoomButton />
        </Box>
        <Box className="grid grid-cols-12 lg:gap-12 gap-4">
          <Box className="lg:col-span-9 col-span-12">
            {currentEpisode ? (
              <Box className="max-w-full w-full">
                <h4 className="lg:text-2xl text-lg text-white mb-6">
                  {`Bạn đang xem ${movieData?.movieName} - ${currentEpisode?.name}`}
                </h4>
                <Box className="relative watch-player xs:-mx-0 -mx-4">
                  <VideoPlayerWrapper />
                  <Box className="flex justify-between gap-2 flex-wrap xs:p-4 p-2 border-l border-r border-b border-[#ffffff10] bg-[#08080a] xs:rounded-b-2xl rounded-b-none items-center">
                    <Box className="flex items-center gap-1 flex-wrap">
                      <PopoverCopy
                        title="Liên kết gửi bạn bè"
                        trigger={
                          <ShareRoom
                            placement="horizontal"
                            responsiveText={false}
                          />
                        }
                      />
                    </Box>
                    <CinemaMode />
                  </Box>
                </Box>
                <Box className="w-full h-[0.5px] bg-[#ffffff10] lg:my-12 my-6"></Box>
                <MovieInfo />
              </Box>
            ) : (
              <Box className="h-[320px]">
                <Loading type="bars" height="h-full" />
              </Box>
            )}

            {session?.user?.id === roomOwnerId && <EpisodeWrapper />}
          </Box>

          <Box className="lg:col-span-3 col-span-12">
            <ViewerList />
          </Box>
        </Box>
      </Box>
    </RootLayout>
  );
};

export default ClientWrapper;
