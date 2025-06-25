import dayjs from "dayjs";
import { Lunar } from "lunar-javascript";
import relativeTime from "dayjs/plugin/relativeTime";
import { toaster } from "@/components/ui/toaster";
import { decode } from "he";

import "dayjs/locale/vi";
import { delay } from "lodash";
import { eventConfig } from "@/configs/eventConfig";

dayjs.locale("vi");
dayjs.extend(relativeTime);

/**
 * @param title - Tiêu đề của toaster
 * @param description - Nội dung của toaster
 * @param type - Loại toaster (error, warning, success, info)
 * @param duration - Thời gian hiển thị toaster (mặc định là 2000ms)
 */

export const handleShowToaster = (
  title: string,
  description: string,
  type?: "error" | "warning" | "success" | "info",
  duration?: number
) => {
  toaster.create({
    title: title || "Thông báo",
    description,
    type: type || "info",
    duration: duration || 2000,
    // action: {
    //   label: "Đóng",
    //   onClick: () => {
    //     toaster.dismiss();
    //   },
    // },
  });
};

///////////////////////////////////////////////////////////////////

/**
 * @param ms - Thời gian delay trước khi thực hiện hàm (mặc định là 1000ms)
 */

export const scrollToTop = (ms: number = 1000) => {
  // Cuộn lên đầu trang với thời gian delay mặc định là 1000ms
  delay(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, ms);
};

//////////////////////////////////////////////////////////////////////

/**
 * @param className - Tên class của phần tử cần cuộn đến
 * @param ms - Thời gian delay trước khi cuộn (mặc định là 1000ms)
 */

interface ScrollToElement {
  name: string;
  ms?: number;
  type?: "class" | "id";
  block?: "center" | "end" | "nearest" | "start";
  behavior?: "auto" | "instant" | "smooth";
}

export const scrollToElement = ({
  name,
  ms = 1000,
  type = "class",
  block = "center",
  behavior = "smooth",
}: ScrollToElement) => {
  const element =
    type === "class"
      ? document.querySelector(`.${name}`)
      : document.getElementById(name);

  if (element) {
    delay(() => element.scrollIntoView({ behavior, block }), ms || 1000);
  }
};

////////////////////////////////////////////////////////////////////

/**
 * @param text - Chuỗi văn bản cần sao chép vào clipboard
 */

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

////////////////////////////////////////////////////////////////////

interface CopyToClipboardWithDelay {
  text: string;
  delayTime?: number; // Thời gian delay trước khi sao chép (mặc định là 1000ms)
  callback?: () => void; // Hàm callback sau khi sao chép thành công
}

export const copyToClipboardWithDelay = ({
  text,
  delayTime = 1000,
  callback,
}: CopyToClipboardWithDelay) => {
  navigator.clipboard.writeText(text).then(() => {
    if (callback) {
      delay(callback, delayTime);
    }
  });
};

////////////////////////////////////////////////////////////////////////

/**
 *
 * @param src - Đường dẫn của ảnh
 * @param status - Trạng thái của ảnh (loading, success, error)
 * @returns - Đường dẫn của ảnh tương ứng với trạng thái
 */

export const getImageSrc = (
  src: string,
  status: "loading" | "success" | "error"
) => {
  if (status === "success") return src;
  if (status === "error") return "/images/notfound.png";
  return "/images/placeholder.jpg";
};

///////////////////////////////////////////////////////////////////////

/**
 *
 * @param lunarDate - Ngày âm lịch cần chuyển đổi (định dạng "dd/MM")
 * @returns - Ngày dương lịch tương ứng (định dạng "MM/dd")
 */

export const convertLunarToSolar = (lunarDate: string) => {
  const [day, month] = lunarDate.split("/").map(Number);
  const lunar = Lunar.fromYmd(new Date().getFullYear(), month, day);
  const solar = lunar.getSolar();
  const dayStr = String(solar.getDay()).padStart(2, "0");
  const monthStr = String(solar.getMonth()).padStart(2, "0");
  return `${dayStr}/${monthStr}`; // chuẩn định dạng dd/MM
};

///////////////////////////////////////////////////////////////

/**
 *
 * @returns - Ngày hiện tại theo định dạng "dd/MM"
 */

