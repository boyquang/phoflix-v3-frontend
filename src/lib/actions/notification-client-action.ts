import {
  ENV,
  NEXT_PUBLIC_API_VERSION,
  NEXT_PUBLIC_BACKEND_URL,
} from "../../constants/env.contant";

const BASE_URL = `${NEXT_PUBLIC_BACKEND_URL}/api/${NEXT_PUBLIC_API_VERSION}/notification`;

/**
 *
 * @param limit: number - number of notifications to fetch
 * @param type: string - type of notification ("community" | "individual")
 * @param userId: string - id of the user
 * @param afterTime: number - time to fetch notifications after this time (timestamp in milliseconds)
 * @returns { status: boolean; message: string; result: any; }
 */

export const getNotifications = async ({
  limit,
  type,
  userId,
  afterTime,
}: GetNotifications): Promise<any> => {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      type,
    });

    if (userId) params.append("userId", userId);
    if (afterTime) params.append("afterTime", afterTime.toString());

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
      console.log("Error fetching notifications:", error);
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
 * @param userId: string - id of the user to create notification for
 * @param senderId: string - id of the sender of the notification
 * @param type: string - type of notification (community | individual)
 * @param content: string - content of the notification
 * @param href: string - link to redirect when click on the notification
 * @param image: string - image of the notification
 * @param accessToken: string - access token of the user
 * @returns { status: boolean; message: string; result: any; }
 */

export const createNotification = async ({
  userId,
  senderId,
  type,
  content,
  href,
  image,
  accessToken,
}: CreateNotification): Promise<any> => {
  try {
    const url = `${BASE_URL}/create`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        userId,
        senderId,
        type,
        content,
        href,
        image,
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
      console.log("Error creating notification:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};
