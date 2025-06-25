"use client";

import { getImageSrc } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  ref?: React.Ref<HTMLImageElement> | null;
}

const Image = ({ src, alt, className = "", ref = null }: ImageProps) => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    if (!src) {
      setStatus("error");
      return;
    }

    const img = new window.Image();
    img.src = src;
    img.onload = () => setStatus("success");
    img.onerror = () => setStatus("error");
  }, [src]);

  return (
    <img
      ref={ref}
      src={getImageSrc(src, status)}
      alt={alt}
      className={`block w-full h-full object-cover inset-0 absolute ${className} ${
        status === "loading" ? "blink" : ""
      }`}
      loading="lazy"
    />
  );
};

export default Image;