export const getTodayDateString = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}`;
};

//////////////////////////////////////////////////////////////////////

/**
 * @returns - true nếu hôm nay có sự kiện, false nếu không
 */
export const checkIsTodayAnEvent = () => {
  const todayDate = getTodayDateString();

  // Lặp qua danh sách sự kiện để kiểm tra
  for (const event of eventConfig) {
    let eventDate = event.date;

    // Nếu sự kiện là âm lịch, chuyển đổi ngày âm lịch sang dương lịch
    if (event.isLunar) {
      eventDate = convertLunarToSolar(event.date);
    }

    // Kiểm tra nếu ngày hiện tại trùng với sự kiện
    if (eventDate === todayDate) {
      return true;
    }
  }
  return false;
};

//////////////////////////////////////////////////////////////////////

/**
 *
 * @param thresholdDays - Số ngày tối đa để sự kiện được coi là sắp diễn ra
 * @returns - Sự kiện sắp diễn ra trong khoảng thời gian đã chỉ định
 */

export function getUpcomingEvent(thresholdDays = 7) {
  const today = dayjs();

  return eventConfig.find((event) => {
    let eventDate;

    if (event.isLunar) {
      const [day, month] = event.date.split("/").map(Number); // lấy ngày và tháng từ lunarDate
      const lunarToday = Lunar.fromDate(today.toDate()); // Chuyển đổi ngày hôm nay sang lịch âm
      const solar = Lunar.fromYmd(lunarToday.getYear(), month, day).getSolar(); // Chuyển đổi ngày âm lịch sang dương lịch
      eventDate = dayjs(
        `${solar.getYear()}-${solar.getMonth() + 1}-${solar.getDay()}` // +1 vì month trong JS là từ 0 (0-11)
      );

      // Nếu ngày âm lịch đã qua, lấy năm sau
      if (eventDate.isBefore(today, "day")) {
        const nextSolar = Lunar.fromYmd(
          lunarToday.getYear() + 1, // thêm 1 năm
          month,
          day
        ).getSolar();
        eventDate = dayjs(
          `${nextSolar.getYear()}-${
            nextSolar.getMonth() + 1
          }-${nextSolar.getDay()}`
        );
      }
    } else {
      const [day, month] = event.date.split("/").map(Number);
      eventDate = dayjs(`${today.year()}-${month}-${day}`, "YYYY-MM-DD");

      // Nếu sự kiện đã qua trong năm nay, cộng thêm 1 năm
      if (eventDate.isBefore(today, "day")) {
        eventDate = eventDate.add(1, "year");
      }
    }

    const diff = Math.abs(eventDate.diff(today, "day"));
    return diff <= thresholdDays; // Kiểm tra xem sự kiện có trong khoảng thời gian đã chỉ định không
  });
}

////////////////////////////////////////////////////////////////////////

/**
 * @param url - Đường dẫn của ảnh
 * @returns - Đường dẫn của ảnh đã được định dạng
 */

export const generateUrlImage = (url: string) => {
  if (url?.includes("https://phimimg.com")) {
    return url;
  } else {
    return `https://phimimg.com/${url}`;
  }
};

////////////////////////////////////////////////////////////////////////

/**
 * @param element - Phần tử DOM cần lấy vị trí
 * @returns - Đối tượng chứa thông tin về vị trí và kích thước của phần tử
 */

export const getPositionElement = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();

  return {
    top: rect.top,
    left: rect.left,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.width,
    height: rect.height,
  };
};

////////////////////////////////////////////////////////////////////////

/**
 * @param params - Đối tượng chứa các tham số cần cập nhật trong URL
 * @returns - Chuỗi query string đã được cập nhật
 */

export const updateSearchParams = (params: Record<string, string>) => {
  const searchParams = new URLSearchParams(window.location.search);

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key); // Xóa nếu rỗng
    }
  });

  return searchParams.toString(); // Trả về chuỗi query mới
};

//////////////////////////////////////////////////////////////////////////

/**
 * @param arr - Mảng chứa các phần tử
 * @returns - Phần tử ngẫu nhiên từ mảng
 * @throws - Lỗi nếu mảng rỗng
 */

