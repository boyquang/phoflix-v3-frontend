"use client";

import { PasswordInput } from "@/components/ui/password-input";
import useNotification from "@/hooks/useNotification";
import { authenticate } from "@/lib/actions/authActionServer";
import { isValidEmail } from "@/lib/utils";
import { setTypeAuth } from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import { Box, Button, Field, Input } from "@chakra-ui/react";
import { delay } from "lodash";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";
import { useDispatch } from "react-redux";

interface FormValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { notificationAlert } = useNotification();

  const {
    register: rhfLogin,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ mode: "onSubmit" });

  const onSubmit = async (data: FormValues) => {
    const { email, password } = data;

    setLoading(true);
    const response = await authenticate(email, password);
    setLoading(false);

    if (!response?.status) {
      notificationAlert({
        title: "Lỗi",
        description:
          response?.message || "Đã xảy ra lỗi trong quá trình đăng nhập",
        type: "error",
      });
    } else {
      delay(() => {
        window.location.reload();
        reset(); // Làm mới lại form sau khi đăng nhập thành công
      }, 500);
    }
  };

  return (
    <Box className="flex flex-col gap-2">
      <h3 className="text-gray-50 text-lg">Đăng nhập</h3>
      <p className="text-gray-400 text-xs">
        Nếu bạn chưa có tài khoản,{" "}
        <span
          onClick={() => dispatch(setTypeAuth("signup"))}
          className="text-[#ffd875] cursor-pointer hover:underline"
        >
          đăng ký ngay
        </span>
      </p>
      <form
        className="flex flex-col gap-4 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field.Root invalid={!!errors.email}>
          <Input
            autoFocus
            {...rhfLogin("email", {
              required: "Email không được để trống",
              validate: (value) => isValidEmail(value) || "Email không hợp lệ",
            })}
            type="email"
            name="email"
            className={`border text-gray-50 ${
              !errors.email
                ? "focus:border focus:border-gray-50 border-gray-600"
                : "border-[#ef4444]"
            }`}
            placeholder="Email"
          />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <PasswordInput
            {...rhfLogin("password", {
              required: "Mật khẩu không được để trống",
            })}
            className={`border text-gray-50 ${
              !errors.password
                ? "focus:border focus:border-gray-50 border-gray-600"
                : "border-[#ef4444]"
            }`}
            placeholder="Mật khẩu"
          />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <Button
          type="submit"
          size="sm"
          loading={loading}
          className="shadow-primary bg-primary linear-gradient text-gray-900"
        >
          Đăng nhập
        </Button>
        <span
          onClick={() => dispatch(setTypeAuth("forgot-password"))}
          className="text-center text-gray-50 text-xs cursor-pointer hover:underline"
        >
          Quên mật khẩu?
        </span>

        <Box className="bg-[#ffffff10] h-[0.5px] w-full" />

        <Button
          size="sm"
          variant="solid"
          onClick={() =>
            signIn("google", { callbackUrl: process.env.NEXT_PUBLIC_SITE_URL })
          }
          className="bg-gray-50 text-gray-900 shadow-sub"
        >
          <FaGoogle />
          Đăng nhập với Google
        </Button>
      </form>
    </Box>
  );
};

export default SignIn;
