"use client";

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
  const [blurData, setBlurData] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/blur?src=${encodeURIComponent(src)}`)
      .then((res) => res.json())
      .then((data) => {
        setBlurData(data.blurDataURL);
      });
  }, [src]);

  return (
    <NextImage
      ref={ref}
      src={src}
      blurDataURL={blurData ? blurData : undefined}
      placeholder={blurData ? "blur" : "empty"}
      alt={alt}
      fill
      quality={quality}
      priority
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={`block w-full h-full object-cover inset-0 transition-all duration-700 ease-in-out absolute ${className}`}
    />
  );
};

export default Image;
