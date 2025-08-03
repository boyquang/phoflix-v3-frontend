import {
  ENV,
  NEXT_PUBLIC_API_VERSION,
  NEXT_PUBLIC_BACKEND_URL,
} from "../../constants/env.contant";

const BASE_URL = `${NEXT_PUBLIC_BACKEND_URL}/api/${NEXT_PUBLIC_API_VERSION}/feedback`;

/**
 *
 * @param movieSlug: string - slug of the movie
 * @param limit: number - number of feedbacks to fetch
 * @param type: string - type of feedback (review or comment)
 * @returns  { status: boolean; message: string; result: any; }
 */

export const getFeedbacks = async ({
  movieSlug,
  limit,
  type,
}: GetFeedbacks): Promise<any> => {
  try {
    const params = new URLSearchParams({
      movieSlug,
      limit: limit.toString(),
      type,
    });

    const url = `${BASE_URL}/list?${params.toString()}`;

    const response = await fetch(url);

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
      console.log("Error fetching feedbacks:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: {
        has_more: false,
        item_count: 0,
        items: [],
      },
    };
  }
};

/**
 *
 * @param movieSlug: string - slug of the movie
 * @param point: number - point of the feedback (1-10)
 * @param userId: string - id of the user
 * @param content: string - content of the feedback
 * @param type: string - type of feedback (review or comment)
 * @param accessToken: string - access token of the user
 * @param is_anonymous: boolean - is anonymous feedback (default: false)
 * @returns { status: boolean; message: string; result: any; }
 */

export const addFeedback = async ({
  movieSlug,
  point,
  userId,
  content,
  type,
  accessToken,
  is_anonymous = false,
}: AddFeedback): Promise<any> => {
  try {
    const url = `${BASE_URL}/add`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        movieSlug,
        point,
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
    if (ENV === "development") {
      console.log("Error adding feedbacks:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

/**
 *
 * @param feedbackId: string - id of the feedback to delete
 * @param userId: string - id of the user
 * @param accessToken: string - access token of the user
 * @returns { status: boolean; message: string; result: any; }
 */

export const deleteFeedback = async ({
  feedbackId,
  userId,
  accessToken,
}: DeleteFeedback): Promise<any> => {
  try {
    const params = new URLSearchParams({
      feedbackId,
      userId,
    });

    const url = `${BASE_URL}/delete?${params.toString()}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
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
      console.log("Error delete feedbacks:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

/**
 *
 * @param feedbackId: string - id of the feedback to update
 * @param userId: string - id of the user
 * @param content: string - new content of the feedback
 * @param accessToken: string - access token of the user
 * @returns { status: boolean; message: string; result: any; }
 */

export const updateContentFeedback = async ({
  feedbackId,
  userId,
  content,
  accessToken,
}: UpdateContentFeedback): Promise<any> => {
  try {
    const url = `${BASE_URL}/update`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        feedbackId,
        userId,
        content,
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
      console.log("Error updating feedbacks:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

/**
 *
 * @param movieSlug: string - slug of the movie
 * @param userId: string - id of the user
 * @param content: string - content of the reply
 * @param type: string - type of feedback (review or comment)
 * @param parentId: string - id of the parent feedback
 * @param accessToken: string - access token of the user
 * @param is_anonymous: boolean - is anonymous feedback (default: false)
 * @returns { status: boolean; message: string; result: any; }
 */

export const addReply = async ({
  movieSlug,
  userId,
  content,
  type,
  parentId,
  accessToken,
  is_anonymous = false,
}: AddReplyFeedback): Promise<any> => {
  try {
    const url = `${BASE_URL}/reply`;

    const response = await fetch(url, {
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
        parentId,
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
    if (ENV === "development") {
      console.log("Error adding reply feedbacks:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

/**
 *
 * @param movieSlug: string - slug of the movie
 * @returns { status: boolean; message: string; result: any; }
 */

export const getStatsByMovie = async (movieSlug: string): Promise<any> => {
  try {
    const params = new URLSearchParams({
      movieSlug,
    });

    const url = `${BASE_URL}/statsByMovie?${params.toString()}`;

    const response = await fetch(url);

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
      console.log("Error fetching stats by movie:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: {
        average_point: 0,
        total_reviews: 0,
      },
    };
  }
};

/**
 *
 * @param movieSlug: string - slug of the movie
 * @param userId: string - id of the user
 * @param feedbackId: string - id of the feedback to vote
 * @param voteType: string - type of vote (upvote or downvote)
 * @param accessToken: string - access token of the user
 * @returns { status: boolean; message: string; result: any; }
 */

export const addVote = async ({
  movieSlug,
  userId,
  feedbackId,
  voteType,
  accessToken,
}: VoteFeedback): Promise<any> => {
  try {
    const url = `${BASE_URL}/vote`;

    const response = await fetch(url, {
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
};
