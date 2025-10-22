"use client";

import { PasswordInput } from "@/components/ui/password-input";
import { register } from "@/lib/actions/auth-server.action";
import { isValidEmail } from "@/lib/utils";
import { setIsShowAuthDialog, setTypeAuth } from "@/store/slices/system.slice";
import { AppDispatch } from "@/store/store";
import { Box, Button, Field, Input, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { avatarDefault } from "@/constants/avatar.contant";
import { toast } from "sonner";

interface FormValues {
  nameDisplay: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register: rhfRegister,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ mode: "onSubmit" });

  // Sử dụng watch để theo dõi giá trị của trường password
  const passwordValue = watch("password");

  const onSubmit = async (data: FormValues) => {
    try {
      const { nameDisplay, email, password } = data;

      setLoading(true);
      const response = await register({
        email,
        password,
        name: nameDisplay,
        typeAccount: "credentials",
        avatar: avatarDefault,
      });

      if (response?.status) {
        dispatch(setIsShowAuthDialog(false));
        toast.success(response?.message);
        reset(); // Làm mới lại form sau khi đăng ký thành công
      } else {
        toast.error(
          response?.message || "Đã xảy ra lỗi trong quá trình đăng ký"
        );
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="flex flex-col gap-2">
      <h3 className="text-gray-50 text-lg">Tạo tài khoản mới</h3>
      <p className="text-gray-400 text-xs">
        Nếu bạn đã có tài khoản,{" "}
        <span
          onClick={() => dispatch(setTypeAuth("signin"))}
          className="text-primary cursor-pointer hover:underline"
        >
          đăng nhập
        </span>
      </p>
      <form
        className="flex flex-col gap-4 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field.Root invalid={!!errors.nameDisplay}>
          <Input
            autoFocus
            {...rhfRegister("nameDisplay", {
              required: "Tên hiển thị không được để trống",
              minLength: {
                value: 3,
                message: "Tên hiển thị phải ít nhất 3 ký tự",
              },
            })}
            type="text"
            placeholder="Tên hiển thị"
            className={`border text-gray-50 ${
              !errors.nameDisplay
                ? "focus:border focus:border-gray-50 border-gray-600"
                : "border-[#ef4444]"
            }`}
          />
          <Field.ErrorText>{errors.nameDisplay?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.email}>
          <Input
            {...rhfRegister("email", {
              required: "Email không được để trống",
              validate: (value) => isValidEmail(value) || "Email không hợp lệ",
            })}
            type="email"
            placeholder="Email"
            className={`border text-gray-50 ${
              !errors.email
                ? "focus:border focus:border-gray-50 border-gray-600"
                : "border-[#ef4444]"
            }`}
          />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <PasswordInput
            {...rhfRegister("password", {
              required: "Mật khẩu không được để trống",
            })}
            placeholder="Mật khẩu"
            className={`border text-gray-50 ${
              !errors.password
                ? "focus:border focus:border-gray-50 border-gray-600"
                : "border-[#ef4444]"
            }`}
          />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.confirmPassword}>
          <PasswordInput
            {...rhfRegister("confirmPassword", {
              required: "Xác nhận mật khẩu không được để trống",
              validate: (value) =>
                value === passwordValue || "Mật khẩu không khớp",
            })}
            placeholder="Nhập lại mật khẩu"
            className={`border text-gray-50 ${
              !errors.confirmPassword
                ? "focus:border focus:border-gray-50 border-gray-600"
                : "border-[#ef4444]"
            }`}
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
          {loading ? "Đang xử lý" : "Đăng ký"}
        </Button>
      </form>
    </Box>
  );
};

export default SignUp;
