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

type RoomResponse = {
  room: (Room & Movie & Episode) | null;
};

type GetListRoomsResponse = {
  rooms: Room[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
};

interface GetListRoomsByUserParams {
  page?: number;
  limit?: number;
  status?: StatusFilter;
}

type LiveActionResponse = {
  room: {
    roomId: string;
    status: StatusFilter;
  };
};

type DeleteRoomResponse = {
  room: {
    roomId: string;
  };
};

type KickUserResponse = {
  room: {
    participantUsers: ParticipantUser[];
  };
}

type ValueOptionRoom = "end" | "start" | "delete";
