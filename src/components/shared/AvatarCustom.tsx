"use client";

interface AvatarCustomProps {
  src: string;
  alt: string;
  size?: "small" | "medium" | "large";
}

const AvatarCustom = ({ src, alt, size }: AvatarCustomProps) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  return (
    <div
      className={`flex items-center justify-center ${
        sizeClasses[size || "medium"]
      } rounded-full overflow-hidden `}
    >
      <img src={src || "/"} alt={alt} />
    </div>
  );
};

export default AvatarCustom;
