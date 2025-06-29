"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@chakra-ui/react";

interface MarkFeedbackAsSpamProps {
  feedback: any;
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
    <Checkbox
      colorPalette="whiteAlpha"
      variant="subtle"
      className="flex items-center gap-2 cursor-pointer"
      checked={feedback.is_spam}
      onCheckedChange={(checked) => {
        onMarkAsSpam(feedback.id, checked.checked === true);
      }}
    />
  );
};

export default MarkFeedbackAsSpam;
