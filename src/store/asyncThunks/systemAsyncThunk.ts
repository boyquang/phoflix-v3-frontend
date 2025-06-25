import { createAsyncThunk } from "@reduxjs/toolkit";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const ENVIRONMENT = process.env.ENV;

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
        `${BACKEND_URL}/search/top-trending?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch top search trending");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (ENVIRONMENT === "development") {
        console.log("Error in getTopSearchTrending:", error);
      }
      throw error;
    }
  }
);
