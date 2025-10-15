type UserInRoom = {
  avatar: string;
  id: string;
  name: string;
  role: "member" | "admin";
};

type MovieDataInRoom = {
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
  episodes: Episode[];
};

type Rooms = {
  createdAt: string;
  maxUserInRoom: number;
  roomId: string;
  roomOwner: UserInRoom;
  users: UserInRoom[];
  movieData: MovieDataInRoom;
};

type WatchingTogetherSlice = {
  movieData: MovieDataInRoom | null;
  maxUserInRoom: number;
  hasLeftRoom: boolean;
  currentEpisode: EpisodeMerged | null;
  roomOwnerId: string;
  roomId: string;
  loading: boolean;
  error: boolean;
};

type GetUsersInRoom = {
  roomId: string;
  accessToken: string;
};
