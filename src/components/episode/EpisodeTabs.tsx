"use client";

import { AppDispatch, RootState } from "@/store/store";
import LanguageIcon from "./LanguageIcon";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedLanguage,
  setShowThumbnail,
} from "@/store/slices/episode.slice";
import SwitchCustom from "../shared/SwitchCustom";

interface EpisodeTabsProps {
  slug: string;
}

const EpisodeTabs = ({ slug }: EpisodeTabsProps) => {
  const searchParams = useSearchParams();
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { selectedLanguage, groups, showThumbnail, isLongSeries } = useSelector(
    (state: RootState) => state.episode
  );

  // Làm mới khi chuyển sang phim khác
  useEffect(() => {
    if (params.slug !== slug) {
      dispatch(setSelectedLanguage(null));
      dispatch(setShowThumbnail(false));
    }
  }, [params.slug, slug]);

  // Set lại selectedLanguage
  useEffect(() => {
    const language = searchParams.get("language");

    // Trường hợp có language trên url
    if (language && language !== selectedLanguage) {
      dispatch(setSelectedLanguage(language));
      return;
    }

    // Trường hợp chuyển sang phim khác
    if (!selectedLanguage) {
      const tabs = Object.keys(groups);
      dispatch(setSelectedLanguage(tabs?.length > 0 ? tabs[0] : null));
    }
  }, [groups, searchParams]);

  const handleChangeTab = (key: string) => {
    if (selectedLanguage !== key) {
      dispatch(setSelectedLanguage(key));
    }
  };

  if (Object.keys(groups)?.length === 0) return null;

  return (
    <div className="flex justify-between items-center gap-2 mb-6">
      <div className="flex items-center gap-2 flex-wrap">
        {Object.keys(groups).map((key) => (
          <div
            id={key}
            key={key}
            onClick={() => handleChangeTab(key)}
            className={`items-center gap-1 cursor-pointer border transition-all duration-300 text-gray-50 bg-transparent rounded-md md:px-4 px-2 md:py-2 py-1 inline-flex
               ${
                 selectedLanguage === key
                   ? "border-white"
                   : "border-transparent"
               } 
            `}
          >
            <LanguageIcon language={key} />
            <h3 className="font-semibold text-xs">{groups[key]?.label}</h3>
          </div>
        ))}
      </div>
      {isLongSeries && (
        <SwitchCustom
          callback={() => dispatch(setShowThumbnail(!showThumbnail))}
          defaultChecked={showThumbnail ? false : true}
          label="Rút gọn"
          labelPosition="left"
        />
      )}
    </div>
  );
};

export default EpisodeTabs;
