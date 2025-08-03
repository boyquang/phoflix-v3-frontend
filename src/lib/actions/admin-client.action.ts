import {
  ENV,
  NEXT_PUBLIC_API_VERSION,
  NEXT_PUBLIC_BACKEND_URL,
} from "../../constants/env.contant";

const BASE_URL = `${NEXT_PUBLIC_BACKEND_URL}/api/${NEXT_PUBLIC_API_VERSION}/admin`;

/**
 *
 * @param senderId: string - id of the sender
 * @param type: string - type of notification (community)
 * @param content: string - content of the notification
 * @param href: string - link to redirect when click on the notification
 * @param image: string - image of the notification
 * @param accessToken: string - access token of the user
 * @returns { status: boolean; message: string; result: any; }
 */

export const createNotification = async ({
  senderId,
  type,
  content,
  href,
  image,
  accessToken,
}: CreateNotificationServer) => {
  try {
    const url = `${BASE_URL}/notification`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
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
      console.log("Error create notification", error);
    }
    throw error;
  }
};

/**
 *
 * @param notificationId: string - id of the notification to delete
 * @param userId: string - id of the user
 * @param accessToken: string - access token of the user
 * @returns { status: boolean; message: string; result: any; }
 */

export const deleteNotification = async ({
  notificationId,
  userId,
  accessToken,
}: DeleteNotificationServer) => {
  try {
    const params = new URLSearchParams({
      notificationId,
      userId,
    });

    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/${NEXT_PUBLIC_API_VERSION}/admin/notification/?${params.toString()}`,
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
    if (ENV === "development") {
      console.log("Error delete notification", error);
    }
    throw error;
  }
};

/**
 *
 * @param notificationId: string - id of the notification to update
 * @param userId: string - id of the user
 * @param content: string - content of the notification
 * @param href: string - link to redirect when click on the notification
 * @param image: string - image of the notification
 * @param accessToken: string - access token of the user
 * @returns { status: boolean; message: string; result: any; }
 */

export const updateNotification = async ({
  notificationId,
  userId,
  content,
  href,
  image,
  accessToken,
}: UpdateNotificationServer) => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/${NEXT_PUBLIC_API_VERSION}/admin/notification`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          notificationId,
          userId,
          content,
          href,
          image,
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
    if (ENV === "development") {
      console.log("Error update notification", error);
    }
    throw error;
  }
};

/**
 *
 * @param userId: string - id of the user to change role
 * @param adminId: string - id of the admin
 * @param role: string - new role of the user (admin, memeber)
 * @param accessToken: string - access token of the user
 * @returns { status: boolean; message: string; result: any; }
 */

export const changeRoleUser = async ({
  userId,
  adminId,
  role,
  accessToken,
}: ChangeRoleUser) => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/${NEXT_PUBLIC_API_VERSION}/admin/user/changeRoleUser`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          userId,
          adminId,
          role,
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
    if (ENV === "development") {
      console.log("Error change role user", error);
    }
    throw error;
  }
};

/**
 *
 * @param userId: string - id of the user to change status
 * @param adminId: string - id of the admin
 * @param status: string - new status of the user (active, banned)
 * @param accessToken: string - access token of the user
 * @returns { status: boolean; message: string; result: any; }
 */

export const changeStatusUser = async ({
  userId,
  adminId,
  status,
  accessToken,
}: ChangeStatusUser) => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/${NEXT_PUBLIC_API_VERSION}/admin/user/changeStatusUser`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          userId,
          adminId,
          status,
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
    if (ENV === "development") {
      console.log("Error change status user", error);
    }
    throw error;
  }
};

/**
 *
 * @param feedbackId: string - id of the feedback to mark as spam
 * @param adminId: string - id of the admin
 * @param accessToken: string - access token of the user
 * @param spam: boolean - true if the feedback is spam, false otherwise
 * @returns { status: boolean; message: string; result: any; }
 */

export const markFeedbackAsSpam = async ({
  feedbackId,
  adminId,
  accessToken,
  spam,
}: MarkFeedbackAsSpam) => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/${NEXT_PUBLIC_API_VERSION}/admin/feedback/markFeedbackAsSpam`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          feedbackId,
          spam,
          adminId,
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
    if (ENV === "development") {
      console.log("Error mark feedback as spam", error);
    }
    throw error;
  }
};

interface MovieRequestProcess {
  adminId: string;
  status: MovieRequestStatus | null;
  requestId: string;
  adminResponse: string;
  accessToken: string;
}

export const movieRequestProcess = async ({
  adminId,
  adminResponse,
  accessToken,
  status,
  requestId,
}: MovieRequestProcess) => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/${NEXT_PUBLIC_API_VERSION}/admin/movie-request/process`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          adminId,
          status,
          requestId,
          adminResponse,
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
    if (ENV === "development") {
      console.log("Error processing movie request", error);
    }
    throw error;
  }
};
