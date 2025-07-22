"use client";

import { appConfig } from "@/configs/appConfig";
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import useNotification from "@/hooks/useNotification";
import { useForm } from "react-hook-form";
import { categories, countries } from "@/constants/movie";
import { createEvent, updateEvent } from "@/lib/actions/eventAction";
import { useRouter } from "next/navigation";
import { validateDate } from "@/lib/utils";

const { dialog } = appConfig.charka;
const motionPresetDefault = dialog.motionPresetDefault;

interface EventDialogProps {
  action: "create" | "update";
  trigger: React.ReactNode;
  data?: EventData;
}

const EventDialog = ({ action, data, trigger }: EventDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { notificationAlert } = useNotification();
  const router = useRouter();

  const {
    register: rhfEvent,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EventData>({
    defaultValues: data,
    mode: "onSubmit",
  });

  const onSubmit = async (formData: EventData) => {
    setLoading(true);

    let response = null;

    switch (action) {
      case "create":
        response = await createEvent(formData);
        break;
      case "update":
        response = await updateEvent(data?.id as string, formData);
        break;
    }

    setLoading(false);

    console.log("Event Dialog Response:", response);

    if (response?.status) {
      router.refresh();
      setOpen(false);
      reset();
    }

    notificationAlert({
      title: response?.status ? "Thành công" : "Lỗi",
      description: response?.message || "Đã xảy ra lỗi, vui lòng thử lại.",
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
        <div>{trigger}</div>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner
          css={{
            zIndex: "9999 !important",
          }}
        >
          <Dialog.Content className="relative text-gray-50 bg-[#2a314e] rounded-2xl backdrop-blur max-w-md mx-4">
            <Dialog.CloseTrigger
              asChild
              className="absolute top-2 right-2 text-gray-300 hover:text-gray-100 hover:bg-transparent"
            >
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>

            <Dialog.Header>
              <Dialog.Title>
                {action === "create" ? "Thêm sự kiện" : "Cập nhật sự kiện"}
              </Dialog.Title>
            </Dialog.Header>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Dialog.Body className="space-y-4">
                <Field.Root invalid={!!errors.name}>
                  <Field.Label>Tên sự kiện</Field.Label>
                  <Input
                    maxLength={150}
                    autoFocus
                    type="text"
                    className={`border text-gray-50 ${
                      !errors.name
                        ? "focus:border focus:border-gray-50 border-gray-600"
                        : "border-[#ef4444]"
                    }`}
                    placeholder="Nhập tên sự kiện"
                    {...rhfEvent("name", {
                      required: "Tên sự kiện là bắt buộc",
                    })}
                  />
                  <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.date}>
                  <Field.Label>Ngày diễn ra (dd/mm)</Field.Label>
                  <Input
                    maxLength={5}
                    type="text"
                    className={`border text-gray-50 ${
                      !errors.date
                        ? "focus:border focus:border-gray-50 border-gray-600"
                        : "border-[#ef4444]"
                    }`}
                    placeholder="Ví dụ: 02/09"
                    {...rhfEvent("date", {
                      required: "Ngày diễn ra là bắt buộc",
                      pattern: {
                        value: /^\d{2}\/\d{2}$/,
                        message: "Định dạng phải là dd/mm",
                      },
                      validate: (value) => {
                        const isValid = validateDate(value, "/");

                        if (!isValid) {
                          return "Ngày không hợp lệ, vui lòng nhập lại";
                        }

                        return true;
                      },
                    })}
                  />
                  <Field.ErrorText>{errors.date?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.description}>
                  <Field.Label>Mô tả sự kiện</Field.Label>
                  <Textarea
                    rows={4}
                    autoresize
                    className={`w-full bg-transparent border text-gray-50 p-2 rounded ${
                      !errors.description
                        ? "focus:border-gray-50 border-gray-600"
                        : "border-[#ef4444]"
                    }`}
                    placeholder="Nhập mô tả"
                    {...rhfEvent("description", {
                      required: "Mô tả là bắt buộc",
                    })}
                  />
                  <Field.ErrorText>
                    {errors.description?.message}
                  </Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.category}>
                  <Field.Label>Thể loại sự kiện</Field.Label>
                  <select
                    className="w-full bg-transparent border border-gray-600 text-gray-50 p-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-100"
                    {...rhfEvent("category")}
                  >
                    <option disabled value="">
                      -- Chọn thể loại --
                    </option>
                    <option value="" className="text-gray-900">
                      Trống
                    </option>
                    {categories.map((category) => (
                      <option
                        key={category._id}
                        value={category.slug}
                        className="text-gray-900"
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </Field.Root>
                <Field.Root>
                  <Field.Label>Quốc gia diễn ra</Field.Label>
                  <select
                    className="w-full bg-transparent border border-gray-600 text-gray-50 p-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-100"
                    {...rhfEvent("country")}
                  >
                    <option disabled value="">
                      -- Chọn quốc gia --
                    </option>
                    <option value="" className="text-gray-900">
                      Trống
                    </option>
                    {countries.map((country) => (
                      <option
                        key={country._id}
                        value={country.slug}
                        className="text-gray-900"
                      >
                        {country.name}
                      </option>
                    ))}
                  </select>
                </Field.Root>

                <Field.Root>
                  <Field.Label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...rhfEvent("isLunar")}
                      className="accent-gray-200 w-4 h-4"
                    />
                    Là ngày âm lịch
                  </Field.Label>
                </Field.Root>
              </Dialog.Body>

              <Dialog.Footer className="mt-4 flex justify-end gap-2">
                <Dialog.ActionTrigger asChild>
                  <Button
                    size="xs"
                    variant="solid"
                    className="bg-gray-50 text-gray-900 min-w-24"
                  >
                    Đóng
                  </Button>
                </Dialog.ActionTrigger>
                <Button
                  loading={loading}
                  type="submit"
                  size="xs"
                  className="min-w-24 shadow-primary bg-primary text-gray-900"
                >
                  Hoàn tất
                </Button>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default EventDialog;
