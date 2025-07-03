"use client";

import { PasswordInput } from "@/components/ui/password-input";
import { resetPassword } from "@/lib/actions/userActionClient";
import { handleShowToaster } from "@/lib/utils";
import { Button, Dialog, Portal, Field, CloseButton } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { appConfig } from "@/configs/appConfig";

const { dialog } = appConfig.charka;
const motionPresetDefault = dialog.motionPresetDefault;

interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ResetPassword = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register: rhfResetPassword,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ mode: "onSubmit" });

  // Sử dụng watch để theo dõi giá trị của trường newPassword
  const newPasswordValue = watch("newPassword");

  const onSubmit = async (data: FormValues) => {
    const { oldPassword, newPassword } = data;

    setLoading(true);
    const response = await resetPassword({
      email: session?.user?.email as string,
      oldPassword,
      newPassword,
      typeAccount: session?.user?.typeAccount as "credentials",
      accessToken: session?.user?.accessToken as string,
    });
    setLoading(false);

    if (response?.status) {
      setOpen(false);
      reset(); // Làm mới lại form sau khi đổi mật khẩu thành công
    }

    handleShowToaster(
      "Thông báo",
      response?.message,
      response?.status ? "success" : "error"
    );
  };

  return (
    <Dialog.Root
      motionPreset={motionPresetDefault}
      size="xs"
      open={open}
      onOpenChange={({ open }) => setOpen(open)}
    >
      <Dialog.Trigger asChild>
        <span className="text-primary cursor-pointer hover:underline">đây</span>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className="bg-[rgba(40,43,58,0.8)] rounded-2xl text-gray-50 backdrop-blur max-w-[420px] mx-4 my-auto relative">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Dialog.Header>
                <Dialog.Title>Đổi mật khẩu</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body className="flex flex-col gap-4">
                <Field.Root invalid={!!errors.oldPassword}>
                  <Field.Label>Mật khẩu cũ</Field.Label>
                  <PasswordInput
                    placeholder="Nhập mật khẩu cũ"
                    className={`border text-gray-50 ${
                      !errors.oldPassword
                        ? "focus:border focus:border-gray-50 border-gray-600"
                        : "border-[#ef4444]"
                    }`}
                    {...rhfResetPassword("oldPassword", {
                      required: "Mật khẩu cũ không được để trống",
                    })}
                  />
                  <Field.ErrorText>
                    {errors.oldPassword?.message}
                  </Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.newPassword}>
                  <Field.Label>Mật khẩu mới</Field.Label>
                  <PasswordInput
                    placeholder="Nhập mật khẩu mới"
                    className={`border text-gray-50 ${
                      !errors.newPassword
                        ? "focus:border focus:border-gray-50 border-gray-600"
                        : "border-[#ef4444]"
                    }`}
                    {...rhfResetPassword("newPassword", {
                      required: "Mật khẩu mới không được để trống",
                    })}
                  />
                  <Field.ErrorText>
                    {errors.newPassword?.message}
                  </Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.confirmNewPassword}>
                  <Field.Label>Nhập lại mật khẩu mới</Field.Label>
                  <PasswordInput
                    placeholder="Nhập lại mật khẩu mới"
                    className={`border text-gray-50 ${
                      !errors.confirmNewPassword
                        ? "focus:border focus:border-gray-50 border-gray-600"
                        : "border-[#ef4444]"
                    }`}
                    {...rhfResetPassword("confirmNewPassword", {
                      required: "Vui lòng nhập lại mật khẩu mới",
                      validate: (value) =>
                        value === newPasswordValue ||
                        "Mật khẩu nhập lại không khớp",
                    })}
                  />
                  <Field.ErrorText>
                    {errors.confirmNewPassword?.message}
                  </Field.ErrorText>
                </Field.Root>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button
                    size="xs"
                    variant="solid"
                    className="bg-gray-50 text-gray-900 min-w-24"
                  >
                    Hủy bỏ
                  </Button>
                </Dialog.ActionTrigger>
                <Button
                  loading={loading}
                  type="submit"
                  size="xs"
                  className="shadow-primary bg-primary text-gray-900 min-w-24"
                >
                  Xác nhận
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger
                asChild
                className="absolute top-2 right-2 text-gray-300 hover:text-gray-100 hover:bg-transparent"
              >
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ResetPassword;
