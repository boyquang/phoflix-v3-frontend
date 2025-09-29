"use client";

import { PasswordInput } from "@/components/ui/password-input";
import { authenticate } from "@/lib/actions/auth-server.action";
import { isValidEmail } from "@/lib/utils";
import { setTypeAuth } from "@/store/slices/system.slice";
import { AppDispatch } from "@/store/store";
import { Box, Button, Field, Input, Spinner } from "@chakra-ui/react";
import { delay } from "lodash";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface FormValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState({
    credentials: false,
    google: false,
  });

  const {
    register: rhfLogin,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ mode: "onSubmit" });

  const onSubmit = async (data: FormValues) => {
    try {
      const { email, password } = data;

      setLoading({
        credentials: true,
        google: false,
      });
      const response = await authenticate(email, password);

      if (!response?.status) {
        toast.error(response?.message || "Đăng nhập không thành công");
      } else {
        delay(() => {
          window.location.reload();
          reset(); // Làm mới lại form sau khi đăng nhập thành công
        }, 500);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    } finally {
      setLoading({
        credentials: false,
        google: false,
      });
    }
  };

  const handleLoginWithGoogle = async () => {
    setLoading({
      credentials: false,
      google: true,
    });

    await signIn("google", {
      callbackUrl: "/",
    });
  };

  return (
    <Box
      className={`flex flex-col gap-2 ${
        loading.credentials || loading.google
          ? "opacity-50 pointer-events-none"
          : ""
      }`}
    >
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
          disabled={loading.credentials || loading.google}
          className="shadow-primary bg-primary linear-gradient text-gray-900"
        >
          {loading.credentials && <Spinner size="xs" />}
          {loading.credentials ? "Đang xử lý" : "Đăng nhập"}
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
          disabled={loading.google}
          onClick={handleLoginWithGoogle}
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
