"use client";

import CreateMovieRequest from "@/components/user/movie-request/CreateMovieRequest";
import { categories, countries } from "@/constants/movie";
import useNotification from "@/hooks/useNotification";
import { createMovieRequest } from "@/lib/actions/movieRequestActionsServer";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Textarea,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { appConfig } from "@/configs/appConfig";

const { dialog } = appConfig.charka;
const motionPresetDefault = dialog.motionPresetDefault;

interface FormValues {
  movieName: string;
  description?: string;
  releaseYear?: number | null;
  country?: string | null;
  genre?: string | null;
}

const MovieRequestDialog = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const { notificationAlert } = useNotification();

  const {
    register: rhfMovieRequest,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: "onSubmit",
  });

  const onSubmit = async (data: FormValues) => {
    const { movieName, description, releaseYear, country, genre } = data;

    if (movieName.trim() === "") {
      notificationAlert({
        title: "Lỗi",
        description: "Tên phim là bắt buộc",
        type: "error",
      });
      return;
    }

    setLoading(true);
    const response = await createMovieRequest({
      userId: session?.user?.id as string,
      movieName,
      description: description || null,
      releaseYear: releaseYear ? Number(releaseYear) : null,
      country: country || null,
      genre: genre || null,
    });
    setLoading(false);

    if (response?.status) {
      setOpen(false);
      reset();
      router.refresh();
    }

    notificationAlert({
      title: response?.status ? "Thành công" : "Lỗi",
      description:
        response?.message || "Đã xảy ra lỗi trong quá trình gửi yêu cầu",
      type: response?.status ? "success" : "error",
    });
  };

  return (
    <Dialog.Root
      size="xs"
      open={open}
      motionPreset={motionPresetDefault}
      onOpenChange={({ open }) => setOpen(open)}
      scrollBehavior="outside"
    >
      <Dialog.Trigger asChild>
        <Box>
          <CreateMovieRequest />
        </Box>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner
          css={{
            zIndex: "9999 !important",
          }}
        >
          <Dialog.Content className="relative text-gray-50 bg-[#2a314e] rounded-2xl backdrop-blur max-w-[600px] mx-4">
            <Dialog.CloseTrigger
              asChild
              className="absolute top-2 right-2 text-gray-300 hover:text-gray-100 hover:bg-transparent"
            >
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>

            <Dialog.Header>
              <Dialog.Title>Yêu cầu phim mới</Dialog.Title>
            </Dialog.Header>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Dialog.Body className="flex flex-col gap-4">
                <Field.Root invalid={!!errors.movieName}>
                  <Field.Label>Tên phim</Field.Label>
                  <Input
                    maxLength={150}
                    autoFocus
                    {...rhfMovieRequest("movieName", {
                      required: "Tên phim là bắt buộc",
                    })}
                    type="text"
                    className={`border text-gray-50 ${
                      !errors.movieName
                        ? "focus:border focus:border-gray-50 border-gray-600"
                        : "border-[#ef4444]"
                    }`}
                    placeholder="Nhập tiêu đề phim"
                  />
                  <Field.ErrorText>{errors.movieName?.message}</Field.ErrorText>
                </Field.Root>
                <Box className="flex items-center gap-4 md:flex-row flex-col">
                  <Field.Root>
                    <Field.Label>Thể loại</Field.Label>
                    <select
                      {...rhfMovieRequest("genre")}
                      className="w-full border h-10 px-3 border-gray-600 text-while rounded-sm focus:border-gray-50"
                    >
                      <option value="" className="text-black">
                        --- Chọn thể loại ---
                      </option>
                      {categories.map((category) => (
                        <option
                          key={category._id}
                          className="text-black"
                          value={category.name}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Quốc gia</Field.Label>
                    <select
                      {...rhfMovieRequest("country")}
                      name="country"
                      className="border w-full h-10 px-3 border-gray-600 text-while rounded-sm focus:border-gray-50"
                    >
                      <option value="" className="text-black">
                        --- Chọn quốc gia ---
                      </option>
                      {countries.map((country) => (
                        <option
                          key={country._id}
                          className="text-black"
                          value={country.name}
                        >
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Năm phát hành</Field.Label>
                    <Input
                      type="number"
                      className="
                      border text-gray-50
                      focus:border focus:border-gray-50 border-gray-600"
                      placeholder="Nhập năm phát hành"
                      min={1800}
                      max={new Date().getFullYear()}
                      {...rhfMovieRequest("releaseYear", {
                        valueAsNumber: true,
                        min: {
                          value: 1800,
                          message: "Năm phát hành không hợp lệ",
                        },
                        max: {
                          value: new Date().getFullYear(),
                          message: "Năm phát hành không hợp lệ",
                        },
                      })}
                    />
                    <Field.ErrorText>
                      {errors.releaseYear?.message}
                    </Field.ErrorText>
                  </Field.Root>
                </Box>
                <Field.Root>
                  <Field.Label>Mô tả</Field.Label>
                  <Textarea
                    rows={3}
                    {...rhfMovieRequest("description")}
                    className="border text-gray-50
                         focus:border focus:border-gray-50 border-gray-600"
                    placeholder="Nhập mô tả (tùy chọn)"
                  />
                  <Field.ErrorText>
                    {errors.description?.message}
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
                  className="min-w-24 shadow-primary bg-primary text-gray-900"
                >
                  Gửi yêu cầu
                </Button>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default MovieRequestDialog;
