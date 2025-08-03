import {
  ENV,
  NEXT_PUBLIC_API_VERSION,
  NEXT_PUBLIC_BACKEND_URL,
} from "../../constants/env.contant";

const BASE_URL = `${NEXT_PUBLIC_BACKEND_URL}/api/${NEXT_PUBLIC_API_VERSION}/event`;

export const getEventList = async (accessToken?: string): Promise<any> => {
  try {
    const url = `${BASE_URL}/list`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken || ""}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const { status, message } = data || {};

      return {
        status: status || false,
        message: message || "Lỗi server! Vui lòng thử lại sau.",
        result: null,
        errorType: "ServerError",
      };
    }

    return data;
  } catch (error) {
    if (ENV === "development") {
      console.log("Error fetching event list:", error);
    }

    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
      errorType: "ServerError",
    };
  }
};

export const createEvent = async (
  eventData: EventData,
  accessToken: string
): Promise<any> => {
  try {
    const url = `${BASE_URL}/createEvent`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(eventData),
    });

    const data = await response.json();

    if (!response.ok) {
      const { status, message } = data || {};

      return {
        status: status || false,
        message: message || "Lỗi server! Vui lòng thử lại sau.",
        result: null,
        errorType: "ServerError",
      };
    }

    return data;
  } catch (error) {
    if (ENV === "development") {
      console.log("Error creating event:", error);
    }

    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
      errorType: "ServerError",
    };
  }
};

export const deleteEvent = async (
  eventId: string,
  accessToken: string
): Promise<any> => {
  try {
    const url = `${BASE_URL}/deleteEvent/${eventId}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const { status, message } = data || {};

      return {
        status: status || false,
        message: message || "Lỗi server! Vui lòng thử lại sau.",
        result: null,
        errorType: "ServerError",
      };
    }

    return data;
  } catch (error) {
    if (ENV === "development") {
      console.log("Error deleting event:", error);
    }

    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
      errorType: "ServerError",
    };
  }
};

export const updateEvent = async (
  eventId: string,
  eventData: EventData,
  accessToken: string
): Promise<any> => {
  try {
    const url = `${BASE_URL}/updateEvent/${eventId}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(eventData),
    });

    const data = await response.json();

    if (!response.ok) {
      const { status, message } = data || {};

      return {
        status: status || false,
        message: message || "Lỗi server! Vui lòng thử lại sau.",
        result: null,
        errorType: "ServerError",
      };
    }

    return data;
  } catch (error) {
    if (ENV === "development") {
      console.log("Error updating event:", error);
    }

    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
      errorType: "ServerError",
    };
  }
};
