"use client";

const useTooltip = () => {
  const onMouseEnterShowTooltip = (
    tooltipTimeout: React.RefObject<ReturnType<typeof setTimeout> | null>,
    currentElementRef: React.RefObject<HTMLImageElement | null>,
    setTooltip: React.Dispatch<React.SetStateAction<any>>
  ) => {
    const timeShowTooltip = 700;

    // Xóa timeout trước đó tránh tooltip bị delay khi hover nhanh
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);

    tooltipTimeout.current = setTimeout(() => {
      if (currentElementRef.current) {
        // Lấy vị trí của element hiện tại
        const rect = currentElementRef.current.getBoundingClientRect();
        const { top, left, width, height } = rect;

        const tooltipWidth = 420;

        /**
         * Todo: Tính toán vị trí của tooltip
         * left + window.scrollX: lấy vị trí thực tế của card trên toàn trang (vì left chỉ là trong viewport).
         * tooltipWidth / 2: lấy nửa chiều rộng của tooltip để căn giữa.
         * width / 2: lấy nửa chiều rộng của card để căn giữa.
         */

        const margin = 16;
        const calculatedLeft =
          left + window.scrollX - tooltipWidth / 2 + width / 2;
        const maxLeft = window.innerWidth - tooltipWidth - margin;
        const minLeft = margin;

        // Đảm bảo luôn cách mép trái và phải 16px
        const safeLeft = Math.max(minLeft, Math.min(calculatedLeft, maxLeft));

        // lấy vị trí của element hiện tại
        setTooltip({
          top: top + window.scrollY - (height * 1.5) / 2 + height / 2,
          left: safeLeft,
          width: tooltipWidth,
          height: height * 1.5,
          visible: true,
        });
      }
    }, timeShowTooltip);
  };

  //////////////////////////////////////////////////////////////////

  /**
   * @param tooltipTimeout - Một `ref` để lưu timeout. Giúp đảm bảo chỉ có một timeout đang chạy, và có thể xóa khi cần.
   *                        Dùng để delay việc ẩn tooltip (tránh ẩn tức thì khi người dùng rời khỏi hover).
   *                        Sử dụng `useRef<ReturnType<typeof setTimeout> | null>()` trong component.
   *
   * @param setTooltip - Hàm cập nhật state cho tooltip. Cập nhật gồm:
   *                     - `top`, `left`: vị trí tooltip trên trang
   *                     - `width`, `height`: kích thước tooltip
   *                     - `visible`: bật/tắt tooltip
   *                     Dùng `useState<Tooltip | null>` để lưu tooltip.
   *
   */

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
