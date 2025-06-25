type WatchingTogetherSlice = {
  movieData: {
    movieName: string;
    movieSlug: string;
    moviePoster: string;
    movieThumb: string;
    movieOriginName: string;
    voteAverage: number;
    movieQuality: string;
    movieYear: string;
    movieLang: string;
    movieTime: string;
    movieEpisodeCurrent: string;
    episodes: any;
  } | null;
  maxUserInRoom: number;
  hasLeftRoom: boolean;
  currentEpisode: any | null;
  roomOwnerId: string;
  roomId: string;
  loading: boolean;
  error: boolean;
};

type GetUsersInRoom = {
  roomId: string;
  accessToken: string;
}
