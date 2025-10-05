"use client";

interface TmdbRatingBadgeProps {
  rating?: number;
}

const TmdbRatingBadge = ({ rating }: TmdbRatingBadgeProps) => {
  if (!rating || rating <= 0) return null;

  return (
    <div className="inline-flex items-center justify-center gap-1 rounded-md h-5 px-1.5 border border-primary">
      <span className="text-[0.625rem] text-primary font-semibold">TMDb</span>
      <span className="text-xs text-white">{rating.toFixed(1)}</span>
    </div>
  );
};

export default TmdbRatingBadge;
