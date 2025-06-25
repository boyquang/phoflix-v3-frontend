import { useContext } from "react";
import {
  RootFeedbackContext,
  FeedbackContextType,
} from "@/contexts/RootFeedbackContext";

export const useRootFeedback = (): FeedbackContextType | null => {
  return useContext(RootFeedbackContext);
};
