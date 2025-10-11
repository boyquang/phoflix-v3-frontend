"use client";

import { createNotification } from "@/lib/actions/admin-client.action";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import UploadFile from "../../upload-file/UploadFile";
import { appConfig } from "@/configs/app.config";
import { toast } from "sonner";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { setTriggerRefresh } from "@/store/slices/system.slice";

const { dialog } = appConfig.chakra;
const motionPresetDefault = dialog.motionPresetDefault;

interface NotificationDialogProps {
  trigger: React.ReactNode;
}

const NotificationDialog = ({ trigger }: NotificationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const dispatch: AppDispatch = useDispatch();

  const handleCreateNotification = async (data: any) => {
    if (!data?.content.trim()) {
      toast.error("Nội dung thông báo không được để trống");
      return;
    }

    try {
      setLoading(true);
      const response = await createNotification({
        senderId: session?.user?.id as string,
        content: data.content,
        type: "community",
        href: data.href,
        image: image,
        accessToken: session?.user?.accessToken as string,
      });

      if (response?.status) {
        setOpen(false);
        reset();
        dispatch(setTriggerRefresh());
        toast.success("Tạo thông báo thành công");
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
      motionPreset={motionPresetDefault}
      open={open}
      onOpenChange={({ open }) => setOpen(open)}
      scrollBehavior="outside"
    >
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner
          css={{
            zIndex: "9998 !important",
          }}
        >
          <Dialog.Content className="bg-[#2a314e] text-gray-50 relative max-w-[460px] mx-4">
            <Dialog.Header>
              <Dialog.Title>Tạo thông báo mới</Dialog.Title>
            </Dialog.Header>
            <form onSubmit={handleSubmit(handleCreateNotification)}>
              <Dialog.Body>
                <Box className="flex flex-col gap-4">
                  <Field.Root>
                    <Field.Label>Nội dung</Field.Label>
                    <Textarea
                      resize="none"
                      autoresize
                      className="border border-[#ffffff10] focus:border-gray-50 outline-0"
                      {...register("content")}
                      placeholder="Viết nội dung thông báo"
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Đường dẫn chuyển hướng</Field.Label>
                    <Input
                      defaultValue="#"
                      className="border border-[#ffffff10] focus:border-gray-50"
                      {...register("href")}
                      placeholder="Nhập đường dẫn đến thông báo"
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Hình ảnh minh họa</Field.Label>
                    <UploadFile onUpload={(file) => setImage(file)} />
                  </Field.Root>
                </Box>
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
                  size="xs"
                  type="submit"
                  className="min-w-24 shadow-primary bg-primary text-gray-900"
                >
                  Xác nhận
                  {loading && <Spinner size="xs" />}
                </Button>
              </Dialog.Footer>
            </form>
            <Dialog.CloseTrigger
              asChild
              className="absolute top-2 right-2 text-gray-300 hover:text-gray-100 hover:bg-transparent"
            >
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default NotificationDialog;
