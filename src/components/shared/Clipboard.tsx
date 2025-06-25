"use client";

import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { IoCopySharp } from "react-icons/io5";
import { TiTick } from "react-icons/ti";

interface ClipboardProps {
  value: string;
  label?: string;
  color?: string;
}

const Clipboard = ({ value, label, color }: ClipboardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <Box
      onClick={handleCopy}
      className={`inline-flex flex-wrap items-center gap-1 md:text-sm text-xs cursor-pointer ${
        color ? `text-${color}` : "text-gray-100"
      }`}
    >
      {copied ? <TiTick /> : <IoCopySharp />}
      <span className="break-all">{label}</span>
    </Box>
  );
};

export default Clipboard;
