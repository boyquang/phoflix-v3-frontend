"use client";

import CheckboxCustom from "@/components/shared/CheckboxCustom";
import { Box, Spinner } from "@chakra-ui/react";

interface CheckboxPlaylistProps {
  playlist: Playlist;
  playlistIds: string[];
  idCheckbox: string | null;
  callback: (value: string, checked: boolean) => void;
}

const CheckboxPlaylist = ({
  playlist,
  playlistIds,
  idCheckbox,
  callback,
}: CheckboxPlaylistProps) => {
  // Tạo hiệu ứng loading cho checkbox
  if (playlist._id === idCheckbox) {
    return (
      <Box className="flex gap-2 items-center">
        <Spinner size="sm" />
        <span>{playlist.name}</span>
      </Box>
    );
  }

  return (
    <CheckboxCustom
      checked={playlistIds?.includes(playlist._id)}
      onChange={(e) => {
        callback(playlist._id, e.target.checked);
      }}
      color="primary"
      size="medium"
      label={playlist.name}
    />
  );
};

export default CheckboxPlaylist;
