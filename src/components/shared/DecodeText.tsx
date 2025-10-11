"use client";

import { decode } from "he";
import { JSX } from "react";
import striptags from "striptags";

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
  return <Tag className={className}>{striptags(decode(text))}</Tag>;
};

export default DecodeText;
