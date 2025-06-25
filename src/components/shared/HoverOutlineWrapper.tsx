"use client";

interface HoverOutlineWrapperProps {
  ringColor?: string | "primary";
  ringSize?: string;
  rounded?: "lg" | "md" | "sm" | "xs" | "xl" | "2xl" | string;
}

const HoverOutlineWrapper = ({
  ringColor,
  ringSize = "2",
  rounded = "lg",
}: HoverOutlineWrapperProps) => {
  const ringColor_ = ringColor ? `ring-${ringColor}` : "ring-[#FFD875]";
  const rounded_ = `rounded-${rounded}`;
  const ringSize_ = `ring-${ringSize}`;

  return (
    <div
      className={`pointer-events-none z-2 absolute inset-0.5 transition-all duration-300 opacity-0 group-hover:opacity-100
          ${ringColor_} ${ringSize_} ${rounded_} 
      `}
    ></div>
  );
};

export default HoverOutlineWrapper;
