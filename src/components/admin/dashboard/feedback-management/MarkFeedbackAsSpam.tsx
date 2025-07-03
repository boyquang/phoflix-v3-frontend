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
    return <Spinner size="sm" />;
  }

  return (
    <CheckboxCustom
      checked={feedback?.is_spam as boolean}
      onChange={(e) => {
        onMarkAsSpam(feedback.id, e.target.checked);
      }}
      color="primary"
      size="small"
    />
  );
};

export default MarkFeedbackAsSpam;
