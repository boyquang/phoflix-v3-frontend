"use client";

import useAutoFocusToEnd from "@/hooks/useAutoFocusToEnd";
import useNotification from "@/hooks/useNotification";
import { useRootFeedback } from "@/hooks/useRootFeedback";
import useSendSocketFeedback from "@/hooks/useSendSocketFeedback";
import { handleShowToaster } from "@/lib/utils";
import { updateContentFeedback } from "@/store/asyncThunks/feedbackAsyncThunk";
import { setIdEditFeedback } from "@/store/slices/feedbackSlice";
import { AppDispatch } from "@/store/store";
import { Box, IconButton, Textarea } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import { useEffect, useRef, useState } from "react";
import { LuCheck, LuX } from "react-icons/lu";
import { useDispatch } from "react-redux";

interface EditFeedbackProps {
  defaultValue: string;
  feedbackId: string;
}

const EditFeedback = ({ defaultValue, feedbackId }: EditFeedbackProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { sendSocketUpdateFeedback } = useSendSocketFeedback();
  const { notificationAlert } = useNotification();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(defaultValue || "");
  const [loading, setLoading] = useState(false);
  const { data: session }: any = useSession();
  const context = useRootFeedback();
  const rootFeedbackId = context?.rootFeedbackId as string;

  // Custom hook để tự động focus vào textarea khi mở chỉnh sửa
  useAutoFocusToEnd({
    ref: textAreaRef,
  });

  useEffect(() => {
    resizeTextArea();
  }, [value]);

  const resizeTextArea = () => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "auto"; // Làm trống chiều cao trước khi tính toán lại
      textArea.style.height = `${textArea.scrollHeight}px`; // Đặt chiều cao theo nội dung
    }
  };

  const handleUpdateFeedback = async () => {
    if (value?.trim() === "") {
      handleShowToaster(
        "Thông báo",
        "Nội dung phản hồi không được để trống",
        "error"
      );
      return;
    }

    setLoading(true);
    const response = await dispatch(
      updateContentFeedback({
        feedbackId,
        content: value,
        userId: session?.user?.id as string,
        accessToken: session?.user?.accessToken as string,
        rootFeedbackId,
      })
    );
    setLoading(false);

    if (response?.payload?.status) {
      dispatch(setIdEditFeedback(null));
      sendSocketUpdateFeedback(rootFeedbackId);
      setValue("");
    }

    notificationAlert({
      title: response?.payload?.status ? "Thông báo" : "Lỗi",
      description: response?.payload?.message,
      type: response?.payload?.status ? "success" : "error",
    });
  };

  return (
    <Box className="flex flex-col items-end mt-4">
      <Box className="w-full mb-2">
        <Textarea
          maxLength={500}
          ref={textAreaRef}
          className="border-[#ffffff10] w-full text-xs text-gray-50 bg-transparent focus:border-gray-300 focus:right-0"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            resizeTextArea();
          }}
        />
      </Box>
      <Box className="flex items-center gap-2">
        <IconButton
          onClick={() => dispatch(setIdEditFeedback(null))}
          className="bg-[#ffffff10] text-gray-50"
          size="xs"
        >
          <LuX />
        </IconButton>
        <IconButton
          loading={loading}
          onClick={handleUpdateFeedback}
          className="bg-[#ffffff10] text-gray-50"
          size="xs"
        >
          <LuCheck />
        </IconButton>
      </Box>
    </Box>
  );
};

export default EditFeedback;
