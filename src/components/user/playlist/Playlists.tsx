"use client";

import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import ActionsPlaylist from "./ActionsPlaylist";
import { setPlaylistByKey } from "@/store/slices/user.slice";
import EmptyData from "@/components/shared/EmptyData";
import { MdOutlinePlaylistAdd } from "react-icons/md";
interface PlaylistsProps {
  playlists: Playlist[];
  loading: boolean;
}

const Playlists = ({ playlists, loading }: PlaylistsProps) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [pending, startTransition] = useTransition();
  const { selectedPlaylistId } = useSelector(
    (state: RootState) => state.user.playlist
  );

  const handleChangePlaylist = (playlist: Playlist) => {
    if (playlist?._id === selectedPlaylistId) return;

    const params = new URLSearchParams(window.location.search);

    params.set("playlistId", playlist?._id.toString());
    params.set("playlistName", playlist?.name.toString());

    startTransition(() => {
      router.replace(`?${params.toString()}`, {
        scroll: false,
      });
    });

    dispatch(
      setPlaylistByKey({ key: "selectedPlaylistId", value: playlist?._id })
    );
  };

  if (loading)
    return (
      <Box className="text-primary mt-2 text-sm">
        Đang tải danh sách phát...
      </Box>
    );
  if (!playlists || playlists?.length === 0)
    return (
      <EmptyData
        className="bg-[#ffffff05] rounded-2xl"
        icon={<MdOutlinePlaylistAdd />}
        title="Chưa có danh sách phát"
        description="Bạn chưa tạo danh sách phát nào. Hãy tạo danh sách phát để lưu trữ các bộ phim yêu thích của bạn."
      />
    );

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
                  pending && selectedPlaylistId !== playlist?._id
                    ? "opacity-50 pointer-events-none"
                    : ""
                }
                ${
                  selectedPlaylistId === playlist?._id
                    ? "border-[#ffd875]"
                    : "border-[#ffffff10] hover:bg-[#25272f]"
                }
              `}
          >
            <span className="text-gray-50 text-sm">{playlist?.name}</span>
            <Box className="flex justify-between items-center">
              <Box className="flex flex-1 gap-1 items-center text-gray-200">
                <IoPlayCircleOutline />
                <span className="text-xs">{playlist?.totalItems} phim</span>
              </Box>

              <ActionsPlaylist
                action="update"
                value={playlist?.name}
                playlistId={playlist?._id}
              >
                <span className="text-gray-200 text-xs underline">Sửa</span>
              </ActionsPlaylist>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Playlists;
