"use client";

import { AppDispatch, RootState } from "@/store/store";
import { Box, Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import ErrorReportSelect from "./ErrorReportSelect";
import { useState, useTransition } from "react";
import ErrorDescriptionInput from "./ErrorDescriptionInput";
import { useSession } from "next-auth/react";
import { createReportMovie } from "@/lib/actions/report.action";
import {
  setReportDescription,
  setReportError,
} from "@/store/slices/user.slice";
import ReportFilmButton from "@/components/movie-report/ReportFilmButton";
import { showDialogSinInWhenNotLogin } from "@/store/slices/system.slice";
import { appConfig } from "@/configs/app.config";
import { toast } from "sonner";

const { dialog } = appConfig.charka;
const motionPresetDefault = dialog.motionPresetDefault;

const ReportDialog = () => {
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);
  const { report } = useSelector((state: RootState) => state.user);
  const { reportError, reportDescription } = report;
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const { data: sesstion } = useSession();
  const dispatch: AppDispatch = useDispatch();

  const handleCreateReport = () => {
    if (!reportError) {
      toast.info("Vui lòng chọn lỗi cần báo cáo.");
      return;
    }

    if (reportDescription.trim() === "") {
      toast.error("Vui lòng nhập mô tả lỗi.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await createReportMovie({
          userId: sesstion?.user?.id as string,
          movieSlug: movie?.slug as string,
          title: reportError,
          description: reportDescription,
          movieName: movie?.name as string,
          accessToken: sesstion?.user?.accessToken as string,
        });

        if (response?.status) {
          dispatch(setReportError(""));
          dispatch(setReportDescription(""));
          setOpen(false);
          toast.success(response?.message);
        } else {
          toast.error(response?.message);
        }
      } catch (error) {
        toast.error("Đã xảy ra lỗi! Vui lòng thử lại sau.");
      }
    });
  };

  if (!sesstion) {
    return (
      <ReportFilmButton
        placement="horizontal"
        responsiveText
        callback={() => dispatch(showDialogSinInWhenNotLogin())}
      />
    );
  }

  return (
    <Dialog.Root
      motionPreset={motionPresetDefault}
      open={open}
      onOpenChange={({ open }) => setOpen(open)}
      scrollBehavior="outside"
    >
      <Dialog.Trigger asChild>
        <Box>
          <ReportFilmButton placement="horizontal" responsiveText />
        </Box>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner
          css={{
            zIndex: "9998 !important",
          }}
        >
          <Dialog.Content className="bg-[#2a314e] text-gray-50 relative max-w-[460px] mx-4">
            <Dialog.Header>
              <Dialog.Title>{movie?.name}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Box className="flex flex-col gap-6">
                <ErrorReportSelect />
                <ErrorDescriptionInput />
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
                loading={pending}
                onClick={handleCreateReport}
                size="xs"
                className="min-w-24 shadow-primary bg-primary text-gray-900"
              >
                Xác nhận
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

export default ReportDialog;
