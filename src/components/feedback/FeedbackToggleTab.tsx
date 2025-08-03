"use client";

import { setFeedbackType } from "@/store/slices/feedback.slice";
import { AppDispatch, RootState } from "@/store/store";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const tabs = [
  { id: "comment", value: "comment", label: "Bình luận" },
  { id: "review", value: "review", label: "Đánh giá" },
];

const FeedbackToggleTab = () => {
  const { feedbackType } = useSelector((state: RootState) => state.feedback);
  const dispatch: AppDispatch = useDispatch();
  const pathname = usePathname();

  // Làm mới lại feedbackType khi chuyển trang
  useEffect(() => {
    setFeedbackType("comment");
  }, [pathname]);

  const handleChangeTab = (value: "comment" | "review") => {
    if (value !== feedbackType) {
      dispatch(setFeedbackType(value));
    }
  };

  return (
    <div className="flex gap-0 border items-baseline border-gray-50 rounded-lg h-8 p-0.5 overflow-hidden">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleChangeTab(tab.value as "comment" | "review")}
          className={`flex items-center transition-all duration-300 justify-center rounded-md border-none h-[26px] lg:text-sm xs:text-xs text-[10px] px-2 ${
            feedbackType === tab.value
              ? "bg-white text-black cursor-default"
              : "bg-transparent text-white cursor-pointer"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default FeedbackToggleTab;
