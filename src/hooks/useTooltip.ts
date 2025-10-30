"use client";

const useTooltip = () => {
  const onMouseEnterShowTooltip = (
    tooltipTimeout: React.RefObject<ReturnType<typeof setTimeout> | null>,
    currentElementRef: React.RefObject<HTMLImageElement | null>,
    setTooltip: React.Dispatch<React.SetStateAction<any>>
  ) => {
    // Thời gian chờ trước khi hiển thị tooltip
    const timeShowTooltip = 700;

    // Xóa timeout trước đó tránh tooltip bị delay khi hover nhanh
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);

    tooltipTimeout.current = setTimeout(() => {
      if (currentElementRef.current) {
        // Lấy vị trí của element hiện tại
        const rect = currentElementRef.current.getBoundingClientRect();
        const { top, left, width, height } = rect;

        const tooltipWidth = 420;
        const margin = 16;

        const calculatedLeft =
          left + window.scrollX - tooltipWidth / 2 + width / 2;
        const maxLeft = window.innerWidth - tooltipWidth - margin;
        const minLeft = margin;

        // Đảm bảo luôn cách mép trái và phải 16px
        const safeLeft = Math.max(minLeft, Math.min(calculatedLeft, maxLeft));

        setTooltip({
          // Đặt top ở giữa element
          top: top + window.scrollY + height / 2,
          left: safeLeft,
          width: tooltipWidth,
          visible: true,
        });
      }
    }, timeShowTooltip);
  };

  const onMouseLeaveHideTooltip = (
    tooltipTimeout: React.RefObject<ReturnType<typeof setTimeout> | null>,
    setTooltip: React.Dispatch<React.SetStateAction<any>>
  ) => {
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    setTooltip(null);
  };

  return { onMouseEnterShowTooltip, onMouseLeaveHideTooltip };
};

export default useTooltip;
