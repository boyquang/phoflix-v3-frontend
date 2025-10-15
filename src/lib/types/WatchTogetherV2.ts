type StatusFilter = "active" | "ended" | "all" | "pending";

interface FormNewRoom {
  movieId: string;
  roomName: string;
  isPrivate: boolean;
  maxParticipants: number;
}

interface ParticipantUser {
  userId: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

interface Room {
  _id: string;
  roomName: string;
  hostUserId: string;
  participantUsers: ParticipantUser[];
  host: ParticipantUser;
  movie: Movie;
  maxParticipants: number;
  currentParticipants: number;
  status: StatusFilter;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

interface GetRoomDataResponse {
  status: boolean;
  message: string;
  result: {
    room: (Room & Movie & Episode) | null;
  };
}

interface GetListRoomsByUserParams {
  page?: number;
  limit?: number;
  status?: StatusFilter;
}

interface ListRoomsByUserResponse {
  rooms: Room[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
