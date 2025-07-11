"use client";

import { useDispatch, useSelector } from "react-redux";
import { setReportError } from "@/store/slices/userSlice";
import { useEffect } from "react";
import { RootState } from "@/store/store";

const ErrorReportSelect = () => {
  const dispatch = useDispatch();
  const {
    report: { reportError },
  } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(setReportError("Không thể phát phim"));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setReportError(e.target.value));
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="error-report"
        className="text-sm font-medium text-gray-200"
      >
        Lỗi gặp phải:
      </label>
      <select
        id="error-report"
        className="w-full px-3 py-2 text-sm text-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={reportError}
        onChange={handleChange}
      >
        <option className="text-black" value="Không thể phát phim">
          Không thể phát phim
        </option>
        <option className="text-black" value="Phim load chậm hoặc bị giật">
          Phim load chậm hoặc bị giật
        </option>
        <option
          className="text-black"
          value="Chất lượng video kém (mờ, nhòe, sai tỷ lệ)"
        >
          Chất lượng video kém (mờ, nhòe, sai tỷ lệ)
        </option>
        <option className="text-black" value="Sai hoặc thiếu phụ đề">
          Sai hoặc thiếu phụ đề
        </option>
        <option
          className="text-black"
          value="Không có âm thanh hoặc âm thanh bị lệch"
        >
          Không có âm thanh hoặc âm thanh bị lệch
        </option>
        <option
          className="text-black"
          value="Sai ngôn ngữ (thuyết minh/phụ đề không đúng)"
        >
          Sai ngôn ngữ (thuyết minh/phụ đề không đúng)
        </option>
        <option className="text-black" value="Phim bị cắt hoặc thiếu tập">
          Phim bị cắt hoặc thiếu tập
        </option>
        <option
          className="text-black"
          value="Sai nội dung (nhầm tập, nhầm bản phim)"
        >
          Sai nội dung (nhầm tập, nhầm bản phim)
        </option>
        <option className="text-black" value="Không thể tải trang phim">
          Không thể tải trang phim
        </option>
        <option className="text-black" value="Link phim bị lỗi (404, 500...)">
          Link phim bị lỗi (404, 500...)
        </option>
        <option
          className="text-black"
          value="Lỗi tương thích với trình duyệt / thiết bị"
        >
          Lỗi tương thích với trình duyệt / thiết bị
        </option>
      </select>
    </div>
  );
};

export default ErrorReportSelect;
