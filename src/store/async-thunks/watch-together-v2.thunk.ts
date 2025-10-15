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
  async (params: GetRoomDataParams, thunkAPI): Promise<GetRoomDataResponse> => {
    const data = await callApi({
      url: `${BASE_URL}/roomData/${params.roomId}`,
      accessToken: params.accessToken,
    });

    return data as GetRoomDataResponse;
  }
);

interface CreateRoomParams {
  data: FormNewRoom;
  accessToken: string;
}

export const createRoom = createAsyncThunk(
  "watchTogetherV2/createRoom",
  async (params: CreateRoomParams, thunkAPI): Promise<GetRoomDataResponse> => {
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

    return data as GetRoomDataResponse;
  }
);

interface JoinRoomParams {
  roomId: string;
  accessToken: string;
}

export const joinRoom = createAsyncThunk(
  "watchTogetherV2/joinRoom",
  async (params: JoinRoomParams, thunkAPI) => {
    const data = await callApi({
      url: `${BASE_URL}/joinRoom/${params.roomId}`,
      method: "POST",
      accessToken: params.accessToken,
    });

    return data as GetRoomDataResponse;
  }
);
