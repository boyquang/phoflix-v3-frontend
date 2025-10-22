"use client";

import { forgotPassword } from "@/lib/actions/auth-server.action";
import { isValidEmail } from "@/lib/utils";
import { setIsShowAuthDialog, setTypeAuth } from "@/store/slices/system.slice";
import { AppDispatch } from "@/store/store";
import { Box, Button, Field, Input, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface FormValues {
  email: string;
}

const ForgotPassword = () => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register: rhfForgotPassword,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ mode: "onSubmit" });

  const onSubmit = async (data: FormValues) => {
    try {
      const { email } = data;

      setLoading(true);
      const response = await forgotPassword(email, "credentials");

      if (response?.status) {
        dispatch(setIsShowAuthDialog(false));
        reset();
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="flex flex-col gap-2">
      <h3 className="text-gray-50 text-lg">Quên mật khẩu</h3>
      <p className="text-gray-400 text-xs">
        Vui lòng nhập email của bạn để nhận hướng dẫn khôi phục mật khẩu
      </p>

      <form
        className="flex flex-col gap-4 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field.Root invalid={!!errors.email}>
          <Input
            autoFocus
            {...rhfForgotPassword("email", {
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
            placeholder="Email đăng ký"
          />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <Button
          type="submit"
          size="sm"
          disabled={loading}
          className="shadow-primary bg-primary linear-gradient text-gray-900"
        >
          {loading && <Spinner size="xs" />}
          {loading ? "Đang xử lý" : "Gửi yêu cầu"}
        </Button>
      </form>
      <p className="text-gray-400 text-right text-xs mt-3">
        Quay lại{" "}
        <span
          onClick={() => dispatch(setTypeAuth("signin"))}
          className="text-primary cursor-pointer hover:underline"
        >
          đăng nhập
        </span>
      </p>
    </Box>
  );
};

export default ForgotPassword;
