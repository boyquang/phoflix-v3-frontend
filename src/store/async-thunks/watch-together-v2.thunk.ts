import {
  NEXT_PUBLIC_API_VERSION,
  NEXT_PUBLIC_CRAWL_MOVIES_URL,
} from "@/constants/env.contant";
import { callApi } from "@/lib/callApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = `${NEXT_PUBLIC_CRAWL_MOVIES_URL}/api/${NEXT_PUBLIC_API_VERSION}/watchTogether`;

interface GetRoomDataParams {
  roomId: string;
  accessToken: string;
}

export const getRoomData = createAsyncThunk(
  "watchTogetherV2/getRoomData",
  async (
    params: GetRoomDataParams,
    thunkAPI
  ): Promise<ApiResponse<RoomResponse>> => {
    const data = await callApi({
      url: `${BASE_URL}/roomData/${params.roomId}`,
      accessToken: params.accessToken,
    });

    return data as ApiResponse<RoomResponse>;
  }
);

interface CreateRoomParams {
  data: FormNewRoom;
  accessToken: string;
}

export const createRoom = createAsyncThunk(
  "watchTogetherV2/createRoom",
  async (
    params: CreateRoomParams,
    thunkAPI
  ): Promise<ApiResponse<RoomResponse>> => {
    const data = await callApi({
      url: `${BASE_URL}/createRoom`,
      method: "POST",
      body: {
        id: params.data.movieId,
        roomName: params.data.roomName,
        isPrivate: params.data.isPrivate || false,
        maxParticipants: params.data.maxParticipants || 10,
      },
      accessToken: params.accessToken,
    });

    return data as ApiResponse<RoomResponse>;
  }
);

interface JoinRoomParams {
  roomId: string;
  accessToken: string;
}

export const joinRoom = createAsyncThunk(
  "watchTogetherV2/joinRoom",
  async (
    params: JoinRoomParams,
    thunkAPI
  ): Promise<ApiResponse<RoomResponse>> => {
    const data = await callApi({
      url: `${BASE_URL}/joinRoom/${params.roomId}`,
      method: "POST",
      accessToken: params.accessToken,
    });

    return data as ApiResponse<RoomResponse>;
  }
);

interface ListRoomsParams {
  accessToken: string;
  page?: number;
  limit?: number;
  status?: StatusFilter;
  scope?: "all" | "user"; // all: tất cả phòng, user: phòng của user
}

export const getListRooms = createAsyncThunk(
  "watchTogetherV2/getListRooms",
  async (
    params: ListRoomsParams,
    thunkAPI
  ): Promise<ApiResponse<GetListRoomsResponse>> => {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page.toString());
    if (params.limit) query.append("limit", params.limit.toString());
    if (params.status) query.append("status", params.status);

    const endpoint = params.scope === "user" ? "listRoomsByUser" : "listRooms";

    const data = await callApi({
      url: `${BASE_URL}/${endpoint}?${query.toString()}`,
      accessToken: params.accessToken,
    });

    return data as ApiResponse<GetListRoomsResponse>;
  }
);

export const deleteRoom = createAsyncThunk(
  "watchTogetherV2/deleteRoom",
  async (
    params: { roomId: string; accessToken: string },
    thunkAPI
  ): Promise<ApiResponse<DeleteRoomResponse>> => {
    const data = await callApi({
      url: `${BASE_URL}/deleteRoom/${params.roomId}`,
      method: "DELETE",
      accessToken: params.accessToken,
    });

    return data as ApiResponse<DeleteRoomResponse>;
  }
);

export const leaveRoom = createAsyncThunk(
  "watchTogetherV2/leaveRoom",
  async (
    params: { roomId: string; accessToken: string },
    thunkAPI
  ): Promise<ApiResponse<null>> => {
    const data = await callApi({
      url: `${BASE_URL}/leaveRoom/${params.roomId}`,
      method: "PATCH",
      accessToken: params.accessToken,
    });

    return data as ApiResponse<null>;
  }
);

export const endRoom = createAsyncThunk(
  "watchTogetherV2/endRoom",
  async (
    params: { roomId: string; accessToken: string },
    thunkAPI
  ): Promise<ApiResponse<LiveActionResponse>> => {
    const data = await callApi({
      url: `${BASE_URL}/endRoom/${params.roomId}`,
      method: "PATCH",
      accessToken: params.accessToken,
    });

    return data as ApiResponse<LiveActionResponse>;
  }
);

export const startLive = createAsyncThunk(
  "watchTogetherV2/startLive",
  async (
    params: { roomId: string; accessToken: string },
    thunkAPI
  ): Promise<ApiResponse<LiveActionResponse>> => {
    const data = await callApi({
      url: `${BASE_URL}/room/${params.roomId}/startLive`,
      method: "PATCH",
      accessToken: params.accessToken,
    });

    return data as ApiResponse<LiveActionResponse>;
  }
);

export const kickUser = createAsyncThunk(
  "watchTogetherV2/kickUser",
  async (
    params: { roomId: string; userId: string; accessToken: string },
    thunkAPI
  ): Promise<ApiResponse<KickUserResponse>> => {
    const data = await callApi({
      url: `${BASE_URL}/room/${params.roomId}/kickUser`,
      method: "PATCH",
      body: {
        userId: params.userId,
      },
      accessToken: params.accessToken,
    });

    return data as ApiResponse<KickUserResponse>;
  }
);
