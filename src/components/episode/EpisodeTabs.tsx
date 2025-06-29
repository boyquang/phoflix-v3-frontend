"use client";

import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import LanguageIcon from "./LanguageIcon";
import {
  setCurrentEpisode,
  setSelectedLanguage,
} from "@/store/slices/movieSlice";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const EpisodeTabs = () => {
  const { selectedLanguage, groups } = useSelector(
    (state: RootState) => state.movie.episode
  );
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);
  const searchParams = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();

  // Reset ngôn ngữ đã chọn khi slug của movie thay đổi
  useEffect(() => {
    if (!selectedLanguage || movie?.slug !== params.slug) {
      const tabs = Object.keys(groups);
      dispatch(setSelectedLanguage(tabs.length > 0 ? tabs[0] : null));
      dispatch(setCurrentEpisode(null));
    }
  }, [groups, params.slug, movie?.slug, selectedLanguage]);

  // Cập nhật ngôn ngữ đã chọn từ searchParams nếu có
  useEffect(() => {
    const language = searchParams.get("language");
    if (language && language !== selectedLanguage) {
      dispatch(setSelectedLanguage(language));
    }
  }, [searchParams]);

  const handleChangeTab = (key: string) => {
    if (selectedLanguage !== key) {
      dispatch(setSelectedLanguage(key));
    }
  };

  return (
    <div className="flex items-center gap-2 mb-6">
      {Object.keys(groups)?.map((key) => (
        <div
          id={key}
          key={key}
          onClick={() => handleChangeTab(key)}
          className={`items-center gap-1 cursor-pointer border transition-all duration-300 text-gray-50 bg-transparent rounded-md md:px-4 px-2 md:py-2 py-1 inline-flex
             ${
               selectedLanguage === key ? "border-white" : "border-transparent"
             } 
          `}
        >
          <LanguageIcon language={key} />
          <h3 className="font-semibold text-xs">{groups[key].label}</h3>
        </div>
      ))}
    </div>
  );
};

export default EpisodeTabs;
