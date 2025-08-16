"use client";

import { useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

interface CollapseElementProps {
  children: React.ReactNode;
  maxHeight?: string | number;
  positionButton?: "left" | "right" | "center";
  elementScrollRef?: React.RefObject<HTMLDivElement | null>;
}

const CollapseElement = ({
  children,
  maxHeight = 200,
  positionButton = "right",
  elementScrollRef,
}: CollapseElementProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const positionButtonClass = {
    left: "mr-auto",
    right: "ml-auto",
    center: "mx-auto",
  }[positionButton];

  const handleClick = (isExpanded: boolean) => {
    setIsExpanded(!isExpanded);

    if (!!isExpanded && elementScrollRef?.current) {
      elementScrollRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div
        className={`${!isExpanded ? "fade-bottom" : ""}`}
        style={{
          maxHeight: !isExpanded ? maxHeight : "unset",
          overflow: "hidden",
          transition: "max-height 0.2s ease-in-out",
          width: "100%",
        }}
      >
        {children}
      </div>

      <button
        onClick={() => handleClick(isExpanded)}
        className={`flex outline-0 items-center gap-1 text-primary py-1 text-sm cursor-pointer ${positionButtonClass}`}
      >
        {isExpanded ? "Thu gọn" : "Xem thêm"}
        {isExpanded ? <FaAngleUp /> : <FaAngleDown />}
      </button>
    </div>
  );
};

export default CollapseElement;
