import {
  NEXT_PUBLIC_API_VERSION,
  NEXT_PUBLIC_CRAWL_MOVIES_URL,
} from "../../constants/env.contant";

const BASE_URL = `${NEXT_PUBLIC_CRAWL_MOVIES_URL}/api/${NEXT_PUBLIC_API_VERSION}/chat-bot`;

interface GetChatHistoryParams {
  userId: string;
  accessToken: string;
  limit?: number;
  before?: string | number;
}

export const getChatHistory = async (params: GetChatHistoryParams) => {
  try {
    const { limit, before, accessToken } = params;

    const queryParams = new URLSearchParams({
      ...(limit && { limit: limit.toString() }),
      ...(before && { before: before.toString() }),
    });

    const url = `${BASE_URL}/history?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error fetching chat history:", data.message);
      return {
        status: false,
        message: data.message || "Failed to fetch chat history",
        result: null,
        statusCode: response.status,
      };
    }

    return {
      status: true,
      message: "Chat history fetched successfully",
      result: data.result || [],
      statusCode: response.status,
    };
  } catch (error) {
    console.error("Error in getChatHistory:", error);
    return {
      status: false,
      message: "Internal server error",
      result: null,
      statusCode: 500,
    };
  }
};

interface SendMessageParams {
  prompt: string;
  accessToken: string;
}

export const sendMessage = async (params: SendMessageParams) => {
  try {
    const { prompt, accessToken } = params;

    const url = `${BASE_URL}/send-message`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ question: prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: false,
        message: data.message || "Failed to fetch completions",
        result: null,
        statusCode: response.status,
      };
    }

    return {
      status: true,
      message: "Completions fetched successfully",
      result: data.result || {},
      statusCode: response.status,
    };
  } catch (error) {
    console.error("Error in completions:", error);
    return {
      status: false,
      message: "Internal server error",
      result: null,
      statusCode: 500,
    };
  }
};

interface SaveMessageParams {
  question: string;
  reply: string;
  accessToken: string;
}

export const saveMessage = async (params: SaveMessageParams) => {
  try {
    const { question, reply, accessToken } = params;

    const url = `${BASE_URL}/save-message`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ question, reply }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error saving message:", data.message);
      return {
        status: false,
        message: data.message || "Failed to save message",
        result: null,
        statusCode: response.status,
      };
    }

    return {
      status: true,
      message: "Message saved successfully",
      result: data.result || {},
      statusCode: response.status,
    };
  } catch (error) {
    console.error("Error in saveMessage:", error);
    return {
      status: false,
      message: "Internal server error",
      result: null,
      statusCode: 500,
    };
  }
};

export const clearHistory = async (accessToken: string) => {
  try {
    const url = `${BASE_URL}/clear`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error clearing history:", data.message);
      return {
        status: false,
        message: data.message || "Failed to clear history",
        result: null,
        statusCode: response.status,
      };
    }

    return {
      status: true,
      message: data.message || "History cleared successfully",
      result: data.result || {},
      statusCode: response.status,
    };
  } catch (error) {
    console.error("Error in clearHistory:", error);
    return {
      status: false,
      message: "Internal server error",
      result: null,
      statusCode: 500,
    };
  }
};
