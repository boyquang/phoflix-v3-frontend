type GetUserPlaylists = {
  userId: string;
  accessToken: string;
}

type CreateNewPlaylist = {
  playlistName: string;
  accessToken: string;
};

type UpdatePlaylist = {
  playlistId: string;
  playlistName: string;
  accessToken: string;
};

type DeletePlaylist = {
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
  _id: string;
  userId: string;
  name: string;
  movieCount: number;
  createdAt: string;
  updatedAt: string;
};