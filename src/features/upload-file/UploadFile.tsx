"use client";

import { uploadFileToCloundinary } from "@/lib/cloudinary/upload";
import { handleShowToaster } from "@/lib/utils";
import { Box, FileUpload, Icon, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import PreviewImage from "./PreviewImage";

interface UploadFileProps {
  callback: (image: string) => void;
  type?: "image" | "video";
  maxFileSize?: number;
  accept?: string[];
}

const UploadFile = ({
  callback,
  type = "image",
  maxFileSize = 5,
  accept = ["/images/*"],
}: UploadFileProps) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const handleUploadFile = async (file: File) => {
    if (!file) return;

    if (type === "image" && !file.type.startsWith("image/")) {
      handleShowToaster("Thông báo", "Vui lòng chọn file ảnh", "error");
      return;
    }

    if (type === "video" && !file.type.startsWith("video/")) {
      handleShowToaster("Thông báo", "Vui lòng chọn file video", "error");
      return;
    }

    if (file.size > maxFileSize * 1024 * 1024) {
      handleShowToaster(
        "Thông báo",
        `Kích thước file quá lớn. Chỉ hỗ trợ file có kích thước từ ${maxFileSize}MB trở xuống`,
        "error"
      );
      return;
    }

    setLoading(true);

    try {
      const url = await uploadFileToCloundinary(file, type);

      handleShowToaster("Thông báo", "Tải file thành công", "success");

      callback(url);

      setImages([file]);
    } catch (err) {
      handleShowToaster("Lỗi", "Tải file thất bại", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = (fileName: string) => {
    setImages((prev) => prev.filter((file) => file.name !== fileName));
    callback("");
    handleShowToaster("Thông báo", "Xóa file thành công", "success");
  };
  return (
    <FileUpload.Root
      accept={accept}
      onFileAccept={(details) => handleUploadFile(details.files[0])}
    >
      <FileUpload.HiddenInput />

      <FileUpload.Dropzone className="w-full bg-[#ffffff2f] border-[#ffffff4d]">
        <Icon size="lg">
          <LuUpload />
        </Icon>
        <FileUpload.DropzoneContent>
          <Box className="text-gray-100">Kéo và thả tập tin vào đây</Box>
          <Box className="text-gray-200">Kích thước tối đa {maxFileSize}MB</Box>
        </FileUpload.DropzoneContent>
      </FileUpload.Dropzone>

      <>
        {!loading ? (
          <>
            {type === "image" ? (
              <PreviewImage files={images} onDelete={handleDeleteImage} />
            ) : null}
          </>
        ) : (
          <Box className="text-sm text-primary flex items-center gap-1">
            <span className="text-sm text-primary">Đang tải file lên...</span>
            <Spinner size="sm" />
          </Box>
        )}
      </>
    </FileUpload.Root>
  );
};

export default UploadFile;
