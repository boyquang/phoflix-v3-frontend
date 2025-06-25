"use client";

import { Box } from "@chakra-ui/react";
import EditableInfo from "./EditableInfo";
import Image from "@/components/shared/Image";

interface TableCellImageProps {
  image: string;
  data: Record<string, any>;
  loading: boolean;
  callback: (data: Record<string, any>, keyEdit: string) => void;
}

const TableCellImage = ({
  image,
  data,
  loading,
  callback,
}: TableCellImageProps) => {
  return (
    <Box className="flex items-center gap-2">
      <Box className="relative pt-14 h-0 rounded-md overflow-hidden w-10 flex-shrink-0">
        <Image src={image} alt="Image" className="rounded-md" />
      </Box>
      <EditableInfo
        keyEdit="image"
        loading={loading}
        defaultValue={image}
        data={data}
        callback={callback}
      >
        {image}
      </EditableInfo>
    </Box>
  );
};

export default TableCellImage;
