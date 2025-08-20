"use client";

import { uploadFileToCloundinary } from "@/lib/cloudinary/upload";
import { Box, FileUpload, Icon, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import PreviewImage from "./PreviewImage";
import { toast } from "sonner";

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
      toast.error("Vui lòng chọn file ảnh");
      return;
    }

    if (type === "video" && !file.type.startsWith("video/")) {
      toast.error("Vui lòng chọn file video");
      return;
    }

    if (file.size > maxFileSize * 1024 * 1024) {
      toast.error(
        `Kích thước file quá lớn. Chỉ hỗ trợ file có kích thước từ ${maxFileSize}MB trở xuống`
      );
      return;
    }

    setLoading(true);

    try {
      const url = await uploadFileToCloundinary(file, type);

      toast.success("Tải file thành công");
      callback(url);
      setImages([file]);
    } catch (err) {
      toast.error("Tải file thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = (fileName: string) => {
    setImages((prev) => prev.filter((file) => file.name !== fileName));
    callback("");
    toast.success("Xóa file thành công");
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
