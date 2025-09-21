"use client";

import { Button, CloseButton, Dialog, Portal, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import { appConfig } from "@/configs/app.config";

const { dialog } = appConfig.chakra;
const motionPresetDefault = dialog.motionPresetDefault;

interface AlertDialogProps {
  trigger: React.ReactNode;
  title: string | React.ReactNode;
  content: string | React.ReactNode;
  loading: boolean;
  confirmCallback: () => void;
}

const AlertDialog = ({
  trigger,
  title,
  loading,
  content,
  confirmCallback,
}: AlertDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = async () => {
    await confirmCallback();
    setIsOpen(false);
  };

  return (
    <Dialog.Root
      size="xs"
      placement="bottom"
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
      scrollBehavior="outside"
      motionPreset={motionPresetDefault}
    >
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner
          css={{
            zIndex: "9999 !important",
          }}
        >
          <Dialog.Content className="relative text-black bg-white rounded-2xl backdrop-blur max-w-[420px] mx-4">
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>{content}</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  size="xs"
                  variant="solid"
                  className="bg-gray-300 text-black min-w-24 hover:opacity-80"
                >
                  Hủy bỏ
                </Button>
              </Dialog.ActionTrigger>
              <Button
                onClick={handleConfirm}
                size="xs"
                className={`min-w-24 shadow-primary bg-primary text-black hover:opacity-80 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading && <Spinner size="xs" />}
                Xác nhận
              </Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger
              asChild
              className="absolute top-2 right-2 hover:bg-transparent"
            >
              <CloseButton size="sm" className="text-black" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AlertDialog;
