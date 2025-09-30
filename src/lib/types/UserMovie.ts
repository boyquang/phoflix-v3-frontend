type GetUserMovies = {
  type: "history" | "favorite" | "playlist";
  page: number;
  limit: number;
  accessToken: string;
  playlistId?: string | null;
};

type CheckMovieExists = {
  movieId: string;
  type: "history" | "favorite" | "playlist";
  accessToken: string;
};

type AddNewMovie = {
  movieId: string;
  type: "history" | "favorite" | "playlist";
  accessToken: string;
  playlistId?: string | null;
};

type DeleteMovie = {
  movieId: string;
  type: "history" | "favorite" | "playlist";
  accessToken: string;
  playlistId?: string | null;
};

type DeleteAllMovies = {
  type: "history" | "favorite" | "playlist";
  accessToken: string;
  playlistId?: string | null;
};
