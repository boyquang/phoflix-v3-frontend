"use client";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const AirDateTimeline = () => {
  const { episodes, seasonEpisodes } = useSelector(
    (state: RootState) => state.episode
  );

  return (
    <div>
      <h2>Air Date Timeline</h2>
      {/* Render the air date timeline here */}
    </div>
  );
};

export default AirDateTimeline;
