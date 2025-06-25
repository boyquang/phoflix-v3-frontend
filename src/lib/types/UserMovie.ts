type GetUserMovies = {
  userId: string;
  type: "history" | "favorite" | "playlist";
  page: number;
  limit: number;
  accessToken: string;
};

type CheckMovieExists = {
  userId: string;
  movieSlug: string;
  type: "history" | "favorite" | "playlist";
  accessToken: string;
};


type AddNewMovie = {
  userId: string;
  movieData: {
    name: string;
    lang: string;
    quality: string;
    slug: string;
    year: string | number;
    time: string;
    episodeCurrent: string;
    originName: string;
    posterUrl: string;
    thumbUrl: string;
    category: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
  type: "history" | "favorite" | "playlist";
  accessToken: string;
  playlistId?: string | null;
};

type DeleteMovie = {
  userId: string;
  movieSlug: string;
  type: "history" | "favorite" | "playlist";
  accessToken: string;
  playlistId?: string | null;
  movieId?: string | null;
};

type DeleteAllMovies = {
  userId: string;
  type: "history" | "favorite" | "playlist";
  accessToken: string;
  playlistId?: string | null;
}