export function getRandomItem<T>(arr: T[]): T {
  if (arr.length === 0) {
    throw new Error("Mảng không được rỗng.");
  }

  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

////////////////////////////////////////////////////////////////////////////

/**
 * @param str - Chuỗi cần định dạng
 * @param result - Ký tự thay thế cho khoảng trắng
 * @returns - Chuỗi đã được định dạng
 */

export const formatStringForURL = (str: string, result: string) => {
  return str?.replace(/\s+/g, result);
};

//////////////////////////////////////////////////////////////////////////

/**
 * @param str - Chuỗi cần loại bỏ các ký tự HTML entities
 * @returns - Chuỗi đã loại bỏ các ký tự HTML entities
 */

export const removeHtmlEntities = (str: string) => {
  return str?.replace(/&#\d+;|&[a-z]+;/gi, "");
};

//////////////////////////////////////////////////////////////////////////

/**
 * @param str - Chuỗi cần định dạng
 * @returns - Chuỗi đã được định dạng
 */

export const formatTypeMovie = (type: string) => {
  const serverName = type.toLowerCase();

  if (serverName.includes("vietsub")) {
    return {
      title: "Phụ đề",
      language: "vietsub",
    };
  } else if (serverName.includes("thuyết minh")) {
    return {
      title: "Thuyết minh",
      language: "thuyet-minh",
    };
  } else if (serverName.includes("lồng tiếng")) {
    return {
      title: "Lồng tiếng",
      language: "long-tieng",
    };
  } else {
    return {
      title: "Không xác định",
      language: "undetermined",
    };
  }
};

////////////////////////////////////////////////////////////////////////////

/**
 * @param link - Đường dẫn cần lấy ID
 * @param position - Vị trí của ID trong đường dẫn
 * @returns - ID từ đường dẫn
 */

export const getIdFromLinkEmbed = (link: string, position: number) => {
  return link?.split("/")[position];
};

////////////////////////////////////////////////////////////////////////////

/**
 * @param arr - Mảng chứa các phần tử
 * @returns - Đối tượng chứa các tham số trong URL
 */

export const changeQuery = <T>(arr: T[]) => {
  const params = new URLSearchParams(window.location.search);

  arr.forEach((item: any) => {
    params.set(item?.key, item?.value);
  });

  window.history.replaceState({}, "", `?${params.toString()}`);
};

////////////////////////////////////////////////////////////////////////////

/**
 * @param email - Địa chỉ email cần kiểm tra
 * @returns - true nếu địa chỉ email hợp lệ, false nếu không hợp lệ
 */

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

////////////////////////////////////////////////////////////////////////////

/**
 * @param password - Mật khẩu cần kiểm tra
 * @returns - true nếu mật khẩu hợp lệ, false nếu không hợp lệ
 */

export const isEmptyObject = (obj: Record<string, any>) => {
  return Object.keys(obj).length === 0;
};

////////////////////////////////////////////////////////////////////////////

/**
 * @param item - Phần tử cần kiểm tra
 * @param dataList - Danh sách dữ liệu để so sánh
 * @param compareWidth - Tên thuộc tính để so sánh
 * @returns - true nếu phần tử đã tồn tại trong danh sách dữ liệu, false nếu không
 */

export const isDataExistsToday = <T>(
  item: T,
  dataList: T[],
  compareWidth: string
): boolean => {
  const today = new Date().toISOString().split("T")[0];

  return dataList.some((data: any) => {
    const createdAt = data.createdAt?.split("T")[0];
    return createdAt === today && item === data[compareWidth];
  });
};

////////////////////////////////////////////////////////////////////////////
export const handleShare = () => {
  if (navigator.share) {
    // Kiểm tra xem trình duyệt có hỗ trợ Web Share API không
    navigator
      .share({
        title: "Chia sẻ phim",
        text: "Xem phim thú vị này nhé!",
        url: window.location.href, // Lấy đường dẫn hiện tại
      })
      .then(() => console.log("Chia sẻ thành công!"))
      .catch((error) => console.error("Lỗi khi chia sẻ:", error));
  } else {
    console.log("Trình duyệt không hỗ trợ Web Share API");
  }
};

////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param date
 * @returns - Trả về thời gian tương đối từ hiện tại (ví dụ: "2 giờ trước", "3 ngày trước", ...
 */

export const formatDateUnix = (date: string | number) => {
  return dayjs.unix(Number(date)).fromNow(); // Trả về thời gian tương đối từ hiện tại
};

/////////////////////////////////////////////////////////////////////////////

/**
 * @param date - Ngày tháng năm cần định dạng
 * @returns - Ngày tháng năm đã được định dạng
 */

export const formatDate = (date: string) => {
  return dayjs(date).fromNow();
};

//////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param tooltipTimeout - Một `ref` để lưu timeout. Giúp đảm bảo chỉ có một timeout đang chạy, và có thể xóa khi cần.
 *                        Dùng để delay việc hiển thị tooltip (tránh hiển thị tức thì khi người dùng hover).
 *                        Sử dụng `useRef<ReturnType<typeof setTimeout> | null>()` trong component.
 *
 * @param currentElementRef - Một `ref` tới phần tử DOM đang được hover (ví dụ: thẻ `<img>` của poster).
 *                            Dùng để lấy vị trí trên màn hình (bounding box) để căn tooltip.
 *                            Khai báo bằng `useRef<HTMLImageElement|null>(null)`.
 *
 * @param setTooltip - Hàm cập nhật state cho tooltip. Cập nhật gồm:
 *                     - `top`, `left`: vị trí tooltip trên trang
 *                     - `width`, `height`: kích thước tooltip
 *                     - `visible`: bật/tắt tooltip
 *                     Dùng `useState<Tooltip | null>` để lưu tooltip.
 *
 */

export const onMouseEnterShowTooltip = (
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

export const onMouseLeaveHideTooltip = (
  tooltipTimeout: React.RefObject<ReturnType<typeof setTimeout> | null>,
  setTooltip: React.Dispatch<React.SetStateAction<any>>
) => {
  if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
  setTooltip(null);
};

//////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param episodes: Mảng chứa các episode
 * @returns: Mảng chứa các episode đã được gộp lại
 */

export const mergeEpisodeData = (episodes: Episode[]) => {
  return episodes.flatMap((item) => item?.server_data || []);
};

//////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param episodes: Mảng chứa các episode đã được gộp lại
 * @param id: ID của episode cần tìm
 * @returns: episode tương ứng với ID đã cho hoặc null nếu không tìm thấy
 */

export const findEpisodeById = (episodes: EpisodeMerged[], id: string) => {
  return episodes.find((item) => item?.link_embed?.includes(id)) || null;
};

//////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param date - Ngày cần định dạng (dạng chuỗi)
 * @returns - Ngày đã được định dạng theo định dạng "DD/MM/YYYY" (tiếng Việt)
 */

export const formatDateVn = (date: string) => {
  return dayjs(date).locale("vi").format("DD/MM/YYYY");
};

////////////////////////////////////////////////////////////////////////////////

export const formatString = (str: string) => {
  // Hàm này dùng để giải mã các ký tự HTML entities
  // Ví dụ: "&amp;" sẽ được chuyển thành "&", "&lt;" sẽ được chuyển thành "<", v.v.
  const decodeHtmlEntities = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  };

  return decodeHtmlEntities(str)
    .toLowerCase()
    .replace(/đ/g, "d") // xử lý "đ"
    .normalize("NFD") // Tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
    .replace(/[^a-z0-9\s-]/g, "") // Giữ lại a-z, 0-9, khoảng trắng và dấu gạch ngang
    .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, "-") // Gộp nhiều dấu gạch ngang liên tiếp
    .replace(/^-+|-+$/g, ""); // Xóa dấu gạch ngang đầu/cuối nếu có
};

/**
 * @param text - Chuỗi văn bản cần giải mã các ký tự HTML entities
 * @description - Hàm này sẽ chuyển đổi các ký tự HTML entities (ví dụ: &amp;, &lt;, &gt;) thành ký tự tương ứng của nó.
 * @returns - Chuỗi đã được giải mã
 */

export const decodeHtmlEntities = (text: string) => {
  return decode(text);
};

interface GeneratePagination {
  currentPage: number;
  totalPages: number;
}

export const generatePagination1 = ({
  currentPage,
  totalPages,
}: GeneratePagination) => {
  // Nếu tổng số trang nhỏ hơn hoặc bằng 7, trả về tất cả các trang
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Nếu trang hiện tại nằm trong số 3 trang đầu tiên,
  // Hiển thị 3 đầu tiên, một dấu chấm lửng và 2 trang cuối cùng.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // Nếu trang hiện tại nằm trong số 3 trang cuối cùng,
  // Hiển thị 2 trang đầu tiên, một dấu chấm lửng và 3 cuối cùng.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // Nếu trang hiện tại ở đâu đó ở giữa,
  // Hiển thị trang đầu tiên, một dấu chấm lửng, trang hiện tại và hàng xóm của nó,
  // Một dấu chấm lửng khác và trang cuối cùng.

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const generatePagination = (currentPage: number, totalPage: number) => {
  if (totalPage <= 7) {
    return Array.from({ length: totalPage }, (_, index) => index + 1);
  }

  const pagination: (number | "...")[] = [];

  // Luôn hiển thị trang đầu
  pagination.push(1);

  // Nếu currentPage > 3 thì có khoảng cách xa trang đầu, cần hiển thị "..."
  if (currentPage > 3) {
    pagination.push("...");
  }

  // Hiển thị 3 trang gần currentPage (từ 2 đến totalPage - 1)
  const startPage = Math.max(2, currentPage - 2);
  const endPage = Math.min(totalPage - 1, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    pagination.push(i);
  }

  // Nếu currentPage < totalPage - 2 thì cách xa trang cuối, cần "..."
  if (currentPage < totalPage - 2) {
    pagination.push("...");
  }

  // Luôn hiển thị trang cuối
  pagination.push(totalPage);

  return pagination;
};

interface HighlightPart {
  text: string;
  highlight: boolean;
}

export const highlightMultipleMatches = (
  text: string,
  searchTerm: string
): HighlightPart[] => {
  // Nếu chuỗi text hoặc từ khóa tìm kiếm rỗng, trả về 1 phần duy nhất không highlight
  if (!text || !searchTerm.trim()) {
    return [{ text, highlight: false }];
  }

  // Chuyển cả text và searchTerm về chữ thường để so sánh không phân biệt hoa/thường
  const normalizedText = text.toLowerCase();
  const searchWords = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);
  // -> Tách từ khóa thành mảng các từ, bỏ các chuỗi rỗng

  const result: HighlightPart[] = [];
  let i = 0; // Vị trí hiện tại đang duyệt trong text

  // Duyệt từng ký tự trong text đến hết
  while (i < text.length) {
    let matched = false; // Biến kiểm tra có tìm thấy từ khóa ở vị trí này không

    // Duyệt từng từ khóa trong searchWords
    for (const word of searchWords) {
      // Lấy đoạn text từ vị trí i, chiều dài bằng từ khóa word
      const segment = normalizedText.slice(i, i + word.length);

      // So sánh đoạn này với từ khóa word
      if (segment === word) {
        // Nếu khớp, đẩy phần này vào kết quả với highlight = true
        result.push({ text: text.slice(i, i + word.length), highlight: true });
        i += word.length; // Tăng i nhảy qua đoạn vừa match
        matched = true; // Đánh dấu đã match

        break; // Dừng kiểm tra các từ khóa còn lại
      }
    }

    // Nếu không có từ khóa nào match ở vị trí i
    if (!matched) {
      // Đẩy ký tự đơn hiện tại vào kết quả với highlight = false
      result.push({ text: text[i], highlight: false });
      i++; // Tiến tới ký tự tiếp theo
    }
  }

  // Sau khi duyệt toàn bộ text, sẽ có mảng result với từng phần highlight hoặc không highlight
  // Tuy nhiên hiện tại có thể nhiều phần liên tiếp có cùng trạng thái (highlight hoặc không),
  // nên ta sẽ gộp chúng lại để tối ưu

  const merged: HighlightPart[] = [];

  // Duyệt từng phần trong result
  for (const part of result) {
    const last = merged[merged.length - 1]; // Lấy phần cuối cùng đã gộp

    // Nếu phần cuối cùng tồn tại và có cùng trạng thái highlight với phần hiện tại
    if (last && last.highlight === part.highlight) {
      // Gộp text lại với nhau
      last.text += part.text;
    } else {
      // Nếu khác trạng thái highlight hoặc mảng merged đang rỗng
      // Thêm phần mới vào merged
      merged.push({ ...part });
    }
  }

  // Trả về mảng đã gộp các phần highlight và không highlight
  return merged;
};

///////////////////////////////////////////////////////////////////
