"use client";

import { decodeHtmlEntities } from "@/lib/utils";
import { JSX } from "react";

interface DecodeTextProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const DecodeText = ({ text, className, as: Tag = "span" }: DecodeTextProps) => {
  return <Tag className={className}>{decodeHtmlEntities(text)}</Tag>;
};

export default DecodeText;
