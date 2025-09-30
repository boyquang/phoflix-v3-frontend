"use client";

import AlertDialog from "@/components/shared/AlertDialog";
import { appConfig } from "@/configs/app.config";
import {
  createNewPlaylist,
  deletePlaylist,
  updatePlaylist,
} from "@/lib/actions/playlist.action";
import { setTriggerRefresh } from "@/store/slices/system.slice";
import { setPlaylistByKey } from "@/store/slices/user.slice";
import { AppDispatch, RootState } from "@/store/store";
import {
  Button,
  CloseButton,
  Dialog,
  IconButton,
  Input,
  Portal,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const { dialog } = appConfig.chakra;
const motionPresetDefault = dialog.motionPresetDefault;

interface ActionsPlaylistProps {
  action: "update" | "create" | "delete";
  children: React.ReactNode;
  value?: string;
  playlistId?: string;
  callback?: () => void;
}

const ActionsPlaylist = ({
  action,
  value,
  children,
  playlistId,
  callback,
}: ActionsPlaylistProps) => {
  const [playlistName, setPlaylistName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState({
    create: false,
    update: false,
    delete: false,
  });
  const { data: session } = useSession();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (action === "create") {
      setPlaylistName("");
    } else {
      setPlaylistName(value as string);
    }
  }, [action, value, isOpen]);

  const handleCreateNewPlaylist = async () => {
    const response = await createNewPlaylist({
      playlistName: playlistName as string,
      accessToken: session?.user?.accessToken as string,
    });

    return response;
  };

  const handleUpdatePlaylist = async () => {
    const response = await updatePlaylist({
      playlistId: playlistId as string,
      playlistName: playlistName as string,
      accessToken: session?.user?.accessToken as string,
    });

    return response;
  };

  const handleDeletePlaylist = async () => {
    const response = await deletePlaylist({
      playlistId: playlistId as string,
      accessToken: session?.user?.accessToken as string,
    });

    // Xóa playlistId và playlistName khỏi URL để set lại selectedPlaylist mặc định
    const params = new URLSearchParams(window.location.search);
    params.delete("playlistId");
    params.delete("playlistName");

    router.replace(`?${params.toString()}`);

    return response;
  };

  const handleActionPlaylist = async (
    action: "update" | "delete" | "create"
  ) => {
    if (!playlistName?.trim()) {
      toast.error("Tên danh sách không được để trống");
      return;
    }

    try {
      setLoading((prev) => ({ ...prev, [action]: true }));

      const mappingAction = {
        create: handleCreateNewPlaylist,
        update: handleUpdatePlaylist,
        delete: handleDeletePlaylist,
      };

      const response = await mappingAction[action]();

      if (response?.status) {
        setPlaylistName("");
        setIsOpen(false);

        // Thực hiện hành động sau khi xóa thành công
        if (callback) callback();

        // Cập nhật lại danh sách phát
        dispatch(setPlaylistByKey({ key: "refreshPlaylists", value: true }));
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    } finally {
      setLoading((prev) => ({ ...prev, [action]: false }));
    }
  };

  return (
    <Dialog.Root
      size="xs"
      open={isOpen}
      initialFocusEl={undefined}
      onOpenChange={({ open }) => setIsOpen(open)}
      motionPreset={motionPresetDefault}
    >
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop
          css={{
            zIndex: "1230 !important",
          }}
        />
        <Dialog.Positioner
          css={{
            zIndex: "1234 !important",
          }}
        >
          <Dialog.Content className="relative text-gray-50 max-w-[420px] bg-[#2a314e] rounded-2xl backdrop-blur mx-4 my-auto">
            <Dialog.CloseTrigger
              asChild
              className="absolute top-2 right-2 text-white hover:bg-transparent"
            >
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>

            <Dialog.Header>
              <Dialog.Title>
                {action === "create"
                  ? "Tạo danh sách phát"
                  : "Sửa danh sách phát"}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Input
                autoFocus
                ref={inputRef}
                className="border border-[#ffffff10] focus:border-gray-50"
                onChange={(e) => setPlaylistName(e.target.value)}
                value={playlistName}
                placeholder="Tên danh sách phát"
              />
            </Dialog.Body>
            <Dialog.Footer>
              {action === "update" && (
                <AlertDialog
                  trigger={
                    <IconButton
                      className="mr-auto"
                      size="xs"
                      aria-label="Xóa"
                      colorPalette="red"
                    >
                      <MdDelete />
                    </IconButton>
                  }
                  title="Xác nhận xóa"
                  content="Bạn có chắc chắn muốn xóa danh sách này không?"
                  loading={loading.delete}
                  confirmCallback={() => handleActionPlaylist("delete")}
                />
              )}
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
                loading={loading[action]}
                onClick={() => handleActionPlaylist(action)}
                size="xs"
                className="min-w-24 bg-primary text-gray-800 shadow-primary"
              >
                {action === "create" ? "Thêm" : "Lưu"}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ActionsPlaylist;
