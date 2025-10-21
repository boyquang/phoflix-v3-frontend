"use client";

interface HoverOutlineWrapperProps {
  children: React.ReactNode;
  rounded?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  ringSize?: "0" | "1" | "2" | "4" | "8";
  show?: boolean;
}

const HoverOutlineWrapper = ({
  children,
  rounded = "md",
  ringSize = "2",
  show = true,
}: HoverOutlineWrapperProps) => {
  const roundedObj = {
    xs: "rounded-xs",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    full: "rounded-full",
  };

  const ringSizeObj = {
    "0": "ring-0",
    "1": "ring-1",
    "2": "ring-2",
    "4": "ring-4",
    "8": "ring-8",
  };

  if (!show) return <>{children}</>;

  return (
    <div className="relative group">
      <div
        className={`pointer-events-none ring-[#ffd875] z-2 absolute inset-0.5 transition-all duration-300 opacity-0 group-hover:opacity-100
          ${roundedObj[rounded]}
          ${ringSizeObj[ringSize]}
        `}
      ></div>
      {children}
    </div>
  );
};

export default HoverOutlineWrapper;
