import { ENV, NEXT_PUBLIC_BACKEND_URL } from "@/lib/env";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const ENVIRONMENT = process.env.ENV;

/**
 * @param movieSlug - The slug of the movie.
 * @param type - The type of feedback (review, comment).
 * @param limit - The maximum number of feedbacks to fetch.
 * @returns { status: boolean; message: string; result: any;}
 */

export const getFeedbacks = createAsyncThunk(
  "feedback/getFeedbacks",
  async ({ movieSlug, type, limit }: GetFeedbacks) => {
    try {
      const params = new URLSearchParams({
        movieSlug,
        limit: limit.toString(),
        type,
      });

      const response = await fetch(
        `${BACKEND_URL}/feedback/list?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch feedbacks");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (ENVIRONMENT === "development") {
        console.log("Error in getFeedbacks:", error);
      }
      throw error;
    }
  }
);

/**
 * * @param movieSlug - The slug of the movie.
 * * @param type - The type of feedback (review, comment).
 * * @param limit - The maximum number of feedbacks to fetch.
 * * @param afterTime - The time after which to fetch more feedbacks.
 * * @returns { status: boolean; message: string; result: any;}
 */

export const getMoreFeedbacks = createAsyncThunk(
  "feedback/getMoreFeedbacks",
  async ({ movieSlug, type, limit, afterTime }: GetMoreFeedbacks) => {
    try {
      const params = new URLSearchParams({
        movieSlug,
        limit: limit.toString(),
        type,
        afterTime: afterTime.toString(),
      });

      const response = await fetch(
        `${BACKEND_URL}/feedback/list?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch more feedbacks");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (ENVIRONMENT === "development") {
        console.log("Error in getMoreFeedbacks:", error);
      }
      throw error;
    }
  }
);

/**
 * @param parentId - The ID of the parent feedback.
 * @param limit - The maximum number of reply feedbacks to fetch.
 * @param type - The type of feedback (review, comment).
 * @returns { status: boolean; message: string; result: any;}
 */

export const getReplyListFeedback = createAsyncThunk(
  "feedback/getReplyListFeedback",
  async ({ parentId, limit, type }: GetReplyListFeedback) => {
    if (!parentId) return;

    try {
      const params = new URLSearchParams({
        parentId,
        limit: limit.toString(),
        type,
      });

      const response = await fetch(
        `${BACKEND_URL}/feedback/replyList?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch reply feedbacks");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (ENVIRONMENT === "development") {
        console.log("Error in getReplyListFeedback:", error);
      }
      throw error;
    }
  }
);

/**
 * @param parentId - The ID of the parent feedback.
 * @param limit - The maximum number of reply feedbacks to fetch.
 * @param type - The type of feedback (review, comment).
 * @param afterTime - The time after which to fetch more reply feedbacks.
 * @returns { status: boolean; message: string; result: any;}
 */

export const getMoreReplyListFeedback = createAsyncThunk(
  "feedback/getMoreReplyListFeedback",
  async ({ parentId, limit, type, afterTime }: GetMoreReplyListFeedback) => {
    try {
      const params = new URLSearchParams({
        parentId,
        limit: limit.toString(),
        type,
        afterTime: afterTime.toString(),
      });

      const response = await fetch(
        `${BACKEND_URL}/feedback/replyList?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch more reply feedbacks");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (ENVIRONMENT === "development") {
        console.log("Error in getMoreReplyListFeedback:", error);
      }
      throw error;
    }
  }
);

/**
 * * @param movieSlug - The slug of the movie.
 * * @returns { status: boolean; message: string; result: any;}
 */

export const getVoteListFeedback = createAsyncThunk(
  "feedback/getVoteListFeedback",
  async (movieSlug: string) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/feedback/voteList?movieSlug=${movieSlug}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch vote feedbacks");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (ENVIRONMENT === "development") {
        console.log("Error in getVoteListFeedback:", error);
      }
      throw error;
    }
  }
);

/**
 * * @param feedbackId - The ID of the feedback to delete.
 * * @param accessToken - The access token of the user.
 * * @param userId - The ID of the user.
 * * @returns { status: boolean; message: string; result: any;}
 */

export const deleteFeedback = createAsyncThunk(
  "feedback/deleteFeedback",
  async ({
    feedbackId,
    accessToken,
    userId,
    rootFeedbackId = null,
  }: DeleteFeedback) => {
    try {
      const params = new URLSearchParams({
        feedbackId,
        userId,
      });

      const response = await fetch(
        `${NEXT_PUBLIC_BACKEND_URL}/feedback/delete?${params.toString()}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const { status, message, result } = data || {};

        return {
          status: status || false,
          message: message || "Lỗi server! Vui lòng thử lại sau.",
          result: result || null,
        };
      }

      return data;
    } catch (error) {
      if (ENVIRONMENT === "development") {
        console.log("Error in deleteFeedback:", error);
      }
      throw error;
    }
  }
);

/**
 * * @param feedbackId - The ID of the feedback to update.
 * * @param content - The new content for the feedback.
 * * @param userId - The ID of the user updating the feedback.
 * * @param accessToken - The access token of the user.
 * * @returns { status: boolean; message: string; result: any;}
 */

export const updateContentFeedback = createAsyncThunk(
  "feedback/updateContentFeedback",
  async ({
    feedbackId,
    content,
    userId,
    accessToken,
    rootFeedbackId = null,
  }: UpdateContentFeedback) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_BACKEND_URL}/feedback/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            feedbackId,
            content,
            userId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const { status, message, result } = data || {};

        return {
          status: status || false,
          message: message || "Lỗi server! Vui lòng thử lại sau.",
          result: result || null,
        };
      }

      return data;
    } catch (error) {
      if (ENVIRONMENT === "development") {
        console.log("Error in updateContentFeedback:", error);
      }
      throw error;
    }
  }
);

/**
 * * @param movieSlug - The slug of the movie.
 * * @param userId - The ID of the user adding the feedback.
 * * @param content - The content of the feedback.
 * * @param type - The type of feedback (review, comment).
 * * @param is_anonymous - Whether the feedback is anonymous.
 * * @param accessToken - The access token of the user.
 * * @returns { status: boolean; message: string; result: any;}
 */

export const addFeedback = createAsyncThunk(
  "feedback/addFeedback",
  async ({
    movieSlug,
    userId,
    content,
    type,
    is_anonymous,
    accessToken,
  }: AddFeedback) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/feedback/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          movieSlug,
          userId,
          content,
          type,
          is_anonymous,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const { status, message, result } = data || {};

        return {
          status: status || false,
          message: message || "Lỗi server! Vui lòng thử lại sau.",
          result: result || null,
        };
      }

      return data;
    } catch (error) {
      if (ENVIRONMENT === "development") {
        console.log("Error in addNewFeedback:", error);
      }
      throw error;
    }
  }
);

export const addVote = createAsyncThunk(
  "feedback/addVote",
  async ({
    movieSlug,
    userId,
    feedbackId,
    voteType,
    accessToken,
  }: VoteFeedback) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/feedback/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          movieSlug,
          userId,
          feedbackId,
          voteType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const { status, message, result } = data || {};

        return {
          status: status || false,
          message: message || "Lỗi server! Vui lòng thử lại sau.",
          result: result || null,
        };
      }

      return data;
    } catch (error) {
      if (ENV === "development") {
        console.log("Error adding vote feedbacks:", error);
      }
      return {
        status: false,
        message: "Lỗi server! Vui lòng thử lại sau.",
        result: null,
      };
    }
  }
);
