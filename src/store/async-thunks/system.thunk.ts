import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ENV,
  NEXT_PUBLIC_BACKEND_URL,
  NEXT_PUBLIC_API_VERSION,
} from "@/constants/env.contant";

/**
 * * @param limit - The maximum number of trending items to fetch.
 * * @returns { status: boolean; message: string; result: any;}
 */

export const getTopSearchTrending = createAsyncThunk(
  "user/getTopSearchTrending",
  async ({ limit = 10 }: { limit?: number }) => {
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
      });

      const response = await fetch(
        `${NEXT_PUBLIC_BACKEND_URL}/api/${NEXT_PUBLIC_API_VERSION}/search/top-trending?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch top search trending");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (ENV === "development") {
        console.log("Error in getTopSearchTrending:", error);
      }
      throw error;
    }
  }
);
