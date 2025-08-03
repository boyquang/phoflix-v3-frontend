"use client";

import { useEffect, useState } from "react";
import NextImage from "next/image";
import { getImageSrc } from "@/lib/utils";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  ref?: React.Ref<HTMLImageElement> | null;
  quality?: number;
  unoptimized?: boolean;
}

const Image = ({
  src,
  alt,
  quality = 80,
  className = "",
  ref = null,
  unoptimized = true,
}: ImageProps) => {
  const [blurData, setBlurData] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [currentSrc, setCurrentSrc] = useState<string>(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  const handleOptimizedImage = (src: string) => {
    fetch(`/api/blur?src=${encodeURIComponent(src)}`)
      .then((res) => res.json())
      .then((data) => {
        setBlurData(data.blurDataURL);
      })
      .catch(() => {
        setBlurData(null);
      });
  };

  const handleUnoptimizedImage = (src: string) => {
    const img = new window.Image();

    img.onload = () => setStatus("success");
    img.onerror = () => {
      if (src.includes("?url=")) {
        let fallbackSrc = src.split("?url=")[1];

        // Cache-busting để tránh trình duyệt dùng lại ảnh lỗi
        fallbackSrc +=
          (fallbackSrc.includes("?") ? "&" : "?") + `fallback=${Date.now()}`;

        const fallbackImg = new window.Image();

        fallbackImg.onload = () => {
          setStatus("success");
          setCurrentSrc(fallbackSrc); // cập nhật state để trigger re-render
        };

        fallbackImg.onerror = () => {
          setStatus("error");
        };

        fallbackImg.src = fallbackSrc;
      } else {
        setStatus("error");
      }
    };
    img.src = src;
  };

  useEffect(() => {
    if (!src) {
      setError(true);
      setStatus("error");
      return;
    }

    if (unoptimized) {
      handleUnoptimizedImage(src);
    } else {
      handleOptimizedImage(src);
    }
  }, [src]);

  return (
    <>
      {!unoptimized ? (
        <NextImage
          ref={ref}
          src={error ? "/images/notfound.webp" : src}
          blurDataURL={blurData ? blurData : undefined}
          placeholder={blurData ? "blur" : "empty"}
          alt={alt}
          fill
          quality={quality}
          priority
          onError={() => setError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`block w-full h-full object-cover inset-0 transition-all duration-700 ease-in-out absolute ${className}`}
        />
      ) : (
        <img
          ref={ref}
          src={getImageSrc(currentSrc, status)}
          alt={alt}
          className={`block w-full h-full object-cover inset-0 absolute ${className}`}
          loading="lazy"
        />
      )}
    </>
  );
};

export default Image;
