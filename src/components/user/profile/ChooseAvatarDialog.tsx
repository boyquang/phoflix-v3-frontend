"use client";

import { updateUserProfile } from "@/lib/actions/user-client.action";
import { handleShowToaster } from "@/lib/utils";
import { Box, Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import AvatarItem from "./AvatarItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import FilterTab from "./FilterTabs";
import { setSelectedFilterTabsAvatar } from "@/store/slices/user.slice";
import { appConfig } from "@/configs/app.config";
import { avatars } from "@/constants/avatar.contant";
import UploadFile from "@/components/upload-file/UploadFile";

const { dialog } = appConfig.charka;
const motionPresetDefault = dialog.motionPresetDefault;

const ChooseAvatarDialog = () => {
  const { data: sesstion, update } = useSession();
  const { selectedFilterTabsAvatar } = useSelector(
    (state: RootState) => state.user.avatar
  );
  const dispatch: AppDispatch = useDispatch();
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(
    avatars[selectedFilterTabsAvatar].images[0]
  );
  const [pending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdateUserProfile = () => {
    if (!selectedAvatar) {
      handleShowToaster("Thông báo", "Vui lòng chọn ảnh đại diện", "error");
      return;
    }

    startTransition(async () => {
      const response = await updateUserProfile({
        userId: sesstion?.user?.id as string,
        username: sesstion?.user?.name as string,
        gender: sesstion?.user?.gender as Gender,
        avatar: selectedAvatar as string,
        typeAccount: sesstion?.user?.typeAccount as TypeAcccount,
        accessToken: sesstion?.user?.accessToken as string,
      });

      if (response?.status) {
        await update();

        setIsOpen(false);
        dispatch(setSelectedFilterTabsAvatar("hoat-hinh"));
        setSelectedAvatar(avatars["hoat-hinh"].images[0]);
      }

      handleShowToaster(
        "Thông báo",
        response?.message,
        response?.status ? "success" : "error"
      );
    });
  };

  return (
    <Dialog.Root
      size="xs"
      open={isOpen}
      motionPreset={motionPresetDefault}
      onOpenChange={({ open }) => setIsOpen(open)}
      scrollBehavior="outside"
    >
      <Dialog.Trigger asChild>
        <Button
          size="xs"
          className="text-xs text-gray-200 bg-transparent hover:bg-[#25272f] transition-all"
        >
          Đổi ảnh đại diện
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className="relative text-gray-50 sm:max-w-[600px] max-w-full bg-[#2A314E] rounded-xl backdrop-blur mx-4">
            <Dialog.Header>
              <Dialog.Title>Đổi ảnh đại diện</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Box className="flex flex-col gap-6">
                <FilterTab />
                <>
                  {selectedFilterTabsAvatar !== "upload" ? (
                    <Box className="grid lg:grid-cols-5 grid-cols-3 gap-2">
                      {avatars[selectedFilterTabsAvatar].images.map(
                        (avatar, index) => (
                          <AvatarItem
                            key={index}
                            avatar={avatar}
                            isSelectedAvatar={selectedAvatar === avatar}
                            callback={() => setSelectedAvatar(avatar)}
                          />
                        )
                      )}
                    </Box>
                  ) : (
                    <UploadFile callback={(url) => setSelectedAvatar(url)} />
                  )}
                </>
              </Box>
            </Dialog.Body>
            <Dialog.Footer>
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
                loading={pending}
                onClick={handleUpdateUserProfile}
                size="xs"
                className="min-w-24 bg-[#ffda7d] text-gray-800 shadow-primary"
              >
                Lưu lại
              </Button>
            </Dialog.Footer>
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

export default ChooseAvatarDialog;
