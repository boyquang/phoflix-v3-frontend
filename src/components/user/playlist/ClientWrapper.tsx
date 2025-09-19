"use client";

import { Box, Button } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import ActionsPlaylist from "./ActionsPlaylist";
import { FaPlus } from "react-icons/fa";
import DeleteSelectedMovies from "../DeleteSeletedMovies";
import DeleteAllMovies from "../DeleteAllMovies";
import Playlists from "./Playlists";
import MovieSection from "../MovieSection";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  getUserMoviesFromPlaylist,
  getUserPlaylists,
} from "@/lib/actions/playlist.action";
import { toast } from "sonner";
import Loading from "@/app/loading";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const limit = 18;

const ClientWrapper = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const playlistIdFromParams = searchParams.get("playlistId");
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [loadingPlaylists, setLoadingPlaylists] = useState(false);
  const { triggerRefresh } = useSelector((state: RootState) => state.system);

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchPlaylists = async () => {
      try {
        setLoadingPlaylists(true);
        const response = await getUserPlaylists({
          userId: session?.user?.id as string,
          accessToken: session?.user?.accessToken as string,
        });

        if (response.status) {
          setPlaylists(response.result.playlists || []);
        }
      } catch (error) {
        toast.error("Lỗi khi tải danh sách phát.");
      } finally {
        setLoadingPlaylists(false);
      }
    };

    fetchPlaylists();
  }, [status, triggerRefresh]);

  useEffect(() => {
    let playlistTemp: string | null = null;

    // Nếu có playlistId từ URL, ưu tiên sử dụng
    playlistTemp = playlistIdFromParams
      ? String(playlistIdFromParams)
      : playlists[0]?.id;

    // Kiểm tra playlistId có tồn tại trong danh sách playlist hay không
    const existPlaylistIdFromPlaylists = playlists.find(
      (playlist: Playlist) => playlist?.id === playlistTemp
    );

    // Nếu không tồn tại thì lấy playlistId đầu tiên trong danh sách
    if (!existPlaylistIdFromPlaylists) {
      playlistTemp = playlists[0]?.id;
    }

    setPlaylistId(playlistTemp);
  }, [playlists, playlistIdFromParams]);

  // Lấy danh sách phim khi thay đổi playlistId hoặc page
  useEffect(() => {
    if (status !== "authenticated" || playlists?.length === 0) return;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await getUserMoviesFromPlaylist({
          userId: session?.user?.id as string,
          playlistId: playlistId as string,
          page,
          limit,
          accessToken: session?.user?.accessToken as string,
        });

        if (response?.status) {
          setResponse(response);
        }
      } catch (error) {
        toast.error("Lỗi khi tải phim trong danh sách phát.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [playlists, playlistId, page, status, triggerRefresh]);

  return (
    <div>
      <Box className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h3 className="text-gray-50 text-lg">Danh sách phát</h3>

        <Box className="flex items-center gap-2">
          <ActionsPlaylist action="create">
            <Button
              size="xs"
              rounded="full"
              className="xs:text-xs text-[10px] text-gray-200 bg-transparent border border-gray-400 hover:bg-[#25272f] transition-all"
            >
              <FaPlus />
              Thêm mới
            </Button>
          </ActionsPlaylist>

          {response?.result?.movies?.length >= 2 && (
            <DeleteSelectedMovies type="playlist" playlistId={playlistId} />
          )}
          {response?.result?.movies?.length >= 3 && (
            <DeleteAllMovies type="playlist" playlistId={playlistId} />
          )}
        </Box>
      </Box>

      <Playlists playlists={playlists} loading={loadingPlaylists} />

      {!loading ? (
        <MovieSection
          movies={response?.result?.movies}
          totalItems={response?.result?.totalItems}
          totalItemsPerPage={response?.result?.totalItemsPerPage}
          currentPage={page}
          limit={limit}
          type="playlist"
        />
      ) : (
        <Loading type="bars" height="h-96" />
      )}
    </div>
  );
};

export default ClientWrapper;
