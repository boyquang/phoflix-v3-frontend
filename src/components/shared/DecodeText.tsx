"use client";

import { decode } from "he";
import { JSX } from "react";

interface DecodeTextProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const DecodeText = ({
  text = "",
  className,
  as: Tag = "span",
}: DecodeTextProps) => {
  return <Tag className={className}>{decode(text)}</Tag>;
};

export default DecodeText;
