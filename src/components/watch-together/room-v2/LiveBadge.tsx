"use client";

interface LiveBadgeProps {
  position?: "relative" | "absolute";
  size?: "sm" | "md";
  rounded?: BorderRadius;
}

const LiveBadge = ({
  position = "absolute",
  size = "md",
  rounded = "rounded-md",
}: LiveBadgeProps) => {
  const sizes = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-sm gap-1.5",
  };

  return (
    <div
      className={`flex items-center gap-1 text-gray-50 bg-red-500 shadow-2xl ${rounded} ${
        sizes[size || "sm"]
      } ${position === "absolute" ? "absolute left-2 top-2" : "relative"}`}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-white live-flash"></div>
      LIVE
    </div>
  );
};

export default LiveBadge;
