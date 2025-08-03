import {
  NEXT_PUBLIC_API_VERSION,
  NEXT_PUBLIC_BACKEND_URL,
} from "../../constants/env.contant";

const BASE_URL = `${NEXT_PUBLIC_BACKEND_URL}/api/${NEXT_PUBLIC_API_VERSION}/telegram`;

export const getGroupChatInfo = async (chatId: string) => {
  try {
    const params = new URLSearchParams({
      chat_id: chatId,
    });

    const url = `${BASE_URL}/group-chat-info?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
    console.error("Error getting group chat info:", error);
    return {
      status: false,
      message: "Error getting group chat info",
      result: null,
      statusCode: 500,
    };
  }
};

export const getTokens = async (userId: string) => {
  try {
    const params = new URLSearchParams({
      userId,
    });

    const url = `${BASE_URL}/tokens?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const { status, message, result } = data || {};

      return {
        status: status || false,
        message: message || "Lỗi server! Vui lòng thử lại sau.",
        result: result || null,
        errorType: "ServerError",
      };
    }

    return data;
  } catch (error) {
    console.error("Error getting tokens:", error);
    return {
      status: false,
      message: "Error getting tokens",
      result: null,
      errorType: "ServerError",
    };
  }
};

export const updateToken = async (token: string, userId: string) => {
  try {
    const url = `${BASE_URL}/update-token`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, userId }),
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
    console.error("Error updating token:", error);
    return {
      status: false,
      message: "Error updating token",
      result: null,
      statusCode: 500,
    };
  }
};

export const showToken = async (userId: string, tokenId: string) => {
  try {
    const url = `${BASE_URL}/show-token`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, tokenId }),
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
    console.error("Error showing token:", error);
    return {
      status: false,
      message: "Error showing token",
      result: null,
      statusCode: 500,
    };
  }
};
