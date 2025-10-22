"use client";

import {
  Box,
  Button,
  Field,
  HStack,
  Input,
  RadioGroup,
  Spinner,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import UserAvatar from "./UserAvatar";
import { updateUserProfile } from "@/lib/actions/user-client.action";
import ResetPassword from "./ResetPassword";
import { toast } from "sonner";

type Values = {
  name: string | undefined;
  gender: "other" | "male" | "female" | undefined;
};

const UserProfile = () => {
  const { data: session, update } = useSession();
  const [values, setValues] = useState<Values | null>(null);
  const [loading, setLoading] = useState(false);

  const optionGender = [
    { label: "Nam", value: "male" },
    { label: "Nữ", value: "female" },
    { label: "Khác", value: "other" },
  ];

  useEffect(() => {
    if (session) {
      setValues({
        name: session?.user?.name as string,
        gender: session?.user?.gender as Gender,
      });
    }
  }, [session]);

  const handleUpdateUserProfile = async () => {
    if (!values?.name?.trim()) {
      toast.error("Tên hiển thị không được để trống!");
      return;
    }

    const name = session?.user?.name as string;
    const gender = session?.user?.gender as Gender;

    if (name === values?.name && gender === values?.gender) return;

    try {
      setLoading(true);

      const response = await updateUserProfile({
        userId: session?.user?.id as string,
        username: values?.name as string,
        gender: values?.gender as Gender,
        avatar: session?.user?.image as string,
        typeAccount: session?.user?.typeAccount as TypeAcccount,
        accessToken: session?.user?.accessToken as string,
      });

      if (response?.status) {
        toast.success(response?.message);
        await update();
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  if (!session) return null;

  return (
    <Box className="flex flex-col gap-2 xl:max-w-[640px] lg:max-w-[560px] md:max-w-[420px] max-w-full lg:mx-0 mx-auto">
      <Box className="flex-1 mb-3">
        <h3 className="text-lg text-gray-50">Tài khoản</h3>
        <span className="text-xs text-gray-400">
          Cập nhật thông tin cá nhân của bạn
        </span>
      </Box>
      <Box className="flex gap-8 sm:items-start items-center sm:flex-row flex-col">
        <UserAvatar />
        <Box className="flex w-full flex-col gap-6 mt-3 flex-1">
          <Field.Root required className="text-gray-50">
            <Field.Label>Email</Field.Label>
            <Input
              _disabled={{
                backgroundColor: "#ffffff05 !important",
              }}
              disabled
              value={session.user?.email ?? ""}
              className="rounded-lg"
              variant="outline"
            />
          </Field.Root>
          <Field.Root required className="text-gray-50">
            <Field.Label>Tên hiển thị</Field.Label>
            <Input
              maxLength={50}
              onChange={(e) =>
                setValues({
                  gender: values?.gender ?? "other",
                  name: e.target.value,
                })
              }
              className="border border-[#2e313a] rounded-lg focus:border-gray-50"
              value={values?.name ?? ""}
              variant="outline"
            />
          </Field.Root>
          <Field.Root required className="text-gray-50" gap={4}>
            <Field.Label>Giới tính</Field.Label>
            <RadioGroup.Root
              colorPalette="whiteAlpha"
              variant="subtle"
              value={values?.gender ?? "other"}
              onChange={(e: any) => {
                setValues({
                  name: values?.name ?? "",
                  gender: e.target.value,
                });
              }}
            >
              <HStack gap="6">
                {optionGender.map((item) => (
                  <RadioGroup.Item key={item.value} value={item.value}>
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                  </RadioGroup.Item>
                ))}
              </HStack>
            </RadioGroup.Root>
          </Field.Root>
          <Box className="md:max-w-24 max-w-full mt-6">
            <Button
              onClick={handleUpdateUserProfile}
              className="w-full rounded-lg shadow-primary bg-primary text-[#1e2939]"
              size="sm"
              disabled={loading}
            >
              Cập nhật
              {loading && <Spinner size="sm" />}
            </Button>
          </Box>

          {session.user?.typeAccount === "credentials" && (
            <Box className="mt-6 text-gray-50 text-sm">
              <span>Đổi mật khẩu nhấn vào</span> <ResetPassword />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
