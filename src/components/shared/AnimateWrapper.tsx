"use client";

interface AnimateWrapperProps {
  children: React.ReactNode;
  animate?: "fade-in" | "slide-up" | "zoom-in" | "fade-out" | "fade-in-up";
}

const AnimateWrapper = ({
  animate = "fade-in",
  children,
}: AnimateWrapperProps) => {
  return <div className={`${animate}`}>{children}</div>;
};

export default AnimateWrapper;
