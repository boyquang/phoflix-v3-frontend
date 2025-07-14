"use client";

import { getImageSrc } from "@/lib/utils";
import { useEffect, useState } from "react";
import NextImage from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  ref?: React.Ref<HTMLImageElement> | null;
  quality?: number;
}

const Image = ({
  src,
  alt,
  quality = 80,
  className = "",
  ref = null,
}: ImageProps) => {
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
    <NextImage
      ref={ref}
      src={getImageSrc(src, status)}
      alt={alt}
      fill
      quality={quality}
      priority
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={`block w-full h-full object-cover inset-0 transition-all duration-700 ease-in-out absolute ${className} ${
        status === "loading" ? "blink opacity-0" : "opacity-100"
      }`}
    />
  );
};

export default Image;
