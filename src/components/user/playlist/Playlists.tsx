"use client";

import { Box, Spinner } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { setSelectedPlaylistId } from "@/store/slices/user.slice";
import ActionsPlaylist from "./ActionsPlaylist";
interface PlaylistsProps {
  playlists: Playlist[];
}

const Playlists = ({ playlists }: PlaylistsProps) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const playlistId = params.get("playlistId");
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null
  );

  useEffect(() => {
    if (playlistId) {
      const playlist = playlists?.find(
        (playlist) => playlist?.id === playlistId
      );

      if (playlist) {
        setSelectedPlaylist(playlist);
        dispatch(setSelectedPlaylistId(playlist?.id));
        return;
      }
    }

    // Nếu không có playlistId trong URL, chọn playlist đầu tiên
    setSelectedPlaylist(playlists?.[0] || null);
    dispatch(setSelectedPlaylistId(playlists?.[0]?.id) || null);
  }, [playlists]);

  const handleChangePlaylist = (playlist: Playlist) => {
    const params = new URLSearchParams(window.location.search);

    params.set("playlistId", playlist?.id.toString());
    params.set("playlistName", playlist?.name.toString());

    startTransition(() => {
      router.replace(`?${params.toString()}`, {
        scroll: false,
      });
    });

    setSelectedPlaylist(playlist);
  };

  if (!playlists || playlists?.length === 0) return null;

  return (
    <>
      <Box className="grid grid-cols-2 gap-2 lg:grid-cols-3 md:grid-cols-3 xl:grid-cols-5 my-6">
        {playlists.map((playlist, index: number) => (
          <Box
            onClick={() => handleChangePlaylist(playlist)}
            key={index}
            className={`
                p-3 rounded-xl border-2 flex flex-col gap-2
                cursor-pointer
                transition-all
                bg-transparent
                ${
                  pending && selectedPlaylist?.id !== playlist?.id
                    ? "opacity-50 pointer-events-none"
                    : ""
                }
                ${
                  selectedPlaylist?.id === playlist?.id
                    ? "border-[#ffd875] pointer-events-none"
                    : "border-[#ffffff10] hover:bg-[#25272f]"
                }
              `}
          >
            <span className="text-gray-50 text-sm">{playlist?.name}</span>
            <Box className="flex justify-between items-center">
              <Box className="flex flex-1 gap-1 items-center text-gray-200">
                <IoPlayCircleOutline />
                <span className="text-xs">{playlist?.totalMovie} phim</span>
              </Box>

              <ActionsPlaylist
                action="update"
                value={playlist?.name}
                playlistId={playlist?.id}
              >
                <span className="text-gray-200 text-xs underline">Sửa</span>
              </ActionsPlaylist>
            </Box>
          </Box>
        ))}
      </Box>

      {pending && (
        <Box className="flex items-center gap-1.5 text-primary">
          <Spinner size="xs" />
          <h4 className="text-sm">Đang tải dữ liệu mới</h4>
        </Box>
      )}
    </>
  );
};

export default Playlists;
