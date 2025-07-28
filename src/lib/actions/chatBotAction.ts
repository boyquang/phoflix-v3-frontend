import { NEXT_PUBLIC_BACKEND_URL } from "../env";

interface GetChatHistoryParams {
  userId: string;
  limit?: number;
  before?: string | number;
}

export const getChatHistory = async (params: GetChatHistoryParams) => {
  try {
    const { userId, limit, before } = params;

    const baseUrl = `${NEXT_PUBLIC_BACKEND_URL}/chatBot/history`;

    const queryParams = new URLSearchParams({
      userId,
      ...(limit && { limit: limit.toString() }),
      ...(before && { before: before.toString() }),
    });

    const response = await fetch(`${baseUrl}?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

interface CompletionsParams {
  userId: string;
  prompt: string;
  accessToken: string;
}

export const completions = async (params: CompletionsParams) => {
  try {
    const { userId, prompt, accessToken } = params;

    const baseUrl = `${NEXT_PUBLIC_BACKEND_URL}/chatBot/completions`;

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ prompt, userId }),
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
  userId: string;
  question: string;
  reply: string;
  accessToken: string;
}

export const saveMessage = async (params: SaveMessageParams) => {
  try {
    const { userId, question, reply, accessToken } = params;

    const baseUrl = `${NEXT_PUBLIC_BACKEND_URL}/chatBot/saveMessage`;

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ userId, question, reply }),
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

export const clearHistory = async (userId: string, accessToken: string) => {
  try {
    const baseUrl = `${NEXT_PUBLIC_BACKEND_URL}/chatBot/clearHistory`;

    const response = await fetch(baseUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ userId }),
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
