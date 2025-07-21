"use client";

import CheckboxCustom from "@/components/shared/CheckboxCustom";
import { Spinner } from "@chakra-ui/react";

interface MarkFeedbackAsSpamProps {
  feedback: FeedbackTable;
  loading: boolean;
  onMarkAsSpam: (feedbackId: string, checked: boolean) => void;
}

const MarkFeedbackAsSpam = ({
  feedback,
  loading,
  onMarkAsSpam,
}: MarkFeedbackAsSpamProps) => {
  if (loading) {
    return (
      <div className="flex items-center gap-1 whitespace-nowrap">
        <Spinner size="sm" />
        <span className="text-sm text-white">Đang xử lý...</span>
      </div>
    );
  }

  return (
    <CheckboxCustom
      checked={feedback?.is_spam as boolean}
      onChange={(e) => {
        onMarkAsSpam(feedback.id, e.target.checked);
      }}
      color="primary"
      size="small"
      label={feedback?.is_spam ? "Bỏ đánh dấu" : "Đánh dấu"}
    />
  );
};

export default MarkFeedbackAsSpam;
