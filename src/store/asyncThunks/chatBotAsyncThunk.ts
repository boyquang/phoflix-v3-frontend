import { clearHistory, getChatHistory } from "@/lib/actions/chatBotAction";
import { createAsyncThunk } from "@reduxjs/toolkit";

const ENVIRONMENT = process.env.ENV;

interface FetchChatHistoryParams {
  userId: string;
  limit?: number;
  before?: number;
}

export const fetchChatHistory = createAsyncThunk(
  "chatBot/fetchChatHistory",
  async (params: FetchChatHistoryParams) => {
    try {
      const response = await getChatHistory(params);

      return response;
    } catch (error) {
      if (ENVIRONMENT === "development") {
        console.log("Error in fetchDataSlideShow:", error);
      }
      throw error;
    }
  }
);

interface ClearChatHistoryParams {
  userId: string;
  accessToken: string;
}

export const clearChatHistory = createAsyncThunk(
  "chatBot/clearChatHistory",
  async ({ userId, accessToken }: ClearChatHistoryParams) => {
    try {
      const response = await clearHistory(userId, accessToken);

      return response;
    } catch (error) {
      console.error("Error in clearChatHistory:", error);
      throw error;
    }
  }
);
