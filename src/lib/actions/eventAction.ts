import { ENV, NEXT_PUBLIC_BACKEND_URL } from "../env";

export const getEventList = async (accessToken?: string): Promise<any> => {
  try {
    const baseUrl = `${NEXT_PUBLIC_BACKEND_URL}/event/list`;

    const response = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken || ""}`,
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
      console.log("Error fetching event list:", error);
    }

    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

export const createEvent = async (
  eventData: EventData,
  accessToken: string
): Promise<any> => {
  try {
    const baseUrl = `${NEXT_PUBLIC_BACKEND_URL}/event/createEvent`;
    const body = JSON.stringify(eventData);
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body,
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
      console.log("Error creating event:", error);
    }

    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

export const deleteEvent = async (
  eventId: string,
  accessToken: string
): Promise<any> => {
  try {
    const baseUrl = `${NEXT_PUBLIC_BACKEND_URL}/event/deleteEvent/${eventId}`;

    const response = await fetch(baseUrl, {
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
      console.log("Error deleting event:", error);
    }

    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

export const updateEvent = async (
  eventId: string,
  eventData: EventData,
  accessToken: string
): Promise<any> => {
  try {
    const baseUrl = `${NEXT_PUBLIC_BACKEND_URL}/event/updateEvent/${eventId}`;
    const body = JSON.stringify(eventData);
    const response = await fetch(baseUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body,
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
      console.log("Error updating event:", error);
    }

    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};
