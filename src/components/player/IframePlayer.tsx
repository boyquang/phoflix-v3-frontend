"use client";

interface IframePlayerProps {
  source: string;
  onLoaded?(): void;
  className?: string;
}

const IframePlayer = ({ source, onLoaded, className }: IframePlayerProps) => {
  return (
    <iframe
      src={source}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
      frameBorder="0"
      allowFullScreen
      onLoad={() => {
        if (onLoaded) onLoaded();
      }}
      className={`absolute w-full h-full inset-0 z-[102] cinema-player ${className}`}
    ></iframe>
  );
};

export default IframePlayer;
