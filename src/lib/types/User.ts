type SearchHistory = {
  id: string;
  keyword: string;
  createdAt: string;
};

type GetUserProfile = {
  email: string;
  typeAccount: "google" | "credentials";
  accessToken: string;
};

type UserSlice = {
  searchHistory: {
    items: SearchHistory[];
    loading: boolean;
    error: boolean;
    keyword: string;
    fetched: boolean;
  };
  selectedPlaylistId: any;
  reviews: {
    items: any;
    loading: boolean;
    error: boolean;
    selectedReview: {
      id: string | number;
      emoji: string;
      text: string;
      value: number;
    } | null;
    reviewContent: string | null;
  };
  userMovies: {
    seletectedDeleteMode: boolean;
    selectedMovieIds: string[];
  };
  comments: {
    items: any;
    loading: boolean;
    error: boolean;
  };
  report: {
    reportError: string;
    reportDescription: string;
  };
  avatar: {
    selectedFilterTabsAvatar: "hoat-hinh" | "meme" | "viet-nam" | "upload";
  };
  playlist: {
    items: any[];
    playlistIds: string[];
  };
};

type UpdateUserProflie = {
  userId: string;
  username: string;
  gender: "other" | "female" | "male";
  avatar: string;
  typeAccount: "credentials" | "google";
  accessToken: string;
};

type UpdateUserPassword = {
  email: string;
  newPassword: string;
  oldPassword: string;
  typeAccount: "credentials";
  accessToken: string;
};

type ChangeRoleUser = {
  userId: string;
  adminId: string;
  role: string;
  accessToken: string;
};

type ChangeStatusUser = {
  userId: string;
  adminId: string;
  status: "active" | "banned";
  accessToken: string;
};

type CreateRoomWatchingTogether = {
  userId: string;
  movieData: any;
  accessToken: string;
};

type GetListRoomsWatchingTogether = {
  userId: string;
  accessToken: string;
};

type JoinRoomWatchingTogether = {
  user: any;
  roomId: string;
  accessToken: string;
};

type LeaveRoomWatchingTogether = {
  userId: string;
  roomId: string;
  accessToken: string;
};

type KickUserOutOfRoomWatchingTogether = {
  userId: string;
  roomId: string;
  roomOwnerId: string;
  accessToken: string;
};

type GetRoomDataWatchingTogether = {
  roomId: string;
  accessToken: string;
};
