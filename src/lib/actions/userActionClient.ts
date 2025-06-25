"use client";

import { ENV, NEXT_PUBLIC_BACKEND_URL } from "../env";

/**
 *
 * @param userId: string - id of the user
 * @param username: string - username of the user
 * @param gender: string - gender of the user
 * @param avatar: string - avatar of the user
 * @param typeAccount: string - type of account ("credentials" | "google")
 * @param accessToken: string - access token of the user
 * @returns { status: boolean, message: string, result: any }
 */

export const updateUserProfile = async ({
  userId,
  username,
  gender,
  avatar,
  typeAccount,
  accessToken,
}: UpdateUserProflie): Promise<any> => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        userId,
        username,
        gender,
        avatar,
        typeAccount,
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
      console.error("Error updating user profile:", error);
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
 * @param email: string - email of the user
 * @param newPassword: string - new password of the user
 * @param oldPassword: string - old password of the user
 * @param typeAccount: string - type of account ("credentials" | "google")
 * @param accessToken: string - access token of the user
 * @returns { status: boolean, message: string, result: any }
 */

export const resetPassword = async ({
  email,
  newPassword,
  oldPassword,
  typeAccount,
  accessToken,
}: UpdateUserPassword): Promise<any> => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/user/reset-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          email,
          newPassword,
          oldPassword,
          typeAccount,
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
      console.error("Error updating user password:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};
