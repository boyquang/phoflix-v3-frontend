import { NEXT_PUBLIC_BACKEND_URL, NEXT_PUBLIC_SITE_URL } from "../env";
import { fetcher } from "../fetcher";

export const getGroupChatInfo = async (chatId: string) => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/telegram/group-chat-info?chat_id=${chatId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/telegram/tokens?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
    console.error("Error getting tokens:", error);
    return {
      status: false,
      message: "Error getting tokens",
      result: null,
      statusCode: 500,
    };
  }
};

export const updateToken = async (token: string, userId: string) => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/telegram/update-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, userId }),
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
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/telegram/show-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, tokenId }),
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
    console.error("Error showing token:", error);
    return {
      status: false,
      message: "Error showing token",
      result: null,
      statusCode: 500,
    };
  }
};
