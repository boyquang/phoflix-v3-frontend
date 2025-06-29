"use client";

import { setFeedbackType } from "@/store/slices/feedbackSlice";
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
    <ButtonGroup
      variant="outline"
      size="sm"
      className="gap-0 border items-baseline border-gray-50 rounded-lg h-8 p-0.5 overflow-hidden"
    >
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          size="sm"
          onClick={() => handleChangeTab(tab.value as "comment" | "review")}
          bg={feedbackType === tab.value ? "white" : "transparent"}
          color={feedbackType === tab.value ? "black" : "white"}
          className="rounded-md border-none h-[26px] lg:text-sm xs:text-xs text-[10px] px-2"
        >
          {tab.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default FeedbackToggleTab;
