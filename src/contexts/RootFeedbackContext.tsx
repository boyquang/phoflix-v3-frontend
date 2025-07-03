import { createContext } from "react";

export interface FeedbackContextType {
  rootFeedbackId: string | null;
  rootFeedback: Feedback;
}

export const RootFeedbackContext = createContext<FeedbackContextType | null>(
  null
);

interface RootFeedbackProviderProps {
  children: React.ReactNode;
  value: FeedbackContextType;
}

export const RootFeedbackProvider = ({
  children,
  value,
}: RootFeedbackProviderProps) => {
  return (
    <RootFeedbackContext.Provider value={value}>
      {children}
    </RootFeedbackContext.Provider>
  );
};
