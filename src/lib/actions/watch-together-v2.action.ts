import {
  NEXT_PUBLIC_CRAWL_MOVIES_URL,
  NEXT_PUBLIC_API_VERSION,
} from "../../constants/env.contant";
import { appendParams } from "../appendParams";
import { callApi } from "../callApi";

const BASE_URL = `${NEXT_PUBLIC_CRAWL_MOVIES_URL}/api/${NEXT_PUBLIC_API_VERSION}/watchTogether`;

interface CreateRoomParams {
  movieId: string;
  roomName: string;
  isPrivate?: boolean;
  maxParticipants?: number;
  accessToken: string;
}

export const createRoom = async (params: CreateRoomParams) => {
  const url = `${BASE_URL}/createRoom`;
  return callApi<any>({
    url,
    method: "POST",
    body: {
      id: params.movieId,
      roomName: params.roomName,
      isPrivate: params.isPrivate || false,
      maxParticipants: params.maxParticipants || 10,
    },
    accessToken: params.accessToken,
  });
};

interface GetListRoomsParams {
  accessToken: string;
  page?: number;
  limit?: number;
  status?: StatusFilter;
}

export const getListRooms = async (
  params: GetListRoomsParams
): Promise<any> => {
  const url = new URL(`${BASE_URL}/listRooms`);
  const query = {
    page: (params.page || 1).toString(),
    limit: (params.limit || 10).toString(),
    status: params.status || "all",
  };
  appendParams(url, query);

  return await callApi<any>({
    url: url.toString(),
    method: "GET",
    accessToken: params.accessToken,
  });
};

interface GetUserInRoomParams {
  roomId: string;
  accessToken: string;
}

export const getUsersInRoom = async (params: GetUserInRoomParams) => {
  const url = `${BASE_URL}/listUsersInRoom/${params.roomId}`;
  return await callApi<any>({
    url,
    method: "GET",
    accessToken: params.accessToken,
  });
};

interface GetListRoomsByUser {
  accessToken: string;
  status?: StatusFilter;
  page?: number;
  limit?: number;
}

export const getListRoomsByUser = async (params: GetListRoomsByUser) => {
  const url = new URL(`${BASE_URL}/listRoomsByUser`);
  const query = {
    page: (params.page || 1).toString(),
    limit: (params.limit || 10).toString(),
    status: params.status || "all",
  };
  appendParams(url, query);

  return await callApi<any>({
    url: url.toString(),
    method: "GET",
    accessToken: params.accessToken,
  });
};

interface GetRoomDataParams {
  roomId: string;
  accessToken: string;
}

export const getRoomData = async (params: GetRoomDataParams) => {
  const url = `${BASE_URL}/roomData/${params.roomId}`;
  return await callApi<any>({
    url,
    method: "GET",
    accessToken: params.accessToken,
  });
};

interface JoinRoomParams {
  roomId: string;
  accessToken: string;
}

export const joinRoom = async (params: JoinRoomParams) => {
  const url = `${BASE_URL}/joinRoom/${params.roomId}`;
  return await callApi<any>({
    url,
    method: "POST",
    accessToken: params.accessToken,
  });
};

interface DeleteRoomParams {
  roomId: string;
  accessToken: string;
}

export const deleteRoom = async (params: DeleteRoomParams) => {
  const url = `${BASE_URL}/deleteRoom/${params.roomId}`;
  return await callApi<any>({
    url,
    method: "DELETE",
    accessToken: params.accessToken,
  });
};

interface LeaveRoomParams {
  roomId: string;
  accessToken: string;
}

export const leaveRoom = async (params: LeaveRoomParams) => {
  const url = `${BASE_URL}/leaveRoom/${params.roomId}`;
  return await callApi<any>({
    url,
    method: "PATCH",
    accessToken: params.accessToken,
  });
};

interface EndRoomParams {
  roomId: string;
  accessToken: string;
}

export const endRoom = async (params: EndRoomParams) => {
  const url = `${BASE_URL}/endRoom/${params.roomId}`;
  return await callApi<any>({
    url,
    method: "PATCH",
    accessToken: params.accessToken,
  });
};

interface KickUserParams {
  roomId: string;
  userId: string;
  accessToken: string;
}

export const kickUser = async (params: KickUserParams) => {
  const url = `${BASE_URL}/room/${params.roomId}/kickUser`;
  return await callApi<any>({
    url,
    method: "PATCH",
    body: {
      userId: params.userId,
    },
    accessToken: params.accessToken,
  });
};
