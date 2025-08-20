"use client";

import { PasswordInput } from "@/components/ui/password-input";
import { resetPassword } from "@/lib/actions/auth-server.action";
import { setTypeAuth } from "@/store/slices/system.slice";
import { AppDispatch } from "@/store/store";
import { Box, Button, Field, Spinner } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface FormValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const dispatch: AppDispatch = useDispatch();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [loading, setLoading] = useState(false);

  const {
    register: rhfResetPassword,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onSubmit" });

  // Sử dụng watch để theo dõi giá trị của trường password
  const passwordValue = watch("password");

  const onSubmit = async (data: FormValues) => {
    try {
      const { password } = data;

      setLoading(true);
      const response = await resetPassword({
        email: email as string,
        password,
      });

      if (response?.status) {
        toast.success(response?.message);
        dispatch(setTypeAuth("signin"));
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
      <h3 className="text-lg text-gray-50">Đặt lại mật khẩu</h3>
      <p className="text-xs text-gray-400">
        Thực hiện đặt lại mật khẩu mới cho tài khoản của bạn
      </p>
      <form
        className="flex flex-col gap-4 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field.Root invalid={!!errors.password}>
          <PasswordInput
            autoFocus
            {...rhfResetPassword("password", {
              required: "Mật khẩu không được để trống",
            })}
            className={`border text-gray-50 ${
              !errors.password
                ? "focus:border focus:border-gray-50 border-gray-600"
                : "border-[#ef4444]"
            }`}
            placeholder="Nhập mật khẩu mới"
          />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.confirmPassword}>
          <PasswordInput
            {...rhfResetPassword("confirmPassword", {
              required: "Vui lòng xác nhận mật khẩu",
              validate: (value) =>
                value === passwordValue || "Mật khẩu không khớp",
            })}
            className={`border text-gray-50 ${
              !errors.confirmPassword
                ? "focus:border focus:border-gray-50 border-gray-600"
                : "border-[#ef4444]"
            }`}
            placeholder="Nhập lại mật khẩu mới"
          />
          <Field.ErrorText>{errors.confirmPassword?.message}</Field.ErrorText>
        </Field.Root>

        <Button
          type="submit"
          size="sm"
          disabled={loading}
          className="shadow-primary bg-primary linear-gradient text-gray-900"
        >
          {loading && <Spinner size="xs" />}
          {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
        </Button>
      </form>
    </Box>
  );
};

export default ResetPassword;
