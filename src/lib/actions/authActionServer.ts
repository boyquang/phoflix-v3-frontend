"use server";

import { signIn } from "@/auth";
import { ENV, NEXT_PUBLIC_BACKEND_URL } from "../env";

/**
 *
 * @param email: string - email of the user
 * @param password : string - password of the user
 * @returns { status: boolean; message: string; }
 */

export async function authenticate(
  email: string,
  password: string
): Promise<any> {
  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
      callbackUrl: "/",
    });

    return {
      status: true,
      message: "Đăng nhập thành công!",
    };
  } catch (error: any) {
    if (ENV === "development") {
      console.log("Error fetching login:", error);
    }

    switch (error?.code) {
      case "INVALID_CREDENTIALS":
        return {
          status: false,
          message: error?.details,
        };
      case "BANNED_ACCOUNT": {
        return {
          status: false,
          message: error?.details,
        };
      }
      default:
        return {
          status: false,
          message: error?.details,
        };
    }
  }
}

/**
 *
 * @param email: string - email of the user
 * @param password: string - password of the user
 * @param typeAccount: string - type of account (credentials or google)
 * @returns { status: boolean; message: string; result: any; code: string; }
 */

export async function login({
  email,
  password,
  typeAccount,
}: Login): Promise<any> {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        typeAccount,
      }),
    });

    const data = await response.json();

    console.log("Login response:", data);

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
      console.log("Error fetching login:", error);
    }
    return {
      status: false,
      message: "Đã có lỗi xảy ra, vui lòng thử lại!",
    };
  }
}

/**
 *
 * @param email: string - email of the user
 * @param password: string - password of the user
 * @param name: string - name of the user
 * @param typeAccount: string - type of account (credentials or google)
 * @param avatar: string - avatar of the user
 * @returns { status: boolean; message: string; result: any;}
 */

export async function register({
  email,
  password,
  name,
  typeAccount,
  avatar,
}: any): Promise<any> {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
        typeAccount,
        avatar,
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
      console.log("Error fetching register:", error);
    }
    return {
      status: false,
      message: "Đã có lỗi xảy ra, vui lòng thử lại!",
    };
  }
}

/**
 *
 * @param email - email of the user
 * @param typeAccount - type of account (credentials or google)
 * @returns { status: boolean; message: string; result: any;}
 */

export async function forgotPassword(
  email: string,
  typeAccount: "credentials"
): Promise<any> {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
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
      console.log("Error fetching forgot password:", error);
    }
    return {
      status: false,
      message: "Đã có lỗi xảy ra, vui lòng thử lại!",
    };
  }
}

/**
 *
 * @param token - token to verify
 * @returns { status: boolean; message: string; result: any;}
 */

export async function verifyToken(token: string): Promise<any> {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/auth/verify-token?token=${token}`
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
      console.log("Error fetching verify token:", error);
    }
    return {
      status: false,
      message: "Đã có lỗi xảy ra, vui lòng thử lại!",
    };
  }
}

/**
 *
 * @param token - token to complete registration
 * @returns { status: boolean; message: string; result: any;}
 */

export async function completeRegistration(token: string) {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/auth/complete-registration?token=${token}`
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
      console.log("Error fetching complete registration:", error);
    }
    return {
      status: false,
      message: "Đã có lỗi xảy ra, vui lòng thử lại!",
    };
  }
}

/**
 *
 * @param email - email of the user
 * @param password - new password of the user
 * @param token - token to reset password
 * @returns { status: boolean; message: string; result: any;}
 */

export async function resetPassword({
  email,
  password,
}: ResetPassword): Promise<any> {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
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
      console.log("Error fetching reset password:", error);
    }
    return {
      status: false,
      message: "Đã có lỗi xảy ra, vui lòng thử lại!",
    };
  }
}

/**
 *
 * @param email - email of the user
 * @param name - name of the user
 * @param avatar - avatar of the user
 * @param typeAccount - type of account (credentials or google)
 * @param password - password of the user
 * @returns { status: boolean; message: string; result: any;}
 */

export const registerGoogleAccount = async ({
  email,
  name,
  avatar,
  typeAccount,
  password,
}: RegisterGoogleAccount) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        avatar,
        typeAccount,
        password,
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
      console.log("Error fetching register:", error);
    }
    return {
      status: false,
      message: "Đã có lỗi xảy ra, vui lòng thử lại!",
    };
  }
};
