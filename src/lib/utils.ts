import dayjs from "dayjs";
import { Lunar } from "lunar-javascript";
import relativeTime from "dayjs/plugin/relativeTime";
import { toaster } from "@/components/ui/toaster";
import "dayjs/locale/vi";
import { delay } from "lodash";
import { DateEvent } from "@/configs/event.config";
import { NEXT_PUBLIC_API_KKPHIM_IMAGE_URL } from "@/constants/env.contant";
import { notFoundImage, placeholderImage } from "@/constants/image.contant";
import slugify from "slugify";

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
  if (status === "error") return notFoundImage;
  return placeholderImage;
};

///////////////////////////////////////////////////////////////////////

/**
 *
 * @param lunarDate - Ngày âm lịch cần chuyển đổi (định dạng "dd/MM")
 * @returns - Ngày dương lịch tương ứng (định dạng "MM/dd")
 */

export const convertLunarToSolar = (lunarDate: string): DateEvent => {
  const [day, month] = lunarDate.split("/").map(Number);
  const lunar = Lunar.fromYmd(new Date().getFullYear(), month, day);
  const solar = lunar.getSolar();
  const dayStr = String(solar.getDay()).padStart(2, "0");
  const monthStr = String(solar.getMonth()).padStart(2, "0");

  return `${dayStr}/${monthStr}` as DateEvent;
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
export const checkIsTodayAnEvent = (events: EventData[]) => {
  const todayDate = getTodayDateString();

  // Lặp qua danh sách sự kiện để kiểm tra
  for (const event of events) {
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

export function getUpcomingEvent(
  events: EventData[],
  thresholdDays = 7
): EventData | null {
  if (!Array.isArray(events) || events.length === 0) return null;

  const today = dayjs();

  const validEvents = events
    .map((event) => {
      let eventDate: dayjs.Dayjs | null = null;

      try {
        const [dayStr, monthStr] = event.date.split("/");
        const day = Number(dayStr);
        const month = Number(monthStr);

        if (!day || !month) return null;

        if (event.isLunar) {
          // Chuyển ngày hôm nay (dương lịch) sang âm lịch
          const lunarToday = Lunar.fromDate(today.toDate());
          const lunarYear = lunarToday.getYear();

          // Chuyển âm lịch sang dương lịch trong năm nay
          let solar = Lunar.fromYmd(lunarYear, month, day).getSolar();

          eventDate = dayjs(
            `${solar.getYear()}-${solar.getMonth()}-${solar.getDay()}`
          );

          // Nếu đã qua -> chuyển sang năm sau
          if (eventDate.isBefore(today, "day")) {
            solar = Lunar.fromYmd(lunarYear + 1, month, day).getSolar();
            eventDate = dayjs(
              `${solar.getYear()}-${solar.getMonth()}-${solar.getDay()}`
            );
          }
        } else {
          eventDate = dayjs(`${today.year()}-${month}-${day}`, "YYYY-MM-DD");

          // Nếu đã qua -> chuyển sang năm sau
          if (eventDate.isBefore(today, "day")) {
            eventDate = eventDate.add(1, "year");
          }
        }

        const diff = eventDate.diff(today, "day");
        if (diff >= 0 && diff <= thresholdDays) {
          return { ...event, eventDate };
        }
      } catch (e) {
        console.warn("Lỗi khi xử lý sự kiện:", event, e);
        return null;
      }

      return null;
    })
    .filter(Boolean) as (EventData & { eventDate: dayjs.Dayjs })[];

  if (validEvents.length === 0) return null;

  // Sắp xếp theo ngày gần nhất
  validEvents.sort((a, b) => a.eventDate.diff(b.eventDate));

  return validEvents[0];
}

////////////////////////////////////////////////////////////////////////

/**
 * @param url - Đường dẫn của ảnh
 * @param optimal - true nếu muốn tối ưu hóa ảnh, false nếu không
 * @returns - Đường dẫn của ảnh đã được định dạng
 */

export const generateUrlImage = (url: string, optimal: boolean = true) => {
  let finalUrl = "";

  if (url?.includes("https://phimimg.com")) {
    finalUrl = url;
  } else {
    finalUrl = `https://phimimg.com/${url}`;
  }

  return optimal
    ? `${NEXT_PUBLIC_API_KKPHIM_IMAGE_URL}?url=${finalUrl}`
    : finalUrl;
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

export const formatTypeMovie = (str: string) => {
  const match = str.match(/^#?(.+?)\s*\((.+)\)$/);

  if (match) {
    const languageFormat = match[2]
      .toLowerCase()
      .normalize("NFD") // tách dấu
      .replace(/[\u0300-\u036f]/g, "") // xóa dấu
      .replace(/[^a-z0-9\s-]/g, "") // bỏ ký tự đặc biệt
      .trim()
      .replace(/\s+/g, "-"); // thay space bằng -

    return {
      title: match[2],
      language: languageFormat,
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
  const params = new URLSearchParams();

  arr.forEach((item: any) => {
    if (item?.key && item?.value !== undefined) {
      params.set(item.key, item.value);
    }
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
    if (typeof window === "undefined") return text;
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

/**
 * @returns - Ngày hiện tại theo định dạng dd/MM/yyyy
 */

export const getTodayDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = today.getFullYear();

  return {
    day: Number(day),
    month: Number(month),
    year: Number(year),
    formatted: `${day}/${month}/${year}`, // Định dạng dd/MM/yyyy
  };
};

/**
 * @param time - Chuỗi thời gian theo định dạng "HH:mm"
 * @returns - Đối tượng chứa giờ và phút
 * @description - Hàm này sẽ tách chuỗi thời gian thành giờ và phút
 */

export const splitTime = (time: string | undefined) => {
  if (!time) {
    return { hours: 0, minutes: 0 }; // Trả về mặc định nếu không có thời gian
  }

  const [hours, minutes] = time.split(":").map(Number);
  return { hours, minutes };
};

/**
 * @param key - Tên khóa cần lưu trữ
 * @param value - Giá trị cần lưu trữ
 * @description - Hàm này sẽ lưu giá trị vào localStorage với tên khóa đã cho
 */

export const getFromStorage = <T>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key);

    if (!value || value === "undefined" || value === "null") {
      return fallback;
    }

    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
};

/**
 * @param key - Tên khóa cần lưu trữ
 * @param value - Giá trị cần lưu trữ
 * @description - Hàm này sẽ lưu giá trị vào localStorage với tên khóa đã cho
 */

export const setToStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * @param episodes - Mảng chứa các episode
 * @returns - true nếu có ít nhất một episode hợp lệ, false nếu không
 * @description - Hàm này sẽ kiểm tra xem có ít nhất một episode hợp lệ trong mảng hay không.
 *                Một episode được coi là hợp lệ nếu nó có ít nhất một trong các thuộc tính: filename, link_embed, link_m3u8 hoặc name.
 */

export const hasValidEpisode = (episodes: Episode[]) => {
  return episodes?.some((server) =>
    server.server_data?.some(
      (episode) =>
        episode.filename ||
        episode.link_embed ||
        episode.link_m3u8 ||
        episode.name
    )
  );
};

/**
 * @param episodes - Mảng chứa các episode
 * @returns - true nếu có ít nhất một episode có nhiều hơn một server, false nếu không
 * @description - Hàm này sẽ kiểm tra xem có ít nhất một episode có nhiều hơn một server hay không.
 *                Một episode được coi là có nhiều hơn một server nếu thuộc tính server_data của nó có độ dài lớn hơn 1.
 */

export const hasMultipleEpisodes = (episodes: Episode[]) => {
  return episodes?.some((server) => server.server_data?.length > 1);
};

/**
 * @param episodeCurrent - Chuỗi trạng thái của episode hiện tại
 * @returns - Đối tượng chứa trạng thái và thông tin episode
 * @description - Hàm này sẽ phân tích chuỗi trạng thái của episode hiện tại và trả về đối tượng chứa trạng thái và thông tin episode.
 *                Nếu chuỗi là "full", trả về trạng thái "Đã phát hành" và không có thông tin episode.
 *                Nếu chuỗi là "trailer", trả về trạng thái "Sắp phát hành" và không có thông tin episode.
 *                Nếu chuỗi có định dạng "status (current/total)", trả về trạng thái và thông tin episode tương ứng.
 */

export const parseEpisodeCurrent = (episodeCurrent: string) => {
  if (episodeCurrent.toLowerCase() === "full") {
    return { status: "Đã phát hành", episodeInfo: null };
  }

  if (episodeCurrent.toLowerCase() === "trailer") {
    return { status: "Sắp phát hành", episodeInfo: null };
  }

  const match = episodeCurrent.match(/^(.*)\s+\((\d+\/\d+)\)$/);
  const status = match?.[1] || episodeCurrent;
  const episodeInfo = match?.[2] || null;

  return { status, episodeInfo };
};

/**
 * @param date - Ngày cần kiểm tra
 * @param separate - Ký tự phân tách ngày, tháng, năm (ví dụ: "/", "-")
 * @returns - true nếu ngày hợp lệ, false nếu không hợp lệ
 * @description - Hàm này sẽ kiểm tra xem ngày có hợp lệ hay không.
 *                Ngày được coi là hợp lệ nếu:
 *                - Ngày nằm trong khoảng từ 1 đến 31
 *                - Tháng nằm trong khoảng từ 1 đến 12
 *                - Năm lớn hơn 1900
 */

export const validateDate = (date: string, separate: string) => {
  const [day, month] = date.split(separate).map(Number);
  const isValid = day > 0 && day <= 31 && month > 0 && month <= 12;
  return isValid;
};

type TypeFormatTimestamp =
  | "DD"
  | "MM"
  | "YYYY"
  | "HH"
  | "mm"
  | "ss"
  | "DD/MM/YYYY"
  | "HH:mm:ss"
  | "HH:mm";

/**
 *
 * @param timestamp - Thời gian cần định dạng (dạng số hoặc chuỗi)
 * @param type - Loại định dạng thời gian cần trả về
 * @returns - Chuỗi đã được định dạng theo kiểu đã cho
 */

export const formatTimestamp = (
  timestamp: number | string,
  type: TypeFormatTimestamp
) => {
  const date = new Date(Number(timestamp));

  const vnDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  );

  const day = String(vnDate.getDate()).padStart(2, "0");
  const month = String(vnDate.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = vnDate.getFullYear();
  const hours = String(vnDate.getHours()).padStart(2, "0");
  const minutes = String(vnDate.getMinutes()).padStart(2, "0");
  const seconds = String(vnDate.getSeconds()).padStart(2, "0");

  switch (type) {
    case "DD":
      return day;
    case "MM":
      return month;
    case "YYYY":
      return year;
    case "HH":
      return hours;
    case "mm":
      return minutes;
    case "ss":
      return seconds;
    case "DD/MM/YYYY":
      return `${day}/${month}/${year}`;
    case "HH:mm:ss":
      return `${hours}:${minutes}:${seconds}`;
    case "HH:mm":
      return `${hours}:${minutes}`;
    default:
      throw new Error("Invalid format type");
  }
};

export function generateSlug(name: string) {
  return slugify(name, {
    lower: true, // viết thường hết
    strict: true, // bỏ ký tự đặc biệt
    locale: "vi", // hỗ trợ tiếng Việt
  });
}

/**
 *
 * @param totalSeconds - Tổng số giây cần định dạng
 * @description - Hàm này sẽ định dạng tổng số giây thành chuỗi thời gian theo định dạng "HH:MM:SS" hoặc "MM:SS".
 *                Nếu tổng số giây lớn hơn hoặc bằng 3600 (1 giờ), sẽ hiển thị định dạng "HH:MM:SS".
 *                Nếu tổng số giây nhỏ hơn 3600, sẽ hiển thị định dạng "MM:SS".
 * @returns - Chuỗi thời gian đã được định dạng
 */

export function formatClockTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Nếu có giờ, hiển thị định dạng HH:MM:SS
  if (hours > 0) {
    return [hours, minutes, seconds]
      .map((unit) => String(unit).padStart(2, "0"))
      .join(":");
  }

  // Nếu không có giờ, hiển thị định dạng MM:SS
  return [minutes, seconds]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");
}

/**
 *
 * @param totalSeconds - Tổng số giây cần định dạng
 * @description - Hàm này sẽ định dạng tổng số giây thành chuỗi thời gian theo định dạng "XhYm" hoặc "Xm".
 *                Nếu tổng số giây lớn hơn hoặc bằng 3600 (1 giờ), sẽ hiển thị định dạng "XhYm" (giờ và phút).
 *                Nếu tổng số giây nhỏ hơn 3600, sẽ hiển thị định dạng "Xm" (chỉ phút).
 *                Nếu tổng số giây nhỏ hơn 60, sẽ trả về "1m" để đảm bảo có ít nhất 1 phút.
 * @returns - Chuỗi thời gian đã được định dạng
 */

export function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return minutes > 0 ? `${hours}h${minutes}m` : `${hours}h`;
  }

  return minutes > 0 ? `${minutes}m` : "1m";
}
