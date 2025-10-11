"use client";

import { appConfig } from "@/configs/app.config";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { categories, countries } from "@/constants/movie.contant";
import { createEvent, updateEvent } from "@/lib/actions/event.action";
import { validateDate } from "@/lib/utils";
import { useSession } from "next-auth/react";
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});
import "react-markdown-editor-lite/lib/index.css";
import dynamic from "next/dynamic";
import MarkdownViewer from "@/components/shared/MarkdownViewer";
import { toast } from "sonner";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { setTriggerRefresh } from "@/store/slices/system.slice";

const { dialog } = appConfig.chakra;
const motionPresetDefault = dialog.motionPresetDefault;

interface EventDialogProps {
  action: "create" | "update";
  trigger: React.ReactNode;
  data?: EventData;
}

const EventDialog = ({ action, data, trigger }: EventDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullscreen, setFullScreen] = useState(false);
  const { data: session } = useSession();
  const dispatch: AppDispatch = useDispatch();

  const {
    register: rhfEvent,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EventData>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (data && action === "update") {
      reset(data);
    }
  }, [data, open, action]);

  const onSubmit = async (formData: EventData) => {
    try {
      setLoading(true);

      let response = null;

      switch (action) {
        case "create":
          response = await createEvent(
            formData,
            session?.user.accessToken as string
          );
          break;
        case "update":
          response = await updateEvent(
            data?.id as string,
            formData,
            session?.user.accessToken as string
          );
          break;
      }

      if (response?.status) {
        dispatch(setTriggerRefresh());
        setOpen(false);
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
    <Dialog.Root
      size="xs"
      open={open}
      motionPreset={motionPresetDefault}
      onOpenChange={({ open }) => setOpen(open)}
      scrollBehavior="outside"
    >
      <Dialog.Trigger asChild>
        <Box>{trigger}</Box>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner
          css={{
            zIndex: "9999 !important",
          }}
        >
          <Dialog.Content
            className={`relative text-gray-50 bg-[#2a314e] rounded-2xl backdrop-blur  mx-4 ${
              fullscreen ? "max-w-full" : "xl:max-w-3xl max-w-2xl"
            }`}
          >
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
                <Box className="flex items-center md:flex-row flex-col gap-4">
                  <Field.Root className="flex-2" invalid={!!errors.name}>
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
                  <Field.Root className="flex-1" invalid={!!errors.date}>
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
                </Box>

                <Field.Root invalid={!!errors.description}>
                  <Field.Label>Mô tả sự kiện</Field.Label>
                  <Controller
                    name="description"
                    control={control}
                    rules={{
                      required: "Mô tả là bắt buộc",
                    }}
                    render={({ field }) => (
                      <MdEditor
                        value={field.value || ""}
                        style={{ height: "200px", width: "100%" }}
                        onChange={({ text }) => field.onChange(text)}
                        renderHTML={(text) => <MarkdownViewer content={text} />}
                      />
                    )}
                  />
                  <Field.ErrorText>
                    {errors.description?.message}
                  </Field.ErrorText>
                </Field.Root>

                <Box className="flex items-center md:flex-row flex-col gap-4">
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
                </Box>

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

              <Dialog.Footer className="mt-4 flex items-center lg:justify-between justify-end gap-2">
                <Button
                  onClick={() => setFullScreen(!fullscreen)}
                  size="xs"
                  className="bg-white lg:inline-flex hidden text-gray-900 min-w-24"
                >
                  {!fullscreen ? "Mở rộng" : "Thu gọn"}
                </Button>
                <Box className="flex items-center gap-2">
                  <Dialog.ActionTrigger asChild>
                    <Button
                      size="xs"
                      className="bg-white text-gray-900 min-w-24"
                    >
                      Đóng
                    </Button>
                  </Dialog.ActionTrigger>
                  <Button
                    type="submit"
                    size="xs"
                    className="min-w-24 shadow-primary bg-primary text-gray-900"
                  >
                    Hoàn tất
                    {loading && <Spinner size="xs" />}
                  </Button>
                </Box>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default EventDialog;
