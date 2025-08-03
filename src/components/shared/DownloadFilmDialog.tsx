"use client";

import { RootState } from "@/store/store";
import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import Link from "next/link";
import { useSelector } from "react-redux";
import Clipboard from "./Clipboard";
import { appConfig } from "@/configs/app.config";

const { dialog } = appConfig.charka;
const motionPresetDefault = dialog.motionPresetDefault;

interface DownloadDialogProps {
  trigger: React.ReactNode;
}

const DownloadFilmDialog = ({ trigger }: DownloadDialogProps) => {
  const { currentEpisode } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );

  return (
    <Dialog.Root motionPreset={motionPresetDefault} scrollBehavior="outside">
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            padding={1}
            className="bg-[#2a314e] text-gray-50 relative rounded-xl mx-4 md:max-w-[560px] max-w-[calc(100%-32px)]"
          >
            <Dialog.Header p={4}>
              <Dialog.Title>Hướng dẫn tải phim</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body px={4}>
              <ul>
                <li className="text-sm mb-1">
                  Bước 1: Truy cập{" "}
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-primary"
                    href="https://www.gyan.dev/ffmpeg/builds/"
                  >
                    https://www.gyan.dev/ffmpeg/builds/
                  </Link>
                </li>
                <li className="text-sm mb-1">
                  Bước 2: Kéo xuống và tải bản:{" "}
                  {"ffmpeg-release-essentials.zip"}
                </li>
                <li className="text-sm mb-1">
                  Bước 3: Giải nén, bạn sẽ thấy file:
                  <br />
                  <code>
                    C:\Users\TenCuaBan\Downloads\ffmpeg-release-essentials\ffmpeg\bin\ffmpeg.exe
                  </code>
                </li>
                <li className="text-sm mb-1">
                  Bước 4: Mở Start Menu → Gõ {"Environment Variables"} → chọn{" "}
                  {"Edit the system environment variables"}
                </li>
                <li className="text-sm mb-1">
                  Bước 5: Trong cửa sổ System Properties → Click
                  {"Environment Variables"}
                </li>
                <li className="text-sm mb-1">
                  Bước 6: Ở mục {"System variables"}, chọn dòng {"Path"} → Nhấn
                  {"Edit"}
                </li>
                <li className="text-sm mb-1">
                  Bước 7: Nhấn {"New"}, dán đường dẫn đến thư mục{" "}
                  <code>bin</code> của ffmpeg, ví dụ:
                  <br />
                  <code>
                    C:\Users\TenCuaBan\Downloads\ffmpeg-release-essentials\ffmpeg\bin
                  </code>
                </li>
                <li className="text-sm mb-1">
                  Bước 8: Nhấn OK để lưu lại các thay đổi.
                </li>
                <li className="text-sm mb-1">Bước 9: Mở Command Prompt</li>
                <li className="text-sm mb-1">
                  Bước 10: Gõ lệnh <code>ffmpeg -version</code> để kiểm tra. Nếu
                  hiện ra thông tin phiên bản là bạn đã cài đặt thành công.
                </li>
                <li className="text-sm mb-1">
                  Bước 11: Copy đường dẫn bên dưới:
                </li>
                <li className="text-sm mb-1">
                  <Clipboard
                    value={currentEpisode?.link_embed || ""}
                    label={currentEpisode?.link_embed?.split("=")[1]}
                  />
                </li>
                <li className="text-sm mb-1">
                  Bước 12: Chạy lệnh sau trong Command Prompt:
                  <br />
                  <code>
                    ffmpeg -i {"dán đường dẫn vừa copy vào đây"} -c copy -bsf:a
                    aac_adtstoasc
                    {"C:\\Users\\TenCuaBan\\Downloads\\ten_file_output.mp4"}
                  </code>
                  <br />✅ Bạn có thể thay đổi đường dẫn phía sau để lưu file ở
                  nơi bạn muốn. Ví dụ: Desktop hoặc thư mục riêng.
                </li>
                <li className="text-sm">
                  Cuối cùng, chờ quá trình tải xuống hoàn tất.{" "}
                  <span className="font-semibold text-green-400">
                    Chúc bạn thành công!
                  </span>
                </li>
              </ul>
            </Dialog.Body>
            <Dialog.CloseTrigger
              asChild
              className="absolute top-2 right-2 text-gray-300 hover:text-gray-100 hover:bg-transparent"
            >
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DownloadFilmDialog;
