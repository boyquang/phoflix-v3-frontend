"use client";

import MovieCard from "./MovieCard";

interface MovieGridProps {
  items: Movie[];
  classNameGrids?: string;
  orientation?: "horizontal" | "vertical";
}

const MovieGrid = ({
  items,
  classNameGrids,
  orientation = "vertical",
}: MovieGridProps) => {
  return (
    <div className={classNameGrids}>
      {items?.map((item, index: number) => (
        <MovieCard key={index} data={item} orientation={orientation} />
      ))}
    </div>
  );
};

export default MovieGrid;
