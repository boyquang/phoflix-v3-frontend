"use client";

import { FileUpload, Float } from "@chakra-ui/react";
import { LuX } from "react-icons/lu";

interface PreviewImageProps {
  files: File[];
  onDelete?: (fileName: string) => void;
}

const PreviewImage = ({ files, onDelete }: PreviewImageProps) => {
  return (
    <FileUpload.ItemGroup>
      {files.map((file) => (
        <FileUpload.Item
          className="relative"
          key={file.name}
          file={file}
          w="auto"
          boxSize="20"
          p="0"
        >
          <FileUpload.ItemPreviewImage className="w-full h-full rounded-sm" />
          <Float placement="top-end" rounded="full">
            <FileUpload.ItemDeleteTrigger
              onClick={() => onDelete?.(file.name)}
              className="bg-primary text-gray-900 cursor-pointer transition-all hover:scale-105"
              boxSize="4"
              rounded="full"
            >
              <LuX className="ml-[1px]" />
            </FileUpload.ItemDeleteTrigger>
          </Float>
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  );
};


export default PreviewImage;
