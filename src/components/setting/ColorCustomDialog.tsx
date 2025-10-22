"use client";

import { appConfig } from "@/configs/app.config";
import { colorSystemConfig } from "@/constants/color.contant";
import useSetting from "@/hooks/useSetting";
import { setDataTheme } from "@/store/slices/system.slice";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { VscSettings } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";

const { dialog } = appConfig.chakra;
const motionPresetDefault = dialog.motionPresetDefault;

const ColorCustomDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { dataTheme } = useSelector((state: RootState) => state.system);
  const dispatch: AppDispatch = useDispatch();
  const { getColorSystem } = useSetting();

  useEffect(() => {
    const dataTheme = localStorage.getItem("dataTheme") || "";
    const colorSystem = getColorSystem(dataTheme).name;
    document.body.dataset.theme = colorSystem;
    dispatch(setDataTheme(colorSystem));
  }, []);

  const handleApply = () => {
    document.body.dataset.theme = dataTheme;
    localStorage.setItem("dataTheme", dataTheme);
    setOpen(false);
  };

  const handleChangeColor = (dataTheme: ColorName) => {
    dispatch(setDataTheme(dataTheme));
    document.body.dataset.theme = dataTheme;
  };

  const handleCancel = () => {
    const dataTheme = localStorage.getItem("dataTheme") || "";
    dispatch(setDataTheme(dataTheme));
    document.body.dataset.theme = dataTheme;
    setOpen(false);
  };

  const handleOpenChange = (details: { open: boolean }) => {
    if (!details.open) {
      handleCancel();
    } else {
      setOpen(details.open);
    }
  };

  return (
    <Dialog.Root
      size="xs"
      open={open}
      motionPreset={motionPresetDefault}
      onOpenChange={handleOpenChange}
      scrollBehavior="outside"
    >
      <Dialog.Trigger asChild>
        <Box className="text-primary inline-flex items-center gap-1 hover:underline cursor-pointer">
          <VscSettings />
          Tùy chỉnh
        </Box>
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
              <CloseButton size="sm" onClick={handleCancel} />
            </Dialog.CloseTrigger>

            <Dialog.Header>
              <Dialog.Title>Tùy chỉnh màu hệ thống</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Box className="grid grid-cols-2 gap-2 cursor-pointer ">
                {colorSystemConfig.map((color) => (
                  <Box
                    onClick={() => handleChangeColor(color.name)}
                    key={color.name}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md hover:bg-[#fff2] hover:bg-opacity-10 transition-colors duration-100
                        ${
                          dataTheme === color.name
                            ? "bg-[#fff2] bg-opacity-10"
                            : ""
                        }
                    `}
                  >
                    <Box
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: color.color }}
                    />
                    <span>{color.label}</span>
                  </Box>
                ))}
              </Box>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  onClick={handleCancel}
                  size="xs"
                  variant="solid"
                  className="bg-gray-50 text-gray-900 min-w-24"
                >
                  Hủy
                </Button>
              </Dialog.ActionTrigger>
              <Button
                onClick={handleApply}
                size="xs"
                className="min-w-24 shadow-primary bg-primary text-gray-900"
              >
                Áp dụng
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ColorCustomDialog;
