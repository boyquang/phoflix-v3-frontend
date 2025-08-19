"use client";

import { RootState } from "@/store/store";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useSelector } from "react-redux";
import striptags from "striptags";
import DecodeText from "./DecodeText";

interface ShowMoreTextProps {
  text: string;
  row?: number;
  className?: string;
}

const ShowMoreText = ({ text, className = "", row = 3 }: ShowMoreTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { windowWidth } = useSelector((state: RootState) => state.system);
  const [isTruncated, setIsTruncated] = useState(false);
  const pRef = useRef<HTMLParagraphElement>(null);

  const collapsedStyle: CSSProperties = {
    display: "-webkit-box",
    WebkitLineClamp: row,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const expandedStyle: CSSProperties = {
    display: "block",
    overflow: "visible",
    textOverflow: "unset",
  };

  useEffect(() => {
    const el = pRef.current;
    if (!el) return;

    // Tạm gỡ style để đo chiều cao đầy đủ
    const originalStyle = el.getAttribute("style");
    el.style.display = "block";
    el.style.webkitLineClamp = "unset";
    el.style.webkitBoxOrient = "unset";
    el.style.overflow = "visible";
    el.style.textOverflow = "unset";

    const fullHeight = el.scrollHeight;

    // Áp lại style thu gọn để đo chiều cao khi clamp
    Object.assign(el.style, collapsedStyle);
    const clampedHeight = el.clientHeight;

    setIsTruncated(fullHeight > clampedHeight);

    // Khôi phục style cũ nếu có
    if (originalStyle) el.setAttribute("style", originalStyle);
  }, [text, row, windowWidth]);

  return (
    <div className="flex flex-col gap-1">
      <p
        style={isExpanded ? expandedStyle : collapsedStyle}
        className={`${className} ${
          !isExpanded && isTruncated ? "fade-bottom" : ""
        }`}
        ref={pRef}
      >
        <DecodeText text={striptags(text)} />
      </p>

      {isTruncated && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center ml-auto gap-1 text-primary text-sm cursor-pointer"
        >
          {isExpanded ? "Thu gọn" : "Xem thêm"}
          {isExpanded ? <FaAngleUp /> : <FaAngleDown />}
        </button>
      )}
    </div>
  );
};

export default ShowMoreText;
