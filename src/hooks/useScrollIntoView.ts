import { useEffect } from "react";

type Options = {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
  delay?: number;
};

interface UseScrollIntoView {
  ref: React.RefObject<HTMLElement | null>;
  options?: Options;
  dependencys?: any[];
}

const useScrollIntoView = ({
  ref,
  options,
  dependencys,
}: UseScrollIntoView) => {
  useEffect(() => {
    if (ref.current) {
      const scrollOptions: ScrollIntoViewOptions = {
        behavior: options?.behavior || "smooth",
        block: options?.block || "start",
        inline: options?.inline || "nearest",
      };

      setTimeout(() => {
        ref.current?.scrollIntoView(scrollOptions);
      }, options?.delay || 0);
    }
  }, [...(dependencys || [])]);
};

export default useScrollIntoView;
