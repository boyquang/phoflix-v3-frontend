"use client";

import { addNewMovie, deleteMovie } from "@/lib/actions/user-movie.action";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Button, Popover, Portal } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { handleShowToaster } from "@/lib/utils";
import PlaylistButton from "@/components/shared/PlaylistButton";
import {
  getPlaylists,
  getPlaylistsContainingMovie,
} from "@/store/async-thunks/user.thunk";
import { showDialogSinInWhenNotLogin } from "@/store/slices/system.slice";
import CheckboxPlaylist from "./CheckBoxPlaylist";
import ActionsPlaylist from "./ActionsPlaylist";

interface PlaylistPopoverProps {
  placement?: "vertical" | "horizontal";
  responsiveText?: boolean;
}

const PopoverPlaylist = ({
  placement = "horizontal",
  responsiveText = false,
}: PlaylistPopoverProps) => {
  const { data: session } = useSession();
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { items: playlists, playlistIds } = useSelector(
    (state: RootState) => state.user.playlist
  );
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);
  const [idCheckbox, setIdCheckbox] = useState<string | null>(null);

  const handleGetPlaylist = () => {
    dispatch(
      getPlaylists({
        userId: session?.user?.id as string,
        accessToken: session?.user?.accessToken as string,
      })
    );
  };

  const handleGetPlaylistContainingMovie = () => {
    dispatch(
      getPlaylistsContainingMovie({
        userId: session?.user?.id as string,
        movieSlug: (params?.slug as string) || "",
        accessToken: session?.user?.accessToken as string,
      })
    );
  };

  const handleAddNewMovieFromPlaylist = async (playlistId: string) => {
    if (!movie) {
      handleShowToaster("Thông báo", "Phim không tồn tại.", "error");
      return;
    }

    const response = await addNewMovie({
      userId: session?.user?.id as string,
      type: "playlist",
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
      playlistId,
      accessToken: session?.user?.accessToken as string,
    });

    return response;
  };

  const handleDeleteMovieFromPlaylist = async (playlistId: string) => {
    if (!movie) {
      handleShowToaster("Thông báo", "Phim không tồn tại.", "error");
      return;
    }

    const response = await deleteMovie({
      userId: session?.user?.id as string,
      movieSlug: movie?.slug,
      type: "playlist",
      playlistId,
      accessToken: session?.user?.accessToken as string,
    });

    return response;
  };

  const handleActionsPlaylist = async (value: string, checked: boolean) => {
    let response = null;

    setIdCheckbox(value);

    if (checked) {
      response = await handleAddNewMovieFromPlaylist(value);
    } else {
      response = await handleDeleteMovieFromPlaylist(value);
    }

    setIdCheckbox(null);

    if (response?.status) {
      handleGetPlaylistContainingMovie();
    }

    handleShowToaster(
      "Thông báo",
      response?.message,
      response?.status ? "success" : "error"
    );
  };

  if (!session) {
    return (
      <PlaylistButton
        placement={placement}
        responsiveText={responsiveText}
        callback={() => dispatch(showDialogSinInWhenNotLogin())}
      />
    );
  }

  return (
    <Popover.Root autoFocus={false}>
      <Popover.Trigger asChild>
        <Box>
          <PlaylistButton
            placement={placement}
            responsiveText={responsiveText}
          />
        </Box>
      </Popover.Trigger>

      <Portal>
        <Popover.Positioner
          css={{
            zIndex: "123 !important",
          }}
        >
          <Popover.Arrow />
          <Popover.Content className="p-4 max-w-[260px] rounded-lg bg-[#2a314e] text-gray-50">
            {!playlists || playlists.length === 0 ? (
              <p className="text-sm text-gray-300 mb-3">
                Tạo danh sách phát để lưu trữ và quản lý những bộ phim bạn yêu
                thích.
              </p>
            ) : (
              <Box className="mb-4">
                <p className="mb-4 text-white font-semibold">
                  Danh sách phát của bạn
                </p>
                <Box className="flex flex-col gap-4 max-h-48 overflow-y-auto overscroll-contain">
                  {playlists?.map((playlist, index) => (
                    <CheckboxPlaylist
                      key={index}
                      idCheckbox={idCheckbox}
                      playlist={playlist}
                      playlistIds={playlistIds}
                      callback={handleActionsPlaylist}
                    />
                  ))}
                </Box>
              </Box>
            )}

            <ActionsPlaylist action="create" callback={handleGetPlaylist}>
              <Button
                size="sm"
                className="bg-primary text-gray-900 text-sm shadow-primary"
              >
                <FaPlus />
                Thêm mới
              </Button>
            </ActionsPlaylist>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default PopoverPlaylist;
