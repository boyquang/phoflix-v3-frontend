"use client";

import { appConfig } from "@/configs/app.config";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import React from "react";

const { dialog } = appConfig.charka;
const motionPresetDefault = dialog.motionPresetDefault;

interface DialogRootProps {
  open: boolean;
  onChange: (open: boolean) => void;
  trigger: React.ReactNode;
  title: React.ReactNode;
  body: React.ReactNode;
  loading?: boolean;
  onClickSubmit?: () => void;
  onSubmitForm?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const DialogRoot = ({
  open,
  trigger,
  body,
  title,
  onClickSubmit,
  onChange,
  loading = false,
  onSubmitForm,
}: DialogRootProps) => {
  return (
    <Dialog.Root
      size="xs"
      open={open}
      motionPreset={motionPresetDefault}
      onOpenChange={({ open }) => onChange(open)}
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
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>

            <form onSubmit={onSubmitForm ?? (() => {})}>
              <Dialog.Body>{body}</Dialog.Body>
              <Dialog.Footer className="mt-4 flex justify-end gap-2">
                <Dialog.ActionTrigger asChild>
                  <Button
                    size="xs"
                    onClick={() => onChange(false)}
                    variant="solid"
                    className="bg-gray-50 text-gray-900 min-w-24"
                  >
                    Đóng
                  </Button>
                </Dialog.ActionTrigger>
                <Button
                  loading={loading}
                  type={onClickSubmit ? "button" : "submit"}
                  onClick={onClickSubmit ?? (() => {})}
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

export default DialogRoot;
