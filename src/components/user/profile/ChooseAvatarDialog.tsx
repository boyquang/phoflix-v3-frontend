"use client";

import { updateUserProfile } from "@/lib/actions/user-client.action";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Portal,
  Spinner,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { use, useState } from "react";
import AvatarItem from "./AvatarItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import FilterTab from "./FilterTabs";
import { setSelectedFilterTabsAvatar } from "@/store/slices/user.slice";
import { appConfig } from "@/configs/app.config";
import { avatars } from "@/constants/avatar.contant";
import UploadFile from "@/components/upload-file/UploadFile";
import { toast } from "sonner";

const { dialog } = appConfig.chakra;
const motionPresetDefault = dialog.motionPresetDefault;

const ChooseAvatarDialog = () => {
  const { data: session, update } = useSession();
  const { selectedFilterTabsAvatar } = useSelector(
    (state: RootState) => state.user.avatar
  );
  const dispatch: AppDispatch = useDispatch();
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(
    avatars[selectedFilterTabsAvatar].images[0]
  );
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUpdateUserProfile = async () => {
    if (!selectedAvatar) {
      toast.error("Vui lòng chọn ảnh đại diện");
      return;
    }

    try {
      setLoading(true);

      const response = await updateUserProfile({
        userId: session?.user?.id as string,
        username: session?.user?.name as string,
        gender: session?.user?.gender as Gender,
        avatar: selectedAvatar as string,
        typeAccount: session?.user?.typeAccount as TypeAcccount,
        accessToken: session?.user?.accessToken as string,
      });

      if (response?.status) {
        await update();
        setIsOpen(false);
        toast.success(response?.message);
        dispatch(setSelectedFilterTabsAvatar("hoat-hinh"));
        setSelectedAvatar(avatars["hoat-hinh"].images[0]);
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
      open={isOpen}
      motionPreset={motionPresetDefault}
      onOpenChange={({ open }) => setIsOpen(open)}
      scrollBehavior="outside"
    >
      <Dialog.Trigger asChild>
        <Button
          size="xs"
          className="text-xs bg-[#25272f] bg-opacity-50 text-white hover:opacity-75 rounded-lg"
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
                    <UploadFile
                      onUpload={(url, loading) => {
                        setSelectedAvatar(url);
                        setUploading(loading);
                      }}
                    />
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
                  disabled={loading || uploading}
                >
                  Đóng
                </Button>
              </Dialog.ActionTrigger>
              <Button
                onClick={handleUpdateUserProfile}
                size="xs"
                className="min-w-24 bg-primary text-gray-800 shadow-primary"
                disabled={loading || uploading}
              >
                Lưu lại
                {loading && <Spinner size="xs" />}
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
