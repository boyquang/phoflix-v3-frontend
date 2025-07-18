"use client";

import { Tooltip } from "@/components/ui/tooltip";
import { Editable, IconButton, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";

interface EditableInfoProps {
  defaultValue: string;
  children: React.ReactNode;
  data: Record<string, any>;
  keyEdit: string;
  loading: boolean;
  callback: (data: Record<string, any>, keyEdit: string) => void;
}

const EditableInfo = ({
  defaultValue,
  children,
  loading,
  data,
  keyEdit,
  callback,
}: EditableInfoProps) => {
  const [value, setValue] = useState(defaultValue || "");

  const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };

  const updateData = () => {
    if (value?.trim() === "" || value === defaultValue) {
      setValue(defaultValue || "");
      return;
    }

    const updatedData = { ...data, [keyEdit]: value };

    callback(updatedData, keyEdit);
  };

  if (loading) {
    return <Spinner size="sm" />;
  }

  return (
    <Editable.Root
      value={value}
      onValueCommit={updateData}
      onChange={handleChange}
    >
      <Tooltip showArrow content="Nhấn vào để chỉnh sửa" openDelay={100}>
        <Editable.Preview className="min-h-6 cursor-pointer hover:bg-transparent hover:underline">
          {children}
        </Editable.Preview>
      </Tooltip>
      <Editable.Textarea className="focus-visible:outline-gray-400 min-h-8 min-w-64 max-w-80 text-white text-sm bg-transparent" />
      <Editable.Control>
        <Editable.EditTrigger asChild>
          <IconButton
            size="xs"
            className="border border-[#ffffff10]  text-white bg-transparent rounded-full"
          >
            <LuPencilLine />
          </IconButton>
        </Editable.EditTrigger>
        <Editable.CancelTrigger asChild>
          <IconButton
            size="xs"
            className="border border-[#ffffff10] text-white bg-transparent rounded-full"
          >
            <LuX />
          </IconButton>
        </Editable.CancelTrigger>
        <Editable.SubmitTrigger asChild>
          <IconButton
            className="border border-[#ffffff10] hover:border-[#ffd875] hover:text-[#ffd875] text-white bg-transparent rounded-full"
            size="xs"
          >
            <LuCheck />
          </IconButton>
        </Editable.SubmitTrigger>
      </Editable.Control>
    </Editable.Root>
  );
};

export default EditableInfo;
