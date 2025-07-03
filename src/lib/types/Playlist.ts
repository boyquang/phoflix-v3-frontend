type GetUserPlaylists = {
  userId: string;
  accessToken: string;
}

type CreateNewPlaylist = {
  userId: string;
  playlistName: string;
  accessToken: string;
};

type UpdatePlaylist = {
  userId: string;
  playlistId: string;
  playlistName: string;
  accessToken: string;
};

type DeletePlaylist = {
  userId: string;
  playlistId: string;
  accessToken: string;
};

type GetPlaylistsContainingMovie = {
  userId: string;
  movieSlug: string;
  accessToken: string;
}

type GetUserMoviesFromPlaylist = {
  userId: string;
  playlistId: string;
  page: number;
  limit: number;
  accessToken: string;
}

type Playlist = {
  id: string;
  user_id: string;
  name: string;
  totalMovie: number;
  created_at: string;
  updated_at: string;
};